require "pulse_wire/version"
require "pulse_wire/engine"

require "zeitwerk"
loader = Zeitwerk::Loader.for_gem
loader.setup

module PulseWire
  mattr_accessor :importmap, default: Importmap::Map.new

  mattr_accessor :css_paths, default: [ "app/assets/stylesheets" ]
  mattr_accessor :html_paths, default: [ "app/**/*.rb", "app/views/*.erb" ]
  mattr_accessor :javascript_paths, default: [ "app/javascript/**/*.js" ]

  class << self
    def install
      Installer.new.install
    end
  end
end
