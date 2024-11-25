import { Idiomorph } from "idiomorph/dist/idiomorph.esm.js"

export class HtmlReloader {
  static reload() {
    new HtmlReloader().reload()
  }

  async reload() {
    console.debug("HTML reloaded")

    try {
      const response = await fetch(window.location.href)

      if (!response.ok) {
        throw new Error(`Failed to fetch HTML: ${response.statusText}`)
      }

      const fetchedHTML = await response.text()
      const parser = new DOMParser()
      const fetchedDocument = parser.parseFromString(fetchedHTML, "text/html")

      this.updateHead(fetchedDocument.head)

      Idiomorph.morph(document.body, fetchedDocument.body, {
        callbacks: {
          beforeNodeMorphed: function (oldNode, newNode) {
            const value = !(oldNode instanceof HTMLElement) || !oldNode.closest("turbo-cable-stream-source")
            return value
          }
        }
      })

      console.debug("HTML successfully reloaded")
    } catch (error) {
      console.error("Error reloading HTML:", error)
    }
  }

  updateHead(newHead) {
    Idiomorph.morph(document.head, newHead)
  }
}
