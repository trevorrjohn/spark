require "turbo-rails"

class HotwireSpark::Installer
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
      ::ActionCable::Server::Base.prepend(HotwireSpark::ActionCable::PersistentCableServer)

      middleware.insert_before ActionDispatch::Executor, HotwireSpark::ActionCable::PersistentCableMiddleware
      middleware.use HotwireSpark::Middleware
    end

    def monitor_paths
      monitor :css_paths, action: :reload_css
      monitor :html_paths, action: :reload_html
      monitor :stimulus_paths, action: :reload_stimulus

      file_watcher.start
    end

    def monitor(paths_name, action:)
      file_watcher.monitor HotwireSpark.public_send(paths_name) do |file_path|
        ActionCable.server.broadcast "hotwire_spark", stream_action_for(action, file_path)
      end
    end

    def file_watcher
      @file_watches ||= HotwireSpark::FileWatcher.new
    end

    def stream_action_for(action, file_path)
      <<~HTML
        <turbo-stream action="#{action}" file_path="#{file_path}">
      HTML
    end
end
