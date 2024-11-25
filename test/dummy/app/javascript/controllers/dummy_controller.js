import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.debug("Dummy controller connected")

    // this.element.style = "color: blue;"
  }
}
