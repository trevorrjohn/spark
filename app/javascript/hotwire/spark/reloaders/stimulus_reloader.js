import { Application } from "@hotwired/stimulus"
import { log } from "../logger.js"
import { cacheBustedUrl, reloadHtmlDocument } from "../helpers.js"

export class StimulusReloader {
  static async reload(filePattern) {
    const document = await reloadHtmlDocument()
    return new StimulusReloader(document, filePattern).reload()
  }

  constructor(document, filePattern = /./) {
    this.document = document
    this.filePattern = filePattern
    this.application = window.Stimulus || Application.start()
  }

  async reload() {
    log("Reload Stimulus controllers...")

    this.application.stop()

    await this.#reloadChangedStimulusControllers()
    this.#unloadDeletedStimulusControllers()

    this.application.start()
  }

  async #reloadChangedStimulusControllers() {
    await Promise.all(
      this.#stimulusControllerPathsToReload.map(async moduleName => this.#reloadStimulusController(moduleName))
    )
  }

  get #stimulusControllerPathsToReload() {
    this.controllerPathsToReload = this.controllerPathsToReload || this.#stimulusControllerPaths.filter(path => this.#shouldReloadController(path))
    return this.controllerPathsToReload
  }

  get #stimulusControllerPaths() {
    return Object.keys(this.#stimulusPathsByModule).filter(path => path.endsWith("_controller"))
  }

  #shouldReloadController(path) {
    return this.filePattern.test(path)
  }

  get #stimulusPathsByModule() {
    this.pathsByModule = this.pathsByModule || this.#parseImportmapJson()
    return this.pathsByModule
  }

  #parseImportmapJson() {
    const importmapScript = this.document.querySelector("script[type=importmap]")
    return JSON.parse(importmapScript.text).imports
  }

  async #reloadStimulusController(moduleName) {
    log(`\t${moduleName}`)

    const controllerName = this.#extractControllerName(moduleName)
    const path = cacheBustedUrl(this.#pathForModuleName(moduleName))

    const module = await import(path)

    this.#registerController(controllerName, module)
  }

  #unloadDeletedStimulusControllers() {
    this.#controllersToUnload.forEach(controller => this.#deregisterController(controller.identifier))
  }

  get #controllersToUnload() {
    if (this.#didChangeTriggerAReload) {
      return []
    } else {
      return this.application.controllers.filter(controller => this.filePattern.test(`${controller.identifier}_controller`))
    }
  }

  get #didChangeTriggerAReload() {
    return this.#stimulusControllerPathsToReload.length > 0
  }

  #pathForModuleName(moduleName) {
    return this.#stimulusPathsByModule[moduleName]
  }

  #extractControllerName(path) {
    return path
      .replace(/^.*\//, "")
      .replace("_controller", "")
      .replace(/\//g, "--")
      .replace(/_/g, "-")
  }

  #registerController(name, module) {
    this.#deregisterController(name)
    this.application.register(name, module.default)
  }

  #deregisterController(name) {
    log(`\tRemoving controller ${name}`)
    this.application.unload(name)
  }
}
