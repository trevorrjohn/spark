import consumer from "./consumer"
import { nameFromFilePath } from "../helpers.js";
import { HtmlReloader } from "../reloaders/html_reloader.js";
import { CssReloader } from "../reloaders/css_reloader.js";
import { StimulusReloader } from "../reloaders/stimulus_reloader.js";

consumer.subscriptions.create({ channel: "HotwireSpark::Channel" }, {
  connected() {
    document.body.setAttribute("data-hotwire-spark-ready", "")
  },

  async received(data) {
    try {
      await this.dispatchMessage(data)
    } catch(error) {
      console.log(`Error on ${data.action}`, error)
    }
  },

  dispatchMessage({ action, path }) {
    const fileName = nameFromFilePath(path)

    switch (action) {
      case "reload_html":
        return this.reloadHtml()
      case "reload_css":
        return this.reloadCss(fileName)
      case "reload_stimulus":
        return this.reloadStimulus(fileName)
    }
  },

  reloadHtml() {
    return HtmlReloader.reload()
  },

  reloadCss(path) {
    return CssReloader.reload(new RegExp(path))
  },

  reloadStimulus(path) {
    return StimulusReloader.reload(new RegExp(path))
  }
})

