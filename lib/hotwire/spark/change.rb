class Hotwire::Spark::Change
  attr_reader :paths, :extensions, :changed_path, :action

  def initialize(paths, extensions, changed_path, action)
    @paths = paths
    @extensions = extensions
    @changed_path = changed_path
    @action = action
  end

  def broadcast
    broadcast_reload_action if should_broadcast?
  end

  private
    def broadcast_reload_action
      Hotwire::Spark.cable_server.broadcast "hotwire_spark", reload_message
    end

    def reload_message
      { action: action, path: canonical_changed_path }
    end

    def canonical_changed_path
      canonical_changed_path = changed_path
      paths.each { |path| canonical_changed_path = canonical_changed_path.to_s.gsub(/^#{path}/, "") }
      canonical_changed_path
    end

    def should_broadcast?
      changed_path.to_s =~ extension_regexp
    end

    def extension_regexp
      /#{extensions.map { |ext| "\\." + ext }.join("|")}$/
    end
end
