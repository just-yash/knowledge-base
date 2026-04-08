$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Config = Get-Content (Join-Path $Root "site.config.json") -Raw | ConvertFrom-Json
$ContentDir = $Config.contentDir
if (-not [System.IO.Path]::IsPathRooted($ContentDir)) {
  $ContentDir = Join-Path $Root $ContentDir
}
$OutputDir = $Config.outputDir
if (-not [System.IO.Path]::IsPathRooted($OutputDir)) {
  $OutputDir = Join-Path $Root $OutputDir
}
$SrcDir = Join-Path $Root "src"
$IgnoredDirs = @(".obsidian", ".git", ".github")
$ResolvedContentDir = (Resolve-Path -LiteralPath $ContentDir).Path.TrimEnd("\", "/")

function Normalize-Key {
  param([string]$Value)

  $segments = New-Object System.Collections.Generic.List[string]
  foreach ($rawSegment in ($Value -replace "\\", "/").Trim().Split("/")) {
    $segment = $rawSegment.Trim()
    if ([string]::IsNullOrWhiteSpace($segment) -or $segment -eq ".") {
      continue
    }
    if ($segment -eq "..") {
      if ($segments.Count -gt 0) {
        $segments.RemoveAt($segments.Count - 1)
      }
      continue
    }
    $segments.Add($segment)
  }

  return (($segments -join "/").ToLower() -replace "[_\s]+", " ")
}

function Slugify {
  param([string]$Value)

  $slug = ($Value.ToLower() -replace "[^a-z0-9]+", "-").Trim("-")
  if ([string]::IsNullOrWhiteSpace($slug)) {
    return "note"
  }
  return $slug
}

function Get-RelativeContentPath {
  param([string]$Path)

  $resolved = (Resolve-Path -LiteralPath $Path).Path
  return $resolved.Substring($ResolvedContentDir.Length).TrimStart("\", "/").Replace("\", "/")
}

function Test-IgnoredPath {
  param([string]$Path)

  $relativePath = Get-RelativeContentPath -Path $Path
  foreach ($part in $relativePath.Split("/")) {
    if ($IgnoredDirs -contains $part) {
      return $true
    }
  }
  return $false
}

function Split-FrontMatter {
  param([string]$Text)

  $match = [regex]::Match($Text, "^(?s)---\r?\n(.*?)\r?\n---\r?\n?")
  if (-not $match.Success) {
    return @{
      Metadata = @{}
      Body = $Text
    }
  }

  $metadata = @{}
  $currentKey = $null
  foreach ($rawLine in ($match.Groups[1].Value -split "\r?\n")) {
    $line = $rawLine.TrimEnd()
    if ([string]::IsNullOrWhiteSpace($line)) {
      continue
    }
    if ($line.StartsWith("- ") -and $currentKey) {
      if (-not $metadata.ContainsKey($currentKey)) {
        $metadata[$currentKey] = @()
      }
      $metadata[$currentKey] += $line.Substring(2).Trim()
      continue
    }
    if (-not $line.Contains(":")) {
      continue
    }

    $parts = $line.Split(":", 2)
    $currentKey = $parts[0].Trim()
    $value = $parts[1].Trim()
    if ($value.StartsWith("[") -and $value.EndsWith("]")) {
      $items = @()
      foreach ($item in $value.Substring(1, $value.Length - 2).Split(",")) {
        $clean = $item.Trim().Trim("'`"")
        if ($clean) {
          $items += $clean
        }
      }
      $metadata[$currentKey] = $items
    } elseif ($value) {
      $metadata[$currentKey] = $value.Trim("'`"")
    } else {
      $metadata[$currentKey] = @()
    }
  }

  return @{
    Metadata = $metadata
    Body = $Text.Substring($match.Length)
  }
}

function Strip-Markdown {
  param([string]$Text)

  $result = [regex]::Replace($Text, '```.*?```', ' ', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  $result = [regex]::Replace($result, '`([^`]+)`', '$1')
  $result = [regex]::Replace($result, '(!)?\[\[([^\]]+)\]\]', '$2')
  $result = [regex]::Replace($result, '\[([^\]]+)\]\(([^)]+)\)', '$1')
  $result = [regex]::Replace($result, '<[^>]+>', ' ')
  $result = [regex]::Replace($result, '[*_~]+', '')
  $result = [regex]::Replace($result, '^-{3,}$', ' ', [System.Text.RegularExpressions.RegexOptions]::Multiline)
  $result = [regex]::Replace($result, '^[#>*\-+\d.\s]+', '', [System.Text.RegularExpressions.RegexOptions]::Multiline)
  $result = [regex]::Replace($result, '\s+', ' ')
  return $result.Trim()
}

function Extract-Tags {
  param(
    [string]$Text,
    [hashtable]$Metadata
  )

  $tags = New-Object System.Collections.Generic.HashSet[string]
  foreach ($match in [regex]::Matches($Text, "(?<![\w/])#([A-Za-z][\w/-]*)")) {
    [void]$tags.Add($match.Groups[1].Value.ToLower())
  }

  if ($Metadata.ContainsKey("tags")) {
    $metadataTags = $Metadata["tags"]
    if ($metadataTags -is [System.Array]) {
      foreach ($tag in $metadataTags) {
        if ($tag) {
          [void]$tags.Add($tag.ToString().ToLower().TrimStart("#"))
        }
      }
    } elseif ($metadataTags) {
      [void]$tags.Add($metadataTags.ToString().ToLower().TrimStart("#"))
    }
  }

  return @($tags | Sort-Object)
}

function Extract-Wikilinks {
  param([string]$Text)

  $links = @()
  foreach ($match in [regex]::Matches($Text, "(!)?\[\[([^\]]+)\]\]")) {
    $links += $match.Groups[2].Value.Trim()
  }
  return $links
}

function Extract-HtmlLinks {
  param([string]$Text)

  $targets = New-Object System.Collections.Generic.HashSet[string]
  foreach ($match in [regex]::Matches($Text, "\[[^\]]+\]\(([^)]+)\)")) {
    $target = $match.Groups[1].Value.Trim()
    if ($target.ToLower().EndsWith(".html")) {
      [void]$targets.Add($target)
    }
  }
  foreach ($match in [regex]::Matches($Text, "(!)?\[\[([^\]]+)\]\]")) {
    $target = $match.Groups[2].Value.Split("|")[0].Trim()
    if ($target.ToLower().EndsWith(".html")) {
      [void]$targets.Add($target)
    }
  }
  return @($targets | Sort-Object)
}

function Make-Excerpt {
  param([string]$Text)

  $plain = Strip-Markdown -Text $Text
  if ($plain.Length -le 180) {
    return $plain
  }

  $excerpt = $plain.Substring(0, 180)
  $lastSpace = $excerpt.LastIndexOf(" ")
  if ($lastSpace -gt 0) {
    $excerpt = $excerpt.Substring(0, $lastSpace)
  }
  return "$excerpt..."
}

function New-NodeList {
  return New-Object System.Collections.ArrayList
}

$notes = New-Object System.Collections.ArrayList
foreach ($mdFile in Get-ChildItem -LiteralPath $ContentDir -Recurse -File -Filter *.md | Sort-Object FullName) {
  if (Test-IgnoredPath -Path $mdFile.FullName) {
    continue
  }

  $rawText = Get-Content -LiteralPath $mdFile.FullName -Raw -Encoding utf8
  $split = Split-FrontMatter -Text $rawText
  $metadata = $split.Metadata
  $body = $split.Body
  $relPath = Get-RelativeContentPath -Path $mdFile.FullName
  $folderSegments = @()
  if ($relPath.Contains("/")) {
    $folderSegments = $relPath.Split("/")[0..($relPath.Split("/").Count - 2)]
  }

  $title = if ($metadata.ContainsKey("title") -and $metadata["title"]) { $metadata["title"].ToString() } else { $mdFile.BaseName }
  $slug = Slugify ($relPath -replace "\.md$", "")
  [void]$notes.Add([ordered]@{
    id = "note:$slug"
    slug = $slug
    title = $title
    relPath = $relPath
    folderSegments = @($folderSegments)
    body = $body
    excerpt = Make-Excerpt -Text $body
    tags = @(Extract-Tags -Text $body -Metadata $metadata)
    wikilinks = @(Extract-Wikilinks -Text $body)
    htmlLinks = @(Extract-HtmlLinks -Text $body)
    plainText = Strip-Markdown -Text $body
    metadata = $metadata
    backlinks = New-Object System.Collections.ArrayList
    links = New-Object System.Collections.ArrayList
  })
}

$aliasMap = @{}
foreach ($note in $notes) {
  $candidates = New-Object System.Collections.Generic.HashSet[string]
  foreach ($candidate in @(
      $note.title,
      $note.relPath,
      ($note.relPath -replace "\.md$", ""),
      ([System.IO.Path]::GetFileNameWithoutExtension($note.relPath))
    )) {
    [void]$candidates.Add((Normalize-Key $candidate))
  }

  if ($note.metadata.ContainsKey("aliases")) {
    $aliases = $note.metadata["aliases"]
    if ($aliases -is [System.Array]) {
      foreach ($alias in $aliases) {
        if ($alias) {
          [void]$candidates.Add((Normalize-Key $alias.ToString()))
        }
      }
    } elseif ($aliases) {
      [void]$candidates.Add((Normalize-Key $aliases.ToString()))
    }
  }

  if ([System.IO.Path]::GetFileNameWithoutExtension($note.relPath).ToLower() -eq "index") {
    $parent = [System.IO.Path]::GetDirectoryName($note.relPath).Replace("\", "/")
    if ($parent -and $parent -ne ".") {
      [void]$candidates.Add((Normalize-Key $parent))
      [void]$candidates.Add((Normalize-Key ([System.IO.Path]::GetFileName($parent))))
    }
  }

  foreach ($candidate in $candidates) {
    if (-not $aliasMap.ContainsKey($candidate)) {
      $aliasMap[$candidate] = $note.id
    }
  }
}

$noteMap = @{}
foreach ($note in $notes) {
  $noteMap[$note.id] = $note
}

foreach ($note in $notes) {
  $resolved = New-Object System.Collections.Generic.HashSet[string]
  foreach ($rawLink in $note.wikilinks) {
    $target = $rawLink.Split("|")[0].Split("#")[0].Trim()
    if ($target.ToLower().EndsWith(".html")) {
      continue
    }
    $normalized = Normalize-Key $target
    if ($aliasMap.ContainsKey($normalized)) {
      $noteId = $aliasMap[$normalized]
      if ($noteId -ne $note.id) {
        [void]$resolved.Add($noteId)
        if (-not $noteMap[$noteId].backlinks.Contains($note.id)) {
          [void]$noteMap[$noteId].backlinks.Add($note.id)
        }
      }
    }
  }

  foreach ($targetId in ($resolved | Sort-Object)) {
    if (-not $note.links.Contains($targetId)) {
      [void]$note.links.Add($targetId)
    }
  }

  $sortedBacklinks = @($note.backlinks | Sort-Object)
  $note.backlinks.Clear()
  foreach ($backlinkId in $sortedBacklinks) {
    [void]$note.backlinks.Add($backlinkId)
  }
}

foreach ($pathToClear in @(
    (Join-Path $OutputDir "404.html"),
    (Join-Path $OutputDir "index.html"),
    (Join-Path $OutputDir ".nojekyll"),
    (Join-Path $OutputDir "assets\styles"),
    (Join-Path $OutputDir "assets\scripts"),
    (Join-Path $OutputDir "assets\data"),
    (Join-Path $OutputDir "assets\content"),
    (Join-Path $OutputDir "components")
  )) {
  if (Test-Path -LiteralPath $pathToClear) {
    Remove-Item -LiteralPath $pathToClear -Recurse -Force -ErrorAction SilentlyContinue
  }
}

foreach ($dir in @(
    $OutputDir,
    (Join-Path $OutputDir "assets"),
    (Join-Path $OutputDir "assets\styles"),
    (Join-Path $OutputDir "assets\scripts"),
    (Join-Path $OutputDir "assets\data"),
    (Join-Path $OutputDir "assets\content"),
    (Join-Path $OutputDir "components")
  )) {
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

Get-ChildItem -LiteralPath (Join-Path $SrcDir "pages") -File | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $OutputDir -Force
}
Get-ChildItem -LiteralPath (Join-Path $SrcDir "components") -File | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $OutputDir "components") -Force
}
Get-ChildItem -LiteralPath (Join-Path $SrcDir "styles") -File | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $OutputDir "assets\styles") -Force
}
Get-ChildItem -LiteralPath (Join-Path $SrcDir "scripts") -File | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $OutputDir "assets\scripts") -Force
}

foreach ($file in Get-ChildItem -LiteralPath $ContentDir -Recurse -File) {
  if (Test-IgnoredPath -Path $file.FullName) {
    continue
  }
  if ($file.Extension.ToLower() -eq ".md") {
    continue
  }
  $relative = Get-RelativeContentPath -Path $file.FullName
  $destination = Join-Path (Join-Path $OutputDir "assets\content") $relative
  $destinationDir = Split-Path -Parent $destination
  New-Item -ItemType Directory -Force -Path $destinationDir | Out-Null
  Copy-Item -LiteralPath $file.FullName -Destination $destination -Force
}

Set-Content -LiteralPath (Join-Path $OutputDir ".nojekyll") -Value "" -Encoding utf8

$topicCounts = @{}
foreach ($note in $notes) {
  $topicName = if ($note.folderSegments.Count -gt 0) { $note.folderSegments[0] } else { "Vault" }
  if (-not $topicCounts.ContainsKey($topicName)) {
    $topicCounts[$topicName] = 0
  }
  $topicCounts[$topicName] += 1
}

$topics = @()
foreach ($topicName in ($topicCounts.Keys | Sort-Object)) {
  $topics += [ordered]@{
    id = Slugify $topicName
    name = $topicName
    count = $topicCounts[$topicName]
  }
}
$topicLookup = @{}
foreach ($topic in $topics) {
  $topicLookup[$topic.name] = $topic.id
}

$sidebarRoot = [ordered]@{
  name = "Knowledge"
  folders = New-NodeList
  notes = New-NodeList
}

function Find-OrCreateFolder {
  param(
    [hashtable]$Node,
    [string]$FolderName,
    [string]$PathKey
  )

  foreach ($folder in $Node.folders) {
    if ($folder.pathKey -eq $PathKey) {
      return $folder
    }
  }

  $folder = [ordered]@{
    name = $FolderName
    pathKey = $PathKey
    folders = New-NodeList
    notes = New-NodeList
  }
  [void]$Node.folders.Add($folder)
  $sortedFolders = @($Node.folders | Sort-Object name)
  $Node.folders.Clear()
  foreach ($item in $sortedFolders) {
    [void]$Node.folders.Add($item)
  }
  return $folder
}

foreach ($note in $notes) {
  $cursor = $sidebarRoot
  $accumulated = @()
  foreach ($segment in $note.folderSegments) {
    $accumulated += $segment
    $cursor = Find-OrCreateFolder -Node $cursor -FolderName $segment -PathKey ($accumulated -join "/")
  }
  [void]$cursor.notes.Add([ordered]@{
    id = $note.id
    slug = $note.slug
    title = $note.title
  })
  $sortedNotes = @($cursor.notes | Sort-Object title)
  $cursor.notes.Clear()
  foreach ($item in $sortedNotes) {
    [void]$cursor.notes.Add($item)
  }
}

$assetMap = @{}
foreach ($asset in Get-ChildItem -LiteralPath (Join-Path $OutputDir "assets\content") -Recurse -File) {
  $relative = $asset.FullName.Substring((Join-Path $OutputDir "assets\content").Length).TrimStart("\", "/").Replace("\", "/")
  $assetUrl = "./assets/content/$relative"
  $normalizedRelative = Normalize-Key $relative
  if (-not $assetMap.ContainsKey($normalizedRelative)) {
    $assetMap[$normalizedRelative] = $assetUrl
  }
  $baseName = Normalize-Key $asset.Name
  if (-not $assetMap.ContainsKey($baseName)) {
    $assetMap[$baseName] = $assetUrl
  }
}

$defaultNote = $notes | Where-Object {
  ([System.IO.Path]::GetFileNameWithoutExtension($_.relPath).ToLower() -eq "index") -or ((Normalize-Key $_.title) -in @("home", "index", "knowledge index"))
} | Select-Object -First 1
if (-not $defaultNote) {
  $defaultNote = $notes | Select-Object -First 1
}

$payloadNotes = @()
$graphNodes = @()
$graphEdges = @()
$references = @{}

foreach ($note in $notes) {
  $topicName = if ($note.folderSegments.Count -gt 0) { $note.folderSegments[0] } else { "Vault" }
  $topicId = $topicLookup[$topicName]

  $payloadNotes += [ordered]@{
    id = $note.id
    slug = $note.slug
    title = $note.title
    relPath = $note.relPath
    folderSegments = @($note.folderSegments)
    body = $note.body
    excerpt = $note.excerpt
    plainText = $note.plainText
    tags = @($note.tags)
    links = @($note.links)
    backlinks = @($note.backlinks)
    htmlLinks = @($note.htmlLinks)
    topicId = $topicId
    topicName = $topicName
    metadata = $note.metadata
  }

  $graphNodes += [ordered]@{
    id = $note.id
    slug = $note.slug
    label = $note.title
    topicId = $topicId
    topicName = $topicName
    tags = @($note.tags)
    degree = $note.links.Count + $note.backlinks.Count
  }

  foreach ($targetId in $note.links) {
    $graphEdges += [ordered]@{
      id = "$($note.id)->$targetId"
      source = $note.id
      target = $targetId
      kind = "wikilink"
    }
  }

  $references[$note.id] = [ordered]@{
    title = $note.title
    slug = $note.slug
    backlinks = @(
      foreach ($backlinkId in $note.backlinks) {
        [ordered]@{
          id = $backlinkId
          title = $noteMap[$backlinkId].title
          slug = $noteMap[$backlinkId].slug
        }
      }
    )
  }
}

$payload = [ordered]@{
  site = [ordered]@{
    name = $Config.siteName
    tagline = $Config.tagline
    defaultNote = if ($defaultNote) { $defaultNote.slug } else { $null }
    basePath = $Config.basePath
  }
  sidebar = $sidebarRoot
  topics = $topics
  assets = $assetMap
  notes = $payloadNotes
  graph = [ordered]@{
    topics = $topics
    nodes = $graphNodes
    edges = $graphEdges
  }
  references = $references
}

$json = $payload | ConvertTo-Json -Depth 100
Set-Content -LiteralPath (Join-Path $OutputDir "assets\data\site-data.json") -Value $json -Encoding utf8
Write-Host "Built $($notes.Count) notes into $OutputDir"
