require "application_system_test_case"

class HtmlReloadTest < ApplicationSystemTestCase
  test "reload HTML changes" do
    visit root_path
    assert_no_text "This was replaced"

    change_file "app/views/home/show.html.erb", "_REPLACE_", "This was replaced!"

    assert_text "This was replaced"
  end
end
