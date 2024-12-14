import { Idiomorph } from "idiomorph/dist/idiomorph.esm.js"
import { log } from "../logger.js"
import { reloadHtmlDocument } from "../helpers.js"
import { StimulusReloader } from "./stimulus_reloader.js"

export class HtmlReloader {
  static async reload() {
    return new HtmlReloader().reload()
  }

  async reload() {
    const reloadedDocument = await this.#reloadHtml()
    await this.#reloadStimulus(reloadedDocument)
  }

  async #reloadHtml() {
    log("Reload html...")

    const reloadedDocument = await reloadHtmlDocument()
    this.#updateBody(reloadedDocument.body)
    return reloadedDocument
  }

  async #reloadStimulus(reloadedDocument) {
    return new StimulusReloader(reloadedDocument).reload()
  }

  #updateBody(newBody) {
    Idiomorph.morph(document.body, newBody)
  }
}
