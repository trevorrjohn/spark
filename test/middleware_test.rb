require "application_system_test_case"

class MiddlewareTest < ActionDispatch::IntegrationTest
  test "don't fail on redirects" do
    get "/redirected"
  end
end
