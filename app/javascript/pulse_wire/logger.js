import "./stream_actions"
import { PulseWire } from "./index.js"

export function log(...args) {
  if (PulseWire.config.loggingEnabled) {
    console.log(`[pulse_wire]`, ...args)
  }
}

