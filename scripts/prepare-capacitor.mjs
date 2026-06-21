import { rm } from "node:fs/promises"

// The website offers the APK as a download; never package that APK inside itself.
await rm(new URL("../out/downloads", import.meta.url), { recursive: true, force: true })
