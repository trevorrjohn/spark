import { Turbo } from "@hotwired/turbo-rails"
import { StimulusReloader } from "../reloaders/stimulus_reloader.js"
import { nameFromFilePath } from "../helpers.js"

Turbo.StreamActions.reload_stimulus = function () {
  const filePath = nameFromFilePath(this.getAttribute("file_path"))
  StimulusReloader.reload(window.document, new RegExp(filePath))
}
