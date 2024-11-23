Rails.application.routes.draw do
  mount PulseWire::Engine => "/pulse_wire"

  root to: "home#show"
end
