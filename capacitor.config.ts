import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "ke.co.mycalculators.app",
  appName: "My Calculators",
  webDir: "out",
  bundledWebRuntime: false,
  backgroundColor: "#F7FAF8",
  android: {
    allowMixedContent: false,
  },
}

export default config
