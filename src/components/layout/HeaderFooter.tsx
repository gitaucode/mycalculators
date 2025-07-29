"use client"

import { useState } from "react"
import { Menu, X, Calculator, Github, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-poppins font-bold text-lg text-foreground">Financial Toolkit</h1>
              <p className="text-xs text-muted-foreground -mt-1">Kenya</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <a href="#calculators">Calculators</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#about">About</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="py-4 space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#calculators" onClick={() => setIsMenuOpen(false)}>
                  Calculators
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#about" onClick={() => setIsMenuOpen(false)}>
                  About
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export const Footer = () => {
  const calculatorLinks = [
    { name: "M-Pesa Charges", href: "#calculators" },
    { name: "Loan Calculator", href: "#calculators" },
    { name: "Net Salary", href: "#calculators" },
    { name: "Fuliza Calculator", href: "#calculators" },
    { name: "Car Import Tax", href: "#calculators" },
    { name: "Budget Planner", href: "#calculators" },
  ]

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calculator className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="font-poppins font-bold text-lg">Financial Toolkit</h3>
            </div>
            <p className="text-body text-muted-foreground max-w-sm">
              Essential financial calculators designed for Kenyan consumers. Make informed money decisions with
              accurate, up-to-date calculations.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-4">Popular Calculators</h4>
            <ul className="space-y-2">
              {calculatorLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-body text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-4">Support</h4>
            <div className="space-y-3 text-body">
              <div className="text-muted-foreground">
                <p>Built for Kenyan consumers</p>
                <p>Always free to use</p>
                <p>Regularly updated rates</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:support@kenyanfinancial.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Get Support
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-caption">© 2024 Kenyan Financial Toolkit. Built with❤️ by @ItsMeGitau.  </p>
        </div>
      </div>
    </footer>
  )
}
