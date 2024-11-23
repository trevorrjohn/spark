require "pulse_wire/version"
require "pulse_wire/engine"

require "zeitwerk"
loader = Zeitwerk::Loader.for_gem
loader.setup

module PulseWire
  mattr_accessor :importmap, default: Importmap::Map.new
end
