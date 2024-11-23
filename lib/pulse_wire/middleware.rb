# lib/pulse_wire/middleware/inject_importmap.rb
class PulseWire::Middleware
  JS_FILES = %w[ index ].freeze

  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, response = @app.call(env)

    if headers["Content-Type"]&.include?("text/html")
      body = response.respond_to?(:body) ? response.body : response.join
      body = inject_importmap(body)
      headers["Content-Length"] = body.bytesize.to_s if headers["Content-Length"]
      response = [ body ]
    end

    [ status, headers, response ]
  end

  private
    def inject_importmap(body)
      body.sub("</head>", "#{preload_links}</head>")
    end

    def preload_links
      JS_FILES.map do |mod|
        %(<link rel="modulepreload" href="/pulse_wire/app/javascripts/#{mod}.js" />)
      end.join("\n")
    end
end
