class PulseWire::Middleware
  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, response = @app.call(env)

    if html_response?(headers)
      body = response_body(response)
      body = inject_javascript(body)
      headers["Content-Length"] = body.bytesize.to_s if body
      response = [ body ]
    end

    [ status, headers, response ]
  end

  private
    def html_response?(headers)
      headers["Content-Type"]&.include?("text/html")
    end

    def response_body(response)
      response_body = []
      response.each { |part| response_body << part }
      response_body.join
    end

    def inject_javascript(body)
      script_path = ActionController::Base.helpers.asset_path("pulse_wire.js")
      script_tag = ActionController::Base.helpers.javascript_include_tag(script_path)
      body.sub("</head>", "#{script_tag}</head>")
    end
end
