require "application_system_test_case"

class HtmlReloadTest < ApplicationSystemTestCase
  setup do
    Hotwire::Spark.html_reload_method = "morph"
  end

  test "reload HTML changes" do
    visit root_path
    assert_no_text "This was replaced"
    assert_config("html-reload-method", "morph")

    edit_file "app/views/home/show.html.erb", replace: "_REPLACE_", with: "This was replaced!"

    assert_text "This was replaced"
  end

  private

  def assert_config(name, value)
    assert_selector "meta[name='hotwire-spark:#{name}'][content='#{value}']", visible: false
  end
end
