Rails.application.routes.draw do
  mount Hotwire::Spark::Engine => "/hotwire_spark"

  root to: "home#show"
end
