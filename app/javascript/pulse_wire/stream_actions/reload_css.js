import { Turbo } from "@hotwired/turbo-rails"
import { CssReloader } from "../reloaders/css_reloader.js";

Turbo.StreamActions.reload_css = function() {
  new CssReloader().reload()
}
