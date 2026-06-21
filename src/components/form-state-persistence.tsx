"use client"

import { useEffect } from "react"
import { Capacitor } from "@capacitor/core"
import { Preferences } from "@capacitor/preferences"

type SavedFields = Record<string, string | boolean>

const excludedRoutes = new Set(["/", "/contact", "/calculators", "/guides", "/rates"])

function fieldsOnPage() {
  return Array.from(
    document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'main input[id]:not([type="search"]):not([type="file"]), main textarea[id]',
    ),
  )
}

async function readFields(key: string): Promise<SavedFields> {
  try {
    const raw = Capacitor.isNativePlatform()
      ? (await Preferences.get({ key })).value
      : window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as SavedFields) : {}
  } catch {
    return {}
  }
}

async function saveFields(key: string, fields: SavedFields) {
  const raw = JSON.stringify(fields)
  if (Capacitor.isNativePlatform()) await Preferences.set({ key, value: raw })
  else window.localStorage.setItem(key, raw)
}

function restoreField(field: HTMLInputElement | HTMLTextAreaElement, value: string | boolean) {
  if (field instanceof HTMLInputElement && (field.type === "checkbox" || field.type === "radio")) {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "checked")?.set
    setter?.call(field, Boolean(value))
  } else {
    const prototype = field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set
    setter?.call(field, String(value))
  }
  field.dispatchEvent(new Event("input", { bubbles: true }))
  field.dispatchEvent(new Event("change", { bubbles: true }))
}

export function FormStatePersistence() {
  useEffect(() => {
    let pathname = window.location.pathname
    let saveTimer = 0
    let restoreTimer = 0

    const storageKey = () => `calculator-form:${window.location.pathname}`
    const eligible = () => !excludedRoutes.has(window.location.pathname)

    const restore = () => {
      window.clearTimeout(restoreTimer)
      restoreTimer = window.setTimeout(async () => {
        if (!eligible()) return
        const saved = await readFields(storageKey())
        fieldsOnPage().forEach((field) => {
          if (field.id in saved) restoreField(field, saved[field.id])
        })
      }, 350)
    }

    const save = () => {
      if (!eligible()) return
      window.clearTimeout(saveTimer)
      saveTimer = window.setTimeout(() => {
        const values: SavedFields = {}
        fieldsOnPage().forEach((field) => {
          values[field.id] = field instanceof HTMLInputElement && (field.type === "checkbox" || field.type === "radio")
            ? field.checked
            : field.value
        })
        void saveFields(storageKey(), values)
      }, 250)
    }

    const observer = new MutationObserver(() => {
      if (window.location.pathname === pathname) return
      pathname = window.location.pathname
      restore()
    })
    observer.observe(document.body, { childList: true, subtree: true })
    document.addEventListener("input", save)
    document.addEventListener("change", save)
    restore()

    return () => {
      observer.disconnect()
      document.removeEventListener("input", save)
      document.removeEventListener("change", save)
      window.clearTimeout(saveTimer)
      window.clearTimeout(restoreTimer)
    }
  }, [])

  return null
}
