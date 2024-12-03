Rails.application.routes.draw do
  mount HotwireSpark::Engine => "/hotwire_spark"

  root to: "home#show"
end
