module HotwireSpark::ActionCable::SolidCableWithSafeReloads
  private
    def broadcast_messages
      Rails.application.reloader.wrap do
        super
      end
    end
end
