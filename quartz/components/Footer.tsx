import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          Maintained by Yash Agrawall © {year}
        </p>
        <ul>
         <li>
          <a href="https://www.linkedin.com/in/yash-agrawall-a044052aa/">LinkedIn</a>
        </li>
        <li>
          <a href="https://github.com/just-yash">GitHub</a>
        </li>
        <li>
          <a href="mailto:yashagrawall333@gmail.com">Email</a>
        </li>
        </ul>

      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
