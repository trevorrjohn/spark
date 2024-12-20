require "application_system_test_case"

class HtmlReloadTest < ApplicationSystemTestCase
  test "reload HTML changes" do
    visit root_path
    assert_no_text "This was replaced"
    assert_config("html-reload-strategy", "morph")

    edit_file "app/views/home/show.html.erb", replace: "_REPLACE_", with: "This was replaced!"

    assert_text "This was replaced"
  end

  test "reload HTML changes with Turbo" do
    with_turbo_reload_strategy do
      visit root_path
      assert_no_text "This is pretty amazing"
      assert_config("html-reload-strategy", "turbo")

      edit_file "app/views/home/show.html.erb", replace: "cool", with: "amazing"

      assert_text "This is pretty amazing"
    end
  end

  private

  def assert_config(name, value)
    assert_selector "meta[name='hotwire-spark:#{name}'][content='#{value}']", visible: false
  end

  def with_turbo_reload_strategy
    old_strategy = Hotwire::Spark.html_reload_strategy
    Hotwire::Spark.html_reload_strategy = "turbo"

    yield

    Hotwire::Spark.html_reload_strategy = old_strategy
  end
end
