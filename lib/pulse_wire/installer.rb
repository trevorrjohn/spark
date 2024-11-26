require "turbo-rails"

class PulseWire::Installer
  attr_reader :file_watcher

  def initialize(application)
    @application = application
  end

  def install
    configure_middleware
    monitor_paths
  end

  private
    attr_reader :application
    delegate :middleware, to: :application

    def configure_middleware
      ::ActionCable::Server::Base.prepend(PulseWire::ActionCable::PersistentCableServer)

      middleware.insert_before ActionDispatch::Executor, PulseWire::ActionCable::PersistentCableMiddleware
      middleware.use PulseWire::Middleware
    end

    def monitor_paths
      monitor :css_paths, action: :reload_css
      monitor :html_paths, action: :reload_html
      monitor :stimulus_paths, action: :reload_stimulus

      file_watcher.start
    end

    def monitor(paths_name, action:)
      file_watcher.monitor PulseWire.public_send(paths_name) do |file_path|
        ActionCable.server.broadcast "pulse_wire", stream_action_for(action, file_path)
      end
    end

    def file_watcher
      @file_watches ||= PulseWire::FileWatcher.new
    end

    def stream_action_for(action, file_path)
      <<~HTML
        <turbo-stream action="#{action}" path="#{file_path}">
      HTML
    end
end
