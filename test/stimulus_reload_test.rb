require "application_system_test_case"

class StimulusReloadTest < ApplicationSystemTestCase
  test "reload Stimulus controller changes" do
    visit root_path
    assert_no_text "This was replaced!"

    change_file "app/javascript/controllers/dummy_controller.js", "_REPLACE_", "This was replaced!"

    assert_text "This was replaced!"
  end

  test "load new Stimulus controllers" do
    visit root_path
    assert_no_text "This was replaced!"

    change_file "app/views/home/show.html.erb", "_REPLACE_CONTROLLER_", "other-dummy"

    add_file "app/javascript/controllers/other_dummy_controller.js", <<~JS
      import { Controller } from "@hotwired/stimulus"

      export default class extends Controller {
        connect() {
          this.element.querySelector("p").textContent = "This was replaced!"
        }
      }
    JS

    assert_text "This was replaced!"
  end
end
