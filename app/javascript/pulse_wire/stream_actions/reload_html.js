import { Turbo } from "@hotwired/turbo-rails"
import { HtmlReloader } from "../reloaders/html_reloader.js"

Turbo.StreamActions.reload_html = function () {
  HtmlReloader.reload()
}
