export class CssReloader {
  static async reload(...params) {
    return new CssReloader(...params).reload()
  }

  async reload() {
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
      link.setAttribute("href", `${href}?reload=${Date.now()}`)
      link.onload = () => resolve()
    })
  }
}
