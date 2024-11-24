import { Application } from "@hotwired/stimulus"

class JavascriptReloader {
  #controllerAttribute = "data-controller"
  #importmapSelector = "script[type=importmap]"
  #application

  constructor() {
    this.#application = window.Stimulus || Application.start()
  }

  async reload() {
    // this.#application.stop()
    this.#application.controllers.forEach((controller) => console.debug("UNLOAD Controller", controller.identifier))
    this.#application.controllers.forEach((controller) => controller.disconnect())
    this.#application.controllers.forEach((controller) => this.#application.unload(controller.identifier))
    this.#application.stop()

    // this.#application = Application.start()
    // this.#application.stop()
    // this.#application.controllers.forEach((controller) => controller.disconnect())

    // await this.#reloadImportmapModules()
    await this.#reloadStimulusControllers()
    // await this.#resetDataControllers()

    this.#application.start()
  }

  // async #reloadImportmapModules() {
  //   const importmap = this.#parseImportmapJson()
  //   const modulePaths = Object.values(importmap)
  //
  //   await Promise.all(
  //     modulePaths.map(async path => {
  //       const moduleUrl = await this.#reloadModulePreloadLink(path)
  //       await import(moduleUrl).catch(error => console.error(`Failed to import module: ${moduleUrl}`, error))
  //     })
  //   )
  //   console.log("All importmap modules reloaded.")
  // }

  async #reloadStimulusControllers() {
    const pathsByModule = this.#parseImportmapJson()
    const controllerPaths = Object.keys(pathsByModule).filter(path => path.endsWith("_controller"))

    await Promise.all(
      controllerPaths.map(async moduleName => {
        console.debug("Importing ", moduleName)
        const controllerName = this.#extractControllerName(moduleName)
        // if (this.#canRegisterController(controllerName)) {
        const path = pathsByModule[moduleName] + "?bust_cache=" + Date.now()
        await import(path)
          .then(module => this.#registerController(controllerName, module))
          .catch(error => console.error(`Failed to reload controller: ${controllerName}`, error))
        // }
      })
    )

    console.log("All Stimulus controllers reloaded and re-registered.")
  }

  async #resetDataControllers() {
    const elements = document.querySelectorAll(`[${this.#controllerAttribute}]`)
    const originalControllerData = new Map()

    elements.forEach(element => {
      originalControllerData.set(element, element.getAttribute(this.#controllerAttribute))
      element.removeAttribute(this.#controllerAttribute)
    })

    await new Promise(requestAnimationFrame)

    originalControllerData.forEach((controllerNames, element) => {
      element.setAttribute(this.#controllerAttribute, controllerNames)
    })

    console.log("Data controllers reset.")
  }

  #parseImportmapJson() {
    const importmapScript = document.querySelector(this.#importmapSelector)
    return JSON.parse(importmapScript.text).imports
  }

  #extractControllerName(path) {
    return path
      .replace(/^.*\//, "")
      .replace("_controller", "")
      .replace(/\//g, "--")
      .replace(/_/g, "-")
  }

  #registerController(name, module) {
    console.debug("REGISTERING", name, module)
    this.#application.unload(name)
    this.#application.register(name, module.default)
  }

  #canRegisterController(name) {
    return !this.#application.router.modulesByIdentifier.has(name)
  }
}


Turbo.StreamActions.reload_javascript = function () {
  new JavascriptReloader().reload()
}
