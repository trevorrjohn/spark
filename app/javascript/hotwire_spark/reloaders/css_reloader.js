import { log } from "../logger.js"
import { cacheBustedUrl, reloadHtmlDocument } from "../helpers.js"

export class CssReloader {
  static async reload(...params) {
    return new CssReloader(...params).reload()
  }

  constructor(filePattern = /./) {
    this.filePattern = filePattern
  }

  async reload() {
    log("Reload css...")
    this.newCssLinks = await this.#loadNewCssLinks()
    await Promise.all(this.#reloadAllLinks())
  }

  async #loadNewCssLinks() {
    const reloadedDocument = await reloadHtmlDocument()
    return Array.from(reloadedDocument.head.querySelectorAll("link[rel='stylesheet']"))
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
    return this.filePattern.test(link.getAttribute("href"))
  }

  async #reloadLink(link) {
    return new Promise(resolve => {
      const href = link.getAttribute("href")
      const newLink = this.#findNewLinkFor(link)

      newLink.href = cacheBustedUrl(newLink.href)
      newLink.onload = () => {
        log(`\t${href}`)
        resolve()
      }
      link.parentNode.replaceChild(newLink, link)
    })
  }

  #findNewLinkFor(link) {
    return this.newCssLinks.find(newLink => {
      return this.#withoutAssetDigest(link.href) === this.#withoutAssetDigest(newLink.href)
    })
  }

  #withoutAssetDigest(url) {
    return url.replace(/-[^-]+\.css$/, ".css")
  }
}
