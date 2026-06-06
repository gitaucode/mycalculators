import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronRight,
  Clock,
} from "lucide-react"

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

function estimateReadingTime(sections: { body: string[] }[]): number {
  const totalWords = sections
    .flatMap((s) => s.body)
    .join(" ")
    .split(/\s+/).length
  return Math.max(1, Math.ceil(totalWords / 200))
}

export default async function GuideArticlePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = getSeoGuide(slug)

  if (!guide) {
    notFound()
  }

  const readingTime = estimateReadingTime(guide.sections)

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

      {/* ── Navigation ── */}
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
            <Link href="/guides" className="text-[#0B5A2A]">
              Guides
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

      <div className="min-h-screen bg-[#F7FAF8]">

        {/* ── Article Hero ── */}
        <div className="border-b border-[#E4E7EC] bg-white">
          <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:py-14">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-[#667085]">
              <Link href="/" className="hover:text-[#0B5A2A] transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5 text-[#D0D5DD]" />
              <Link href="/guides" className="hover:text-[#0B5A2A] transition-colors">Guides</Link>
              <ChevronRight className="h-3.5 w-3.5 text-[#D0D5DD]" />
              <span className="text-[#0B1020] font-medium truncate max-w-[180px] sm:max-w-none">{guide.title}</span>
            </nav>

            {/* Category + meta */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-bold text-[#0B5A2A]">
                <BookOpen className="h-3.5 w-3.5" />
                {guide.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#98A2B3]">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="font-inter text-[28px] font-extrabold leading-tight text-[#0B1020] sm:text-[38px] lg:text-[46px]">
              {guide.title}
            </h1>

            {/* Description / lead */}
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#475467] sm:text-lg sm:leading-8">
              {guide.description}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {guide.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[#CFE9D8] bg-[#F0FAF4] px-3 py-1 text-xs font-semibold text-[#0B5A2A]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Article Body + Sidebar ── */}
        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:py-14">
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-14">

            {/* ── Main article content ── */}
            <main>

              {/* Inline CTA */}
              <div className="mb-10 flex items-center justify-between rounded-2xl border border-[#CFE9D8] bg-white px-5 py-4 shadow-sm">
                <div>
                  <p className="text-sm font-bold text-[#0B1020]">Ready to calculate?</p>
                  <p className="text-xs text-[#667085] mt-0.5">Use our free tool for instant results</p>
                </div>
                <Button
                  asChild
                  className="h-10 shrink-0 rounded-xl bg-[#0B5A2A] px-5 text-sm font-bold text-white hover:bg-[#063F20]"
                >
                  <Link href={guide.calculatorHref} className="inline-flex items-center gap-2">
                    {guide.calculatorLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Article prose */}
              <article className="prose-article">
                {guide.sections.map((section, idx) => (
                  <section
                    key={section.heading}
                    id={`section-${idx}`}
                    className="mb-10 scroll-mt-24"
                  >
                    <h2 className="mb-4 font-inter text-xl font-extrabold text-[#0B1020] sm:text-2xl">
                      {section.heading}
                    </h2>
                    <div className="space-y-4">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-base leading-8 text-[#475467]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {idx < guide.sections.length - 1 && (
                      <div className="mt-10 h-px bg-[#E4E7EC]" />
                    )}
                  </section>
                ))}
              </article>

              {/* ── FAQ section ── */}
              <div className="mt-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#E4E7EC]" />
                  <h2 className="font-inter text-xl font-extrabold text-[#0B1020] sm:text-2xl whitespace-nowrap">
                    Common questions
                  </h2>
                  <div className="h-px flex-1 bg-[#E4E7EC]" />
                </div>

                <div className="space-y-4">
                  {guide.faqs.map((faq, idx) => (
                    <div
                      key={faq.question}
                      className="rounded-2xl border border-[#E4E7EC] bg-white px-6 py-5"
                    >
                      <div className="flex gap-4">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ECFDF3] text-xs font-extrabold text-[#0B5A2A]">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="font-inter text-[15px] font-extrabold text-[#0B1020]">
                            {faq.question}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[#475467]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Bottom CTA ── */}
              <div className="mt-12 overflow-hidden rounded-2xl bg-[#0B5A2A]">
                <div className="px-7 py-8 sm:px-9">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6EE7A4]">
                    Free tool
                  </p>
                  <h3 className="mt-2 font-inter text-2xl font-extrabold text-white sm:text-3xl">
                    {guide.calculatorLabel}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#A7F3C4]">
                    Get an instant, accurate estimate in seconds — no sign-up required.
                  </p>
                  <Button
                    asChild
                    className="mt-6 h-12 rounded-xl bg-white px-6 text-sm font-extrabold text-[#0B5A2A] hover:bg-[#ECFDF3]"
                  >
                    <Link href={guide.calculatorHref} className="inline-flex items-center gap-2">
                      Open Calculator
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* ── Back link ── */}
              <div className="mt-10 pt-6 border-t border-[#E4E7EC]">
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0B5A2A] hover:text-[#063F20]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all guides
                </Link>
              </div>
            </main>

            {/* ── Sidebar ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">

                {/* Table of contents */}
                <div className="rounded-2xl border border-[#E4E7EC] bg-white px-5 py-5">
                  <p className="mb-4 text-[11px] font-extrabold uppercase tracking-widest text-[#98A2B3]">
                    On this page
                  </p>
                  <nav className="space-y-1">
                    {guide.sections.map((section, idx) => (
                      <a
                        key={section.heading}
                        href={`#section-${idx}`}
                        className="group flex items-start gap-2.5 rounded-lg px-2 py-2 text-sm text-[#475467] transition-colors hover:bg-[#F7FAF8] hover:text-[#0B5A2A]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CFE9D8] group-hover:bg-[#0B5A2A] transition-colors" />
                        {section.heading}
                      </a>
                    ))}
                    <a
                      href="#faqs"
                      className="group flex items-start gap-2.5 rounded-lg px-2 py-2 text-sm text-[#475467] transition-colors hover:bg-[#F7FAF8] hover:text-[#0B5A2A]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CFE9D8] group-hover:bg-[#0B5A2A] transition-colors" />
                      Common questions
                    </a>
                  </nav>
                </div>

                {/* Sidebar CTA */}
                <div className="rounded-2xl border border-[#CFE9D8] bg-[#F0FAF4] px-5 py-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B5A2A] text-white shadow-sm">
                    <Calculator className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-inter text-base font-extrabold text-[#0B1020]">
                    {guide.calculatorLabel}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-[#667085]">
                    Free, instant and accurate. No account needed.
                  </p>
                  <Button
                    asChild
                    className="mt-4 h-10 w-full rounded-xl bg-[#0B5A2A] text-sm font-bold text-white hover:bg-[#063F20]"
                  >
                    <Link href={guide.calculatorHref} className="inline-flex items-center justify-center gap-2">
                      Open Tool
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>

                {/* Keywords cloud */}
                <div className="rounded-2xl border border-[#E4E7EC] bg-white px-5 py-5">
                  <p className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-[#98A2B3]">
                    Related topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {guide.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full border border-[#CFE9D8] px-2.5 py-1 text-[11px] font-semibold text-[#0B5A2A]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
