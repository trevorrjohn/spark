require "application_system_test_case"

class CssReloadTest < ApplicationSystemTestCase
  test "reload HTML changes" do
    visit root_path
    assert_text "This is pretty cool"

    change_file "app/assets/stylesheets/base.css", "visible", "hidden"

    assert_no_text "This is pretty cool"
  end
end
