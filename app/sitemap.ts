import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mycalculators.co.ke'
  
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
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
