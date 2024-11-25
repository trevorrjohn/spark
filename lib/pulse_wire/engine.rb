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

    initializer "pulse_wire.install" do |application|
      PulseWire.install_into application if Rails.env.development?
    end
  end
end
