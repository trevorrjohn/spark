import { Idiomorph } from "idiomorph/dist/idiomorph.esm.js"
import { log } from "../logger.js"
import { reloadHtmlDocument } from "../helpers.js"
import { StimulusReloader } from "./stimulus_reloader.js"
import HotwireSpark from "../index.js"

export class HtmlReloader {
  static async reload() {
    return new HtmlReloader().reload()
  }

  async reload() {
    if(HotwireSpark.config.htmlReloadMethod == "morph") {
      const reloadedDocument = await this.#reloadWithMorph()
      await this.#reloadStimulus(reloadedDocument)
    } else if(HotwireSpark.config.htmlReloadMethod == "replace") {
      await this.#reloadWithTurbo()
    } else {
      throw new Error(`Invalid html reload method "${HotwireSpark.config.htmlReloadMethod}". Only "morph" and "replace" is supported.`)
    }
  }

  #reloadWithTurbo() {
    log("Reload html with Turbo...")

    this.#maintainScrollPosition()
  
    return new Promise(resolve => {
      document.addEventListener("turbo:load", () => resolve(document), { once: true })
      window.Turbo.visit(window.location)
    })
  }

  async #reloadWithMorph() {
    log("Reload html with morph...")

    const reloadedDocument = await reloadHtmlDocument()
    this.#updateBody(reloadedDocument.body)
    return reloadedDocument
  }

  #updateBody(newBody) {
    Idiomorph.morph(document.body, newBody)
  }

  #maintainScrollPosition() {
    document.addEventListener("turbo:render", () => {
      Turbo.navigator.currentVisit.scrolled = true
    }, { once: true })
  }

  async #reloadStimulus(reloadedDocument) {
    return new StimulusReloader(reloadedDocument).reload()
  }
}
