"use client"

import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">KF</span>
            </div>
            <div>
              <h1 className="font-poppins font-bold text-lg lg:text-xl text-foreground">Kenyan Financial</h1>
              <p className="text-xs text-muted-foreground -mt-1">Toolkit</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#calculators" className="text-foreground hover:text-primary transition-colors font-medium">
              Calculators
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <nav className="py-4 space-y-2">
              <a
                href="#calculators"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculators
              </a>
              <a
                href="#about"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">KF</span>
              </div>
              <h3 className="font-poppins font-bold text-lg">Kenyan Financial Toolkit</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering Kenyan consumers with accurate financial calculators and tools for better money management and
              decision-making.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  Mpesa Charges
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  Loan Calculator
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  Net Salary Calculator
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  Fuliza Calculator
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  Budget Planner
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  Electricity Costs
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  Cost of Living
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  Construction Cost
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  Bill Splitting
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  School Fee Planner
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  ROI Estimator
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  VAT Calculator
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  Savings Goal
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Financial Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Budgeting Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Investment Basics
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">info@kenyanfinancial.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Kenyan Financial Toolkit. All rights reserved. Built for financial empowerment.
          </p>
        </div>
      </div>
    </footer>
  )
}
