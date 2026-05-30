"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7FAF8] px-4 py-16 text-center sm:px-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm border border-[#E4E7EC] mb-6">
        <AlertCircle className="h-10 w-10" />
      </div>
      
      <h1 className="mb-3 font-inter text-[32px] font-extrabold text-[#0B1020] sm:text-[40px] leading-tight">
        Something went wrong
      </h1>
      
      <p className="mx-auto mb-10 max-w-[500px] text-base leading-7 text-[#667085]">
        We encountered an unexpected error while trying to process your request. 
        Please try again, or head back to the home page.
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Button 
          onClick={() => reset()}
          className="h-12 w-full rounded-xl bg-[#0B5A2A] px-6 text-sm font-bold text-white hover:bg-[#063F20] sm:w-auto inline-flex items-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
        <Button 
          asChild 
          variant="outline" 
          className="h-12 w-full rounded-xl border-[#E4E7EC] bg-white px-6 text-sm font-bold text-[#0B1020] hover:bg-[#F7FAF8] sm:w-auto inline-flex items-center gap-2"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
