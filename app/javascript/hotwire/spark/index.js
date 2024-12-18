import "./channels/monitoring_channel.js"
import { getConfigurationProperty } from "./helpers.js";

const HotwireSpark = {
  config: {
    loggingEnabled: false 
  }
}

document.addEventListener("DOMContentLoaded", function() {
  HotwireSpark.config.loggingEnabled = getConfigurationProperty("logging");
})

export default HotwireSpark
