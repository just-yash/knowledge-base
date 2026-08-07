const fs = require('fs');
const path = require('path');

const themeDir = __dirname;
const stylesDir = path.join(themeDir, 'src', 'styles');
const themePath = path.join(themeDir, 'theme.css');

const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cinzel+Decorative:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap');\n\n`;

const files = fs.readdirSync(stylesDir)
    .filter(f => f.endsWith('.css'))
    .sort();

let finalCss = fontImport;

for (const file of files) {
    const content = fs.readFileSync(path.join(stylesDir, file), 'utf8');
    finalCss += content + '\n\n';
}

fs.writeFileSync(themePath, finalCss);
console.log('theme.css built successfully!');
