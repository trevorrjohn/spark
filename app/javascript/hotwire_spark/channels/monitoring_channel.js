import consumer from "./consumer"
import { nameFromFilePath } from "../helpers.js";
import { HtmlReloader } from "../reloaders/html_reloader.js";
import { CssReloader } from "../reloaders/css_reloader.js";
import { StimulusReloader } from "../reloaders/stimulus_reloader.js";

consumer.subscriptions.create({ channel: "HotwireSpark::Channel" }, {
  connected() {
    document.body.setAttribute("data-hotwire-spark-ready", "")
  },

  received(data) {
    this.dispatchMessage(data)
  },

  dispatchMessage({ action, path }) {
    const fileName = nameFromFilePath(path)

    switch (action) {
      case "reload_html":
        this.reloadHtml()
        break
      case "reload_css":
        this.reloadCss(fileName)
        break
      case "reload_stimulus":
        this.reloadStimulus(fileName)
        break
    }
  },

  reloadHtml() {
    HtmlReloader.reload()
  },

  reloadCss(path) {
    CssReloader.reload(new RegExp(path))
  },

  reloadStimulus(path) {
    StimulusReloader.reload(new RegExp(path))
  }
})

