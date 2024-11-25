import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
    this.version = 3
  }

  connect() {
    console.debug("Dummy controller connected ", this.version)
    this.element.style = "color: blue;"
  }

  disconnect() {
    console.debug("Dummy controller disconnected", this.version)
  }
}
