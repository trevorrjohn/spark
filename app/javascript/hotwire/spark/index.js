import "./channels/monitoring_channel.js"
import { getConfigurationProperty } from "./helpers.js";

const HotwireSpark = {
  config: {
    loggingEnabled: false,
    htmlReloadMethod: "morph"
  }
}

const configProperties = {
  loggingEnabled: "logging",
  htmlReloadMethod: "html-reload-method",
}

document.addEventListener("DOMContentLoaded", function() {
  Object.entries(configProperties).forEach(([key, property]) => {
    HotwireSpark.config[key] = getConfigurationProperty(property)
  })
})

export default HotwireSpark
