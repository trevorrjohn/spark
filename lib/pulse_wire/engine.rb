require "turbo-rails"
require "action_cable/server/base"

module PulseWire
  class Engine < ::Rails::Engine
    isolate_namespace PulseWire

    config.pulse_wire = ActiveSupport::OrderedOptions.new

    initializer "pulse_wire.config" do |app|
      config.pulse_wire.each do |key, value|
        PulseWire.send("#{key}=", value)
      end
    end

    initializer "pulse_wire.install" do |app|
      if Rails.env.development?
        ::ActionCable::Server::Base.prepend(PulseWire::ActionCable::PersistentCableServer)
        app.middleware.insert_before ActionDispatch::Executor, PulseWire::ActionCable::PersistentCableMiddleware
        app.middleware.use PulseWire::Middleware

        PulseWire.install
      end
    end
  end
end
