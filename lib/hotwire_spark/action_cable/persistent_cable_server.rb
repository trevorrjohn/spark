module HotwireSpark::ActionCable::PersistentCableServer
  def self.prepended(base)
    base.class_eval do
      thread_mattr_accessor :suppress_restarts
    end
  end

  def restart
    return if restarts_suppressed?

    super
  end

  def without_restarting
    old_suppress_restarts, self.suppress_restarts = self.suppress_restarts, true
    yield
  ensure
    self.suppress_restarts = old_suppress_restarts
  end

  private
    def restarts_suppressed?
      suppress_restarts
    end
end
