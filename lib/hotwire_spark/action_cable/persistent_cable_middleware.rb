class HotwireSpark::ActionCable::PersistentCableMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)

    if supress_action_cable_restarts?(request)
      respond_suppressing_action_cable_restarts(env)
    else
      @app.call(env)
    end
  end

  private
    COOKIE_NAME = "hotwire_spark_disable_cable_restarts"
    RESTARTS_SUPPRESSED_GRACE_PERIOD = 10.seconds

    def supress_action_cable_restarts?(request)
      request.params["hotwire_spark"] || request.cookies[COOKIE_NAME]
    end

    def respond_suppressing_action_cable_restarts(env)
      status, headers, body = suppressing_action_cable_restarts { @app.call(env) }
      headers["Set-Cookie"] = append_cookie_to_disable_cable_restarts(headers["Set-Cookie"])

      [ status, headers, body ]
    end

    def suppressing_action_cable_restarts(&block)
      ActionCable.server.without_restarting(&block)
    end

    def append_cookie_to_disable_cable_restarts(existing_cookies)
      [ existing_cookies, cookie_to_disable_cable_restarts ].compact
    end

    def cookie_to_disable_cable_restarts
      expiration = RESTARTS_SUPPRESSED_GRACE_PERIOD.from_now.utc
      "#{COOKIE_NAME}=true; Path=/; Expires=#{expiration.httpdate}; HttpOnly"
    end
end
