import "./channels/monitoring_channel.js"
import { getConfigurationProperty } from "./helpers.js";

const HotwireSpark = {
  config: {
    loggingEnabled: false,
    htmlReloadStrategy: "morph"
  }
}

document.addEventListener("DOMContentLoaded", function() {
  HotwireSpark.config.loggingEnabled = getConfigurationProperty("logging");
  HotwireSpark.config.htmlReloadStrategy = getConfigurationProperty("html-reload-strategy");
})

export default HotwireSpark
