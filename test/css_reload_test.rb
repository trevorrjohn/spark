require "application_system_test_case"

class CssReloadTest < ApplicationSystemTestCase
  test "reload Stimulus controller changes" do
    visit root_path
    assert_text "_REPLACE_"

    change_file "app/javascript/controllers/dummy_controller.js", "_REPLACE_", "This was replaced!"

    assert_no_text "This was replaced!"
  end
end
