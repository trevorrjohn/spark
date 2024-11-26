import { log } from "../logger.js"

export class CssReloader {
  static async reload(...params) {
    return new CssReloader(...params).reload()
  }

  async reload() {
    log("Reload css...")

    await Promise.all(this.#reloadAllLinks())
  }

  #reloadAllLinks() {
    return Array.from(this.#cssLinks).map(link => this.#reloadLink(link))
  }

  get #cssLinks() {
    return document.querySelectorAll("link[rel='stylesheet']")
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
