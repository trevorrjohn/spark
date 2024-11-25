import { Turbo } from "@hotwired/turbo-rails"
import { StimulusReloader } from "../reloaders/stimulus_reloader.js";

Turbo.StreamActions.reload_stimulus = function () {
  StimulusReloader.reload()
}
