require "action_cable/server/base"

module Hotwire::Spark
  class Engine < ::Rails::Engine
    isolate_namespace Hotwire::Spark

    config.hotwire = ActiveSupport::OrderedOptions.new unless config.respond_to?(:hotwire)
    config.hotwire.spark = ActiveSupport::OrderedOptions.new
    config.hotwire.spark.merge! \
      enabled: Rails.env.development?,
      css_paths: File.directory?("app/assets/builds") ? %w[ app/assets/builds ] : %w[ app/assets/stylesheets ],
      css_extensions: %w[ css ],
      html_paths: %w[ app/controllers app/helpers app/models app/views ],
      html_extensions: %w[ rb erb ],
      stimulus_paths: %w[ app/javascript/controllers ],
      stimulus_extensions: %w[ js ]

    initializer "hotwire_spark.config" do |application|
      config.hotwire.spark.each do |key, value|
        Hotwire::Spark.send("#{key}=", value)
      end
    end

    initializer "hotwire_spark.assets" do |application|
      application.config.assets.precompile << "hotwire_spark.js"
    end

    initializer "hotwire_spark.install" do |application|
      Hotwire::Spark.install_into application if Hotwire::Spark.enabled?
    end
  end
end
