require "importmap-rails"
require "turbo-rails"
require "importmap-rails"

module PulseWire
  class Engine < ::Rails::Engine
    isolate_namespace PulseWire

    config.pulse_wire = ActiveSupport::OrderedOptions.new

    initializer "pulse_wire.config" do |app|
      config.pulse_wire.each do |key, value|
        PulseWire.send("#{key}=", value)
      end
    end

    initializer "pulse_wire.assets" do |app|
      app.config.assets.paths << root.join("app/javascript")
    end

    initializer "pulse_wire.importmap", before: "importmap" do |app|
      PulseWire.importmap.draw(root.join("config/importmap.rb"))
      # PulseWire.importmap.cache_sweeper(watches: root.join("app/javascript"))
      #
      # ActiveSupport.on_load(:action_controller_base) do
      #   before_action { PulseWire.importmap.cache_sweeper.execute_if_updated }
      # end
    end

    initializer "pulse_wire.install" do
      PulseWire.install if Rails.env.development?
    end
  end
end
