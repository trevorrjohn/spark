module FilesHelper
  extend ActiveSupport::Concern

  included do
    teardown do
      restore_original_files
      delete_added_files
    end
  end

  ORIGINAL_EXTENSION = ".original"

  def change_file(path, pattern, replacement)
    path = Rails.application.root.join(path).to_s

    raise ArgumentError, "File at '#{path}' does not exist." unless File.exist?(path)

    original_path = "#{path}#{ORIGINAL_EXTENSION}"
    remember_path_to_restore original_path
    system "cp", path, original_path

    content = File.read(path)
    updated_content = content.gsub(pattern, replacement)
    File.write(path, updated_content)

    reload_rails_reloader
  end

  def add_file(path, content)
    path = Rails.application.root.join(path).to_s

    raise ArgumentError, "File at '#{path}' already exists." if File.exist?(path)

    remember_path_to_delete path
    File.write path, content

    reload_rails_reloader
  end

  private
    def remember_path_to_restore(path)
      paths_to_restore << path
    end

    def paths_to_restore
      @paths_to_restore ||= []
    end

    def remember_path_to_delete(path)
      paths_to_delete << path
    end

    def paths_to_delete
      @paths_to_delete ||= []
    end

    def restore_original_files
      paths_to_restore.each do |path|
        FileUtils.cp(path, path.gsub(/#{ORIGINAL_EXTENSION}$/, ""))
        FileUtils.rm(path)
      end
    end

    def delete_added_files
      paths_to_delete.each do |path|
        FileUtils.rm(path)
      end
    end
end
