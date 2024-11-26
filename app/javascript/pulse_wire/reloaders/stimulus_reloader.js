import { Application } from "@hotwired/stimulus"
import { log } from "../logger.js"
import { cacheBustedUrl } from "../helpers.js";

export class StimulusReloader {
  static async reload() {
    return new StimulusReloader().reload()
  }

  constructor() {
    this.application = window.Stimulus || Application.start()
  }

  async reload() {
    log("Reload Stimulus controllers...")

    this.application.stop()

    await this.#reloadStimulusControllers()

    this.application.start()
  }

  async #reloadStimulusControllers() {
    await Promise.all(
      this.#stimulusControllerPaths.map(async moduleName => this.#reloadStimulusController(moduleName))
    )
  }

  get #stimulusControllerPaths() {
    return Object.keys(this.#stimulusPathsByModule).filter(path => path.endsWith("_controller"))
  }

  get #stimulusPathsByModule() {
    this.pathsByModule = this.pathsByModule || this.#parseImportmapJson()
    return this.pathsByModule
  }

  #parseImportmapJson() {
    const importmapScript = document.querySelector("script[type=importmap]")
    return JSON.parse(importmapScript.text).imports
  }

  async #reloadStimulusController(moduleName) {
    log(`\t${moduleName}`)

    const controllerName = this.#extractControllerName(moduleName)
    const path = cacheBustedUrl(this.#pathForModuleName(moduleName))

    const module = await import(path)

    this.#registerController(controllerName, module)
  }

  #pathForModuleName(moduleName) {
    return this.#stimulusPathsByModule[moduleName];
  }

  #extractControllerName(path) {
    return path
      .replace(/^.*\//, "")
      .replace("_controller", "")
      .replace(/\//g, "--")
      .replace(/_/g, "-")
  }

  #registerController(name, module) {
    this.application.unload(name)
    this.application.register(name, module.default)
  }
}
