import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
    this.version = 1
  }

  connect() {
    console.debug("Dummy controller connected ", this.version)
  }

  disconnect() {
    console.debug("Dummy controller disconnected", this.version)
  }
}
