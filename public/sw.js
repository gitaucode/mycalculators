const CACHE_NAME = "mycalculators-pwa-v2-20260604"

const PRECACHE_URLS = [
  "/",
  "/calculators",
  "/mpesa-charges",
  "/mkopa-phone-loan",
  "/net-salary",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-192.png",
  "/icons/maskable-512.png",
  "/opengraph-image.png"
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName === CACHE_NAME) {
              return undefined
            }

            return caches.delete(cacheName)
          })
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event

  if (request.method !== "GET") {
    return
  }

  const url = new URL(request.url)

  if (url.origin !== self.location.origin) {
    return
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(async () => (await caches.match(request)) || caches.match("/"))
    )
    return
  }

  const shouldCache =
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".json") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".webmanifest")

  if (!shouldCache) {
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request).then((response) => {
        const copy = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
        return response
      })
    })
  )
})
