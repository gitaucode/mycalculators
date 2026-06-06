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
    '/chama-sacco-calculator',
    '/construction-cost',
    '/cost-of-living',
    '/electricity-calculator',
    '/fuel-cost-calculator',
    '/fuliza-calculator',
    '/heart-rate-zones',
    '/invoice-generator',
    '/loan-calculator',
    '/mkopa-phone-loan',
    '/mortgage-calculator',
    '/mpesa-charges',
    '/net-salary',
    '/ovulation-tracker',
    '/pregnancy-due-date',
    '/receipt-generator',
    '/roi-estimator',
    '/savings-goal',
    '/school-fee-planner',
    '/water-bill-calculator',
    '/withholding-tax-calculator',
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
    '/guides',
    '/guides/net-salary-paye-kenya',
    '/guides/mpesa-charges-kenya',
    '/guides/car-import-duty-kenya',
    '/guides/vat-calculator-kenya',
    '/guides/kplc-token-calculator-kenya'
  ]

  const routes = [...staticPages, ...calculators].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/calculators' || route === '/rates' ? 0.9 : calculators.includes(route) ? 0.8 : 0.6,
  }))

  return routes
}
