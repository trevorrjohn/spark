import { Turbo } from "@hotwired/turbo-rails"
import { CssReloader } from "../reloaders/css_reloader.js";
import { nameFromFilePath } from "../helpers.js";

Turbo.StreamActions.reload_css = function() {
  const filePath = nameFromFilePath(this.getAttribute("file_path"))
  CssReloader.reload(new RegExp(filePath))
}
