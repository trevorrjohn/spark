import { Turbo } from "@hotwired/turbo-rails"
import { JavascriptReloader } from "../reloaders/javascript_reloader.js";

Turbo.StreamActions.reload_javascript = function () {
  new JavascriptReloader().reload()
}
