import { Turbo } from "@hotwired/turbo-rails"
import { Idiomorph } from "idiomorph"

class HtmlReloader {
  async reload() {
    console.debug("HTML reloaded")

    try {
      const response = await fetch(window.location.href)
      const html = await response.text

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
    // Use Idiomorph to morph the head section
    Idiomorph.morph(document.head, newHead)
    console.debug("Head updated using idiomorph")
  }
}

const htmlReloader = new HtmlReloader()

Turbo.StreamActions.reload_html = async function () {
  htmlReloader.reload()
}
