module HotwireSpark::ActionCable::SolidCableListenerWithSafeReloads
  private
    def broadcast_messages
      Rails.application.reloader.wrap do
        super
      end
    end
end
