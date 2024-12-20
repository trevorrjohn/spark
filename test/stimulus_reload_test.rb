require "application_system_test_case"

class StimulusReloadTest < ApplicationSystemTestCase
  test "reload Stimulus controller changes" do
    visit root_path
    assert_no_text "This was replaced!"

    edit_file "app/javascript/controllers/dummy_controller.js", replace: "_REPLACE_", with: "This was replaced!"

    assert_text "This was replaced!"
  end

  test "load new Stimulus controllers" do
    visit root_path
    assert_no_text "This was replaced!"

    edit_file "app/views/home/show.html.erb", replace: "_REPLACE_CONTROLLER_", with: "other-dummy"
    sleep 2 # Broadcasting many jobs in a row sometimes makes the test fail

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
