class HotwireSpark::ActionCable::StreamsChannel < ActionCable::Channel::Base
  # Use a custom streams channel so that potential authorization extensions
  # at +Turbo::StreamsChannel+ don't interfere.
  extend Turbo::Streams::Broadcasts, Turbo::Streams::StreamName
  include Turbo::Streams::StreamName::ClassMethods

  def subscribed
    if stream_name = verified_stream_name_from_params
      stream_from stream_name
    else
      reject
    end
  end
end


