import { Turbo } from "@hotwired/turbo-rails"

Turbo.StreamActions.reload_html = function() {
  console.log("HTML reload")
}
