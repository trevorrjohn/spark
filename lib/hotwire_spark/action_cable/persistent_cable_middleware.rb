class HotwireSpark::ActionCable::PersistentCableMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)

    if request.params["hotwire_spark"]
      ActionCable.server.without_restarting { @app.call(env) }
    else
      @app.call(env)
    end
  end
end
