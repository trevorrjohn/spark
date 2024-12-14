module FilesHelper
  extend ActiveSupport::Concern

  included do
    teardown do
      restore_original_files
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

    # It hangs if I don't invoke explicitly in system tests with reloading enabled
    Rails.application.reloader.reload!
  end

  # Remove .original files
  def restore_original_files
    @paths_to_restore.each do |path|
      system "cp", path, path.gsub(/#{ORIGINAL_EXTENSION}$/, "")
      system "rm", path
    end
  end

  private
    def remember_path_to_restore(path)
      @paths_to_restore ||= []
      @paths_to_restore << path
    end
end
