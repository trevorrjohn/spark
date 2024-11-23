class PulseWire::Installer
  def install
    file_watcher = PulseWire::FileWatcher.new

    file_watcher.monitor(PulseWire.css_paths, &method(:reload_css))

    file_watcher.start
  end

  private
    def reload_css(file)
      puts "CSS changed #{file}"
    end
end
