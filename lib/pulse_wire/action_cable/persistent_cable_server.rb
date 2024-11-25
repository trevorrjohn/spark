module PulseWire::ActionCable::PersistentCableServer
  def self.prepended(base)
    base.class_eval do
      thread_mattr_accessor :suppress_restarts
    end
  end

  def restart
    return if suppress_restarts

    super
  end

  def without_restarting
    self.suppress_restarts = true
    yield
  ensure
    self.suppress_restarts = false
  end
end
