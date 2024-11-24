require "turbo-rails"

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
        app.middleware.use PulseWire::Middleware
        PulseWire.install
      end
    end
  end
end
