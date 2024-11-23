require "importmap-rails"

module PulseWire
  class Engine < ::Rails::Engine
    isolate_namespace PulseWire

    initializer "pulse_wire.assets" do |app|
      app.config.assets.paths << root.join("app/javascript")
    end

    initializer "pulse_wire.importmap", before: "importmap" do |app|
      PulseWire.importmap.draw(root.join("config/importmap.rb"))
      PulseWire.importmap.cache_sweeper(watches: root.join("app/javascript"))

      ActiveSupport.on_load(:action_controller_base) do
        before_action { PulseWire.importmap.cache_sweeper.execute_if_updated }
      end
    end
  end
end
