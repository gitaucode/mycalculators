import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mycalculators.co.ke'
  const lastModified = new Date('2026-05-30T00:00:00+03:00')
  
  // List of all calculator routes
  const calculators = [
    '/bill-splitting',
    '/bmi-calculator',
    '/budget-planner',
    '/calorie-calculator',
    '/car-import-tax',
    '/construction-cost',
    '/cost-of-living',
    '/electricity-calculator',
    '/fuliza-calculator',
    '/heart-rate-zones',
    '/loan-calculator',
    '/mpesa-charges',
    '/net-salary',
    '/ovulation-tracker',
    '/pregnancy-due-date',
    '/roi-estimator',
    '/savings-goal',
    '/school-fee-planner',
    '/vat-calculator',
    '/water-intake'
  ]

  // Standard pages
  const staticPages = [
    '',
    '/calculators',
    '/about',
    '/contact',
    '/rates',
    '/privacy',
    '/terms',
    '/cookies',
    '/disclaimer',
    '/guides'
  ]

  const routes = [...staticPages, ...calculators].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/calculators' || route === '/rates' ? 0.9 : calculators.includes(route) ? 0.8 : 0.6,
  }))

  return routes
}
