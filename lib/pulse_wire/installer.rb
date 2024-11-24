require "turbo-rails"

class PulseWire::Installer
  attr_reader :file_watcher

  def initialize
    @file_watcher = PulseWire::FileWatcher.new
  end

  def install
    monitor :css_paths, action: :reload_css
    monitor :html_paths, action: :reload_html
    monitor :javascript_paths, action: :reload_javascript

    file_watcher.start
  end

  private
    def monitor(paths_name, action:)
      file_watcher.monitor PulseWire.public_send(paths_name) do
        ActionCable.server.broadcast "pulse_wire", stream_action_for(action)
      end
    end

    def stream_action_for(action)
      <<~HTML
        <turbo-stream action="#{action}">
      HTML
    end
end
