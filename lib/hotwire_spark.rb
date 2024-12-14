require "hotwire_spark/version"
require "hotwire_spark/engine"

require "zeitwerk"
loader = Zeitwerk::Loader.for_gem
loader.setup

module HotwireSpark
  mattr_accessor :css_paths, default: %w[ app/assets/stylesheets ]
  mattr_accessor :html_paths, default: %w[ app/controllers app/helpers app/models app/views ]
  mattr_accessor :stimulus_paths, default: %w[ app/javascript/controllers ]

  mattr_accessor :enabled, default: Rails.env.development?

  class << self
    def install_into(application)
      Installer.new(application).install
    end

    def enabled?
      enabled
    end
  end
end
