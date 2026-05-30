import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://mycalculators.co.ke/sitemap.xml',
    host: 'https://mycalculators.co.ke',
  }
}
