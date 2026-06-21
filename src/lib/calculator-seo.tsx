import type { Metadata } from "next";

const SITE_URL = "https://mycalculators.co.ke";
const OG_IMAGE = new URL("/opengraph-image.png", SITE_URL).toString();

export type CalculatorSeo = {
  name: string;
  title: string;
  description: string;
  path: string;
  category: string;
  keywords: readonly string[];
  faqs?: readonly {
    question: string;
    answer: string;
  }[];
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
      siteName: "My Calculators",
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${seo.name} on My Calculators`,
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
  const webApplication = {
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
      name: "My Calculators",
      url: SITE_URL,
    },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: absoluteUrl("/calculators"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: seo.name,
        item: absoluteUrl(seo.path),
      },
    ],
  };

  const faqPage = seo.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seo.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  const data = faqPage
    ? {
        "@context": "https://schema.org",
        "@graph": [webApplication, breadcrumbList, faqPage],
      }
    : {
        "@context": "https://schema.org",
        "@graph": [webApplication, breadcrumbList],
      };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
