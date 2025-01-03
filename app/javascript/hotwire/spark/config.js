import { getConfigurationProperty } from "./helpers.js";

export default {
  loggingEnabled: getConfigurationProperty("logging") ?? false,
  htmlReloadMethod: getConfigurationProperty("html-reload-method"),
  cableServerPath: getConfigurationProperty("cable-server-path"),
}
