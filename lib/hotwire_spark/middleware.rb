class HotwireSpark::Middleware
  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, response = @app.call(env)

    if html_response?(headers)
      html = html_from(response)
      html = inject_javascript(html)
      headers["Content-Length"] = html.bytesize.to_s if html
      response = [ html ]
    end

    [ status, headers, response ]
  end

  private
    def html_response?(headers)
      headers["Content-Type"]&.include?("text/html")
    end

    def html_from(response)
      response_body = []
      response.each { |part| response_body << part }
      response_body.join
    end

    def inject_javascript(html)
      html.sub("</head>", "#{script_tag}</head>")
    end

    def script_tag
      script_path = ActionController::Base.helpers.asset_path("hotwire_spark.js")
      ActionController::Base.helpers.javascript_include_tag(script_path)
    end
end
