import type { Metadata } from "next";

const SITE_URL = "https://mycalculators.co.ke";
const OG_IMAGE = "/opengraph-image";

export type CalculatorSeo = {
  name: string;
  title: string;
  description: string;
  path: string;
  category: string;
  keywords: readonly string[];
};

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function applicationCategory(category: string) {
  const value = category.toLowerCase();

  if (
    value.includes("health") ||
    value.includes("fitness") ||
    value.includes("pregnancy")
  ) {
    return "HealthApplication";
  }

  if (value.includes("education")) {
    return "EducationalApplication";
  }

  return "FinanceApplication";
}

export function createCalculatorMetadata(seo: CalculatorSeo): Metadata {
  const url = absoluteUrl(seo.path);

  return {
    title: seo.title,
    description: seo.description,
    keywords: [...seo.keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_KE",
      url,
      siteName: "MyCalculators",
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${seo.name} on MyCalculators`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [OG_IMAGE],
    },
  };
}

export function CalculatorStructuredData({ seo }: { seo: CalculatorSeo }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: seo.name,
    url: absoluteUrl(seo.path),
    description: seo.description,
    applicationCategory: applicationCategory(seo.category),
    operatingSystem: "Any",
    isAccessibleForFree: true,
    inLanguage: "en-KE",
    areaServed: {
      "@type": "Country",
      name: "Kenya",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
    },
    publisher: {
      "@type": "Organization",
      name: "MyCalculators",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
