module Hotwire::Spark::ActionCable::SolidCableListenerWithSafeReloads
  private
    def broadcast_messages
      Rails.application.executor.wrap  do
        super
      end
    end
end
