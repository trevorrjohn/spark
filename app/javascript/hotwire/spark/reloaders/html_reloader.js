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
    if(HotwireSpark.config.htmlReloadStrategy == "morph") {
      const reloadedDocument = await this.#reloadWithMorph()
      await this.#reloadStimulus(reloadedDocument)
    } else if(HotwireSpark.config.htmlReloadStrategy == "turbo") {
      await this.#reloadWithTurbo()
    } else {
      throw new Error(`Invalid html reload strategy "${HotwireSpark.config.htmlReloadStrategy}". Only "morph" and "turbo" is supported.`)
    }
  }

  async #reloadWithTurbo() {
    log("Reload html with Turbo...")

    return new Promise((resolve) => {
      document.addEventListener("turbo:load", () => {
        resolve(document)
      }, { once: true })
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

  async #reloadStimulus(reloadedDocument) {
    return new StimulusReloader(reloadedDocument).reload()
  }
}
