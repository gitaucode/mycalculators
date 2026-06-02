"use client"

import { useEffect } from "react"

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return
    }

    const canRegister =
      window.location.protocol === "https:" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"

    if (!canRegister) {
      return
    }

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration can fail in older/private browsers; the site still works normally.
      })
    }

    if (document.readyState === "complete") {
      register()
      return
    }

    window.addEventListener("load", register, { once: true })

    return () => window.removeEventListener("load", register)
  }, [])

  return null
}
