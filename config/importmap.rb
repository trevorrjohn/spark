pin "application", to: "pulse_wire/application.js", preload: true

pin "idiomorph", to: "pulse_wire/vendor/idiomorph.js", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true

%i[ reload_css reload_html ].each do |action|
  pin "stream_actions/#{action}", to: "pulse_wire/stream_actions/#{action}.js", preload: true
end
