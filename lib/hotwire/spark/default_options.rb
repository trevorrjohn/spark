class Hotwire::Spark::DefaultOptions
  def initialize
    @config = {}

    build
  end

  def to_h
    @config
  end

  private
    def build
      @config.merge! base_options
    end

    def base_options
      {
        enabled: Rails.env.development?,
        css_paths: File.directory?("app/assets/builds") ? %w[ app/assets/builds ] : %w[ app/assets/stylesheets ],
        css_extensions: %w[ css ],
        html_paths: %w[ app/controllers app/helpers app/models app/views ],
        html_extensions: %w[ rb erb ],
        stimulus_paths: %w[ app/javascript/controllers ],
        stimulus_extensions: %w[ js ]
      }
    end
end
