import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, BookOpen, Calculator } from "lucide-react"

import { SiteMobileMenu } from "@/components/site-mobile-menu"
import { SiteToolsMenu } from "@/components/site-tools-menu"
import { Button } from "@/components/ui/button"
import { getSeoGuide, seoGuides } from "@/lib/seo-guides"
import { BrandLogo } from "@/components/brand-logo"

const siteUrl = "https://mycalculators.co.ke"

type GuidePageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return seoGuides.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getSeoGuide(slug)

  if (!guide) {
    return {}
  }

  const url = `${siteUrl}/guides/${guide.slug}`

  return {
    title: `${guide.title} - MyCalculators Kenya`,
    description: guide.description,
    keywords: guide.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "en_KE",
      url,
      siteName: "MyCalculators",
      title: guide.title,
      description: guide.description,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${guide.title} on MyCalculators`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["/opengraph-image.png"],
    },
  }
}

export default async function GuideArticlePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = getSeoGuide(slug)

  if (!guide) {
    notFound()
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        mainEntityOfPage: `${siteUrl}/guides/${guide.slug}`,
        author: {
          "@type": "Organization",
          name: "MyCalculators",
        },
        publisher: {
          "@type": "Organization",
          name: "MyCalculators",
          url: siteUrl,
        },
        inLanguage: "en-KE",
        about: guide.keywords,
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="sticky top-0 z-50 w-full border-b border-[#E4E7EC] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B5A2A] text-white shadow-sm">
              <BrandLogo size={24} />
            </div>
            <div>
              <p className="font-inter text-lg font-extrabold leading-tight text-[#0B1020]">
                MyCalculators
              </p>
              <p className="text-xs font-semibold leading-tight text-[#0B5A2A]">
                Kenya
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-9 text-sm font-bold text-[#0B1020] md:flex">
            <Link href="/calculators" className="transition-colors hover:text-[#0B5A2A]">
              Calculators
            </Link>
            <Link href="/rates" className="transition-colors hover:text-[#0B5A2A]">
              Rates
            </Link>
            <SiteToolsMenu />
            <Link href="/about" className="transition-colors hover:text-[#0B5A2A]">
              About
            </Link>
            <Link href="/contact" className="transition-colors hover:text-[#0B5A2A]">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden h-10 rounded-lg bg-[#0B5A2A] px-5 text-sm font-bold text-white shadow-sm hover:bg-[#063F20] sm:inline-flex"
            >
              <Link href={guide.calculatorHref} className="inline-flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Use Calculator
              </Link>
            </Button>
            <SiteMobileMenu />
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-[#F7FAF8] text-[#0B1020]">
        <article className="mx-auto max-w-[980px] px-4 py-10 sm:px-6">
          <Link
            href="/guides"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#0B5A2A] hover:text-[#063F20]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to guides
          </Link>

          <div className="rounded-[24px] border border-[#E4E7EC] bg-white p-7 shadow-[0_14px_36px_rgba(16,24,40,0.05)] sm:p-9">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF3] text-[#0B5A2A]">
                <BookOpen className="h-6 w-6" />
              </span>
              <span className="rounded-full bg-[#F0FAF4] px-3 py-1 text-xs font-bold text-[#0B5A2A]">
                {guide.category}
              </span>
            </div>

            <h1 className="font-inter text-[34px] font-extrabold leading-tight text-[#0B1020] sm:text-[46px]">
              {guide.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#667085] sm:text-lg">
              {guide.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {guide.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[#CFE9D8] bg-[#F7FAF8] px-3 py-1.5 text-xs font-semibold text-[#0B5A2A]"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <Button
              asChild
              className="mt-8 h-12 rounded-xl bg-[#0B5A2A] px-6 font-extrabold text-white hover:bg-[#063F20]"
            >
              <Link href={guide.calculatorHref}>
                {guide.calculatorLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 space-y-6">
            {guide.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-[20px] border border-[#E4E7EC] bg-white p-7 shadow-[0_10px_30px_rgba(16,24,40,0.04)]"
              >
                <h2 className="font-inter text-2xl font-extrabold text-[#0B1020]">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-[#667085]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-[20px] border border-[#E4E7EC] bg-white p-7 shadow-[0_10px_30px_rgba(16,24,40,0.04)]">
            <h2 className="font-inter text-2xl font-extrabold text-[#0B1020]">
              Common questions
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {guide.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-[#F7FAF8] p-5">
                  <h3 className="font-inter text-base font-extrabold text-[#0B1020]">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#667085]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  )
}
