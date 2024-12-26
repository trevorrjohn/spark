require "application_system_test_case"

class MiddlewareTest < ActionDispatch::IntegrationTest
  test "error" do
    get "/redirected"
  end
end
