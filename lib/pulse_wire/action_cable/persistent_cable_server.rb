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
    Rails.logger.info "BEFORE WITHOUT RESTART"
    self.suppress_restarts = true
    yield.tap do
      Rails.logger.info "AFTER WITHOUT RESTART"
    end
  ensure
    self.suppress_restarts = false
  end
end
