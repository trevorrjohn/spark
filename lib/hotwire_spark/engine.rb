require "action_cable/server/base"

module HotwireSpark
  class Engine < ::Rails::Engine
    isolate_namespace HotwireSpark

    config.hotwire_spark = ActiveSupport::OrderedOptions.new
    config.hotwire_spark.merge! \
      enabled: Rails.env.development?,
      css_paths: %w[ app/assets/stylesheets ],
      html_paths: %w[ app/controllers app/helpers app/models app/views ],
      stimulus_paths: %w[ app/javascript/controllers ]

    initializer "hotwire_spark.config" do |app|
      config.hotwire_spark.each do |key, value|
        HotwireSpark.send("#{key}=", value)
      end
    end

    initializer "hotwire_spark.install" do |application|
      HotwireSpark.install_into application if HotwireSpark.enabled?
    end
  end
end
