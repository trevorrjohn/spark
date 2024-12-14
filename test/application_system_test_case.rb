require "test_helper"
require "capybara/cuprite"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :cuprite, screen_size: [ 1440, 900 ], options: { headless: "new" }

  include HotwireSpark::Engine.routes.url_helpers

  def visit(...)
    super.tap do
      wait_for_hotwire_spark
    end
  end
end

Capybara.server = :puma, { Silent: true }
