import { log } from "../logger.js"

export class CssReloader {
  static async reload(...params) {
    return new CssReloader(...params).reload()
  }

  constructor(filePattern = /./) {
    this.filePattern = filePattern
  }

  async reload() {
    log("Reload css...")

    await Promise.all(this.#reloadAllLinks())
  }

  #reloadAllLinks() {
    return Array.from(this.#cssLinks).map(link => this.#reloadLinkIfNeeded(link))
  }

  get #cssLinks() {
    return document.querySelectorAll("link[rel='stylesheet']")
  }

  #reloadLinkIfNeeded(link) {
    if (this.#shouldReloadLink(link)) {
      return this.#reloadLink(link)
    } else {
      return Promise.resolve()
    }
  }

  #shouldReloadLink(link) {
    console.debug("Es", this.filePattern)
    return this.filePattern.test(link.getAttribute("href"))
  }

  async #reloadLink(link) {
    return new Promise(resolve => {
      const href = link.getAttribute("href")
      const newLink = document.createElement("link")
      newLink.rel = "stylesheet"
      newLink.href = `${href}?reload=${Date.now()}`
      newLink.onload = () => {
        log(`\t${href}`)
        resolve()
      }
      link.parentNode.replaceChild(newLink, link)
    })
  }
}
