require "listen"

class HotwireSpark::FileWatcher
  def initialize
    @blocks_by_path = Hash.new { |hash, key| hash[key] = [] }
  end

  def monitor(paths, &block)
    Array(paths).each do |path|
      @blocks_by_path[expand_path(path)] << block
    end
  end

  def start
    listener = Listen.to(*paths) do |modified, added, removed|
      process_changed_files modified + added + removed
    end

    listener.start
  end

  private
    def expand_path(path)
      Rails.application.root.join(path)
    end

    def paths
      @blocks_by_path.keys
    end

    def process_changed_files(changed_files)
      changed_files.each do |file|
        @blocks_by_path.each do |path, blocks|
          if file.to_s.start_with?(path.to_s)
            blocks.each { |action| action.call(file) }
          end
        end
      end
    end
end
