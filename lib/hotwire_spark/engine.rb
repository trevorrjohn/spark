require "turbo-rails"
require "action_cable/server/base"

module HotwireSpark
  class Engine < ::Rails::Engine
    isolate_namespace HotwireSpark

    config.hotwire_spark = ActiveSupport::OrderedOptions.new

    initializer "hotwire_spark.config" do |app|
      config.hotwire_spark.each do |key, value|
        HotwireSpark.send("#{key}=", value)
      end
    end

    initializer "hotwire_spark.install" do |application|
      HotwireSpark.install_into application if Rails.env.development?
    end
  end
end
