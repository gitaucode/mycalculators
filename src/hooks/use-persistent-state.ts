"use client"

import { useEffect, useRef, useState } from "react"
import { Capacitor } from "@capacitor/core"
import { Preferences } from "@capacitor/preferences"

async function readValue<T>(key: string): Promise<T | null> {
  try {
    const raw = Capacitor.isNativePlatform()
      ? (await Preferences.get({ key })).value
      : window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

async function writeValue<T>(key: string, value: T) {
  const raw = JSON.stringify(value)
  if (Capacitor.isNativePlatform()) {
    await Preferences.set({ key, value: raw })
  } else {
    window.localStorage.setItem(key, raw)
  }
}

export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(initialValue)
  const hydrated = useRef(false)

  useEffect(() => {
    let active = true
    readValue<T>(key).then((saved) => {
      if (!active) return
      if (saved !== null) setValue(saved)
      hydrated.current = true
    })
    return () => {
      active = false
    }
  }, [key])

  useEffect(() => {
    if (!hydrated.current) return
    const timer = window.setTimeout(() => {
      writeValue(key, value).catch(() => undefined)
    }, 250)
    return () => window.clearTimeout(timer)
  }, [key, value])

  return [value, setValue] as const
}
