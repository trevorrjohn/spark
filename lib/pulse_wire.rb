require "pulse_wire/version"
require "pulse_wire/engine"

require "zeitwerk"
loader = Zeitwerk::Loader.for_gem
loader.setup

module PulseWire
  mattr_accessor :css_paths, default: %w[ app/assets/stylesheets ]
  mattr_accessor :html_paths, default: %w[ app/controllers app/helpers app/models app/views ]
  mattr_accessor :javascript_paths, default: %w[ app/javascript ]

  class << self
    def install
      Installer.new.install
    end
  end
end
