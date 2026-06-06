export type SeoGuide = {
  slug: string
  title: string
  description: string
  category: string
  calculatorHref: string
  calculatorLabel: string
  keywords: string[]
  sections: {
    heading: string
    body: string[]
  }[]
  faqs: {
    question: string
    answer: string
  }[]
}

export const seoGuides: SeoGuide[] = [
  {
    slug: "net-salary-paye-kenya",
    title: "How to Calculate Net Salary in Kenya",
    description:
      "Learn how gross salary becomes take-home pay in Kenya after PAYE, SHIF, NSSF and Affordable Housing Levy deductions.",
    category: "Tax & Salary",
    calculatorHref: "/net-salary",
    calculatorLabel: "Open Net Salary Calculator",
    keywords: [
      "gross salary to net salary Kenya",
      "PAYE calculator Kenya 2026",
      "SHIF deduction calculator Kenya",
      "NSSF contribution calculator Kenya 2026",
      "housing levy calculator Kenya",
    ],
    sections: [
      {
        heading: "What net salary means",
        body: [
          "Net salary is the amount that reaches your account after statutory payroll deductions and reliefs are applied to gross salary.",
          "In Kenya, the main deductions people usually check are PAYE income tax, NSSF, SHIF and the Affordable Housing Levy.",
        ],
      },
      {
        heading: "Gross-to-net salary steps",
        body: [
          "Start with gross monthly pay, account for NSSF and other allowable deductions, calculate PAYE using the current tax bands, apply personal relief where relevant, then subtract SHIF and Housing Levy.",
          "The result is an estimate of take-home pay. Employer benefits, pension choices, insurance, arrears or non-cash benefits can change the final payroll figure.",
        ],
      },
      {
        heading: "When to use a PAYE calculator",
        body: [
          "A PAYE calculator Kenya search is most useful when comparing job offers, checking a payslip, preparing payroll budgets or estimating salary after a raise.",
          "For official filing, payroll teams should still confirm current rules with KRA, NSSF and SHIF guidance.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is PAYE calculated on gross salary in Kenya?",
        answer:
          "PAYE starts from taxable pay after allowable deductions and reliefs, so it is not simply a flat percentage of gross salary.",
      },
      {
        question: "Does SHIF replace NHIF?",
        answer:
          "Yes. Current Kenya payroll estimates should use SHIF terminology instead of NHIF where the new health contribution applies.",
      },
    ],
  },
  {
    slug: "mpesa-charges-kenya",
    title: "Understanding M-Pesa Charges in Kenya",
    description:
      "A practical guide to M-Pesa send money charges, withdrawal fees, Paybill payments, Till charges and Safaricom transaction costs.",
    category: "Money & Banking",
    calculatorHref: "/mpesa-charges",
    calculatorLabel: "Open M-Pesa Charges Calculator",
    keywords: [
      "M-Pesa withdrawal charges calculator",
      "M-Pesa send money charges 2026",
      "M-Pesa Paybill charges calculator",
      "M-Pesa Till number charges",
      "Safaricom M-Pesa charges",
    ],
    sections: [
      {
        heading: "Which M-Pesa charges matter most",
        body: [
          "The common costs to compare are send money fees, agent withdrawal charges, Paybill costs, Till or Buy Goods cases and ATM withdrawal charges.",
          "Some services can be free for customers, while others depend on the transaction amount and the tariff band.",
        ],
      },
      {
        heading: "How to estimate a transaction cost",
        body: [
          "Choose the transaction type, enter the amount and compare the fee against the total amount debited or received.",
          "For larger payments, confirm the result against Safaricom's latest tariff before sending money or advising a customer.",
        ],
      },
      {
        heading: "How to reduce surprises",
        body: [
          "Check whether the cost is paid by the sender, customer or merchant. Also compare sending directly, withdrawing cash, Paybill and Till scenarios before choosing the cheapest practical option.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are M-Pesa deposits free?",
        answer:
          "Deposits are generally free for customers. Charges usually apply to send money, withdrawals and some payment services.",
      },
      {
        question: "Do M-Pesa charges change?",
        answer:
          "Yes. Safaricom can update tariff bands, limits and transaction rules, so high-value or business-critical payments should be checked against official rates.",
      },
    ],
  },
  {
    slug: "car-import-duty-kenya",
    title: "Car Import Duty Calculator Guide for Kenya",
    description:
      "Understand KRA car import duty, CRSP, depreciation, excise duty, VAT, IDF and RDL before importing a vehicle to Kenya.",
    category: "Tax & Transport",
    calculatorHref: "/car-import-tax",
    calculatorLabel: "Open Car Import Tax Calculator",
    keywords: [
      "KRA car import tax calculator",
      "car import duty calculator Kenya",
      "used car import calculator Kenya",
      "IDF RDL calculator Kenya",
      "CRSP calculator Kenya",
    ],
    sections: [
      {
        heading: "What goes into car import duty",
        body: [
          "A Kenya vehicle import estimate usually includes import duty, excise duty, VAT, Import Declaration Fee and Railway Development Levy.",
          "Other costs such as shipping, marine insurance, port charges, inspection and clearing agent fees should be budgeted separately.",
        ],
      },
      {
        heading: "Why CRSP matters",
        body: [
          "CRSP means Current Retail Selling Price. KRA can use CRSP, vehicle age, depreciation and vehicle classification to estimate customs value.",
          "A small difference in CRSP, exchange rate or classification can materially change the final duty assessment.",
        ],
      },
      {
        heading: "How to use the estimate",
        body: [
          "Use the calculator before buying or shipping a car so you understand the likely tax exposure. Then compare the estimate with advice from your clearing agent and official KRA guidance.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does the calculator include clearing fees?",
        answer:
          "No. It focuses on tax components. Clearing, shipping, port and inspection costs should be added separately.",
      },
      {
        question: "Can the KRA final assessment differ?",
        answer:
          "Yes. The final assessment can differ because of exchange rates, vehicle details, CRSP, classification and KRA's review at import time.",
      },
    ],
  },
  {
    slug: "vat-calculator-kenya",
    title: "How to Add or Remove 16% VAT in Kenya",
    description:
      "Use the Kenya VAT formula to calculate VAT-inclusive and VAT-exclusive prices for invoices, receipts and business transactions.",
    category: "Business & Tax",
    calculatorHref: "/vat-calculator",
    calculatorLabel: "Open VAT Calculator",
    keywords: [
      "VAT inclusive calculator Kenya",
      "VAT exclusive calculator Kenya",
      "remove 16% VAT Kenya",
      "KRA VAT calculator",
      "VAT formula Kenya",
    ],
    sections: [
      {
        heading: "Adding VAT to a price",
        body: [
          "To add 16% VAT to a VAT-exclusive price, multiply the base price by 0.16 to get the VAT amount, then add it to the base price.",
          "For example, a VAT-exclusive price of KES 10,000 has VAT of KES 1,600 and a VAT-inclusive total of KES 11,600.",
        ],
      },
      {
        heading: "Removing VAT from an inclusive price",
        body: [
          "To remove 16% VAT from a VAT-inclusive price, divide the inclusive amount by 1.16. The VAT amount is the inclusive price minus the exclusive base.",
          "This is useful when checking supplier invoices, receipts, quotes and eTIMS records.",
        ],
      },
      {
        heading: "When to confirm with KRA",
        body: [
          "Not every supply is standard-rated. Some items may be exempt, zero-rated or subject to special treatment, so filing and compliance decisions should be checked against KRA guidance.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the standard VAT rate in Kenya?",
        answer:
          "The standard VAT rate commonly used for many taxable goods and services in Kenya is 16%. Some supplies can be exempt or zero-rated.",
      },
      {
        question: "What is the shortcut for removing VAT?",
        answer:
          "Divide the VAT-inclusive amount by 1.16 to get the amount before VAT.",
      },
    ],
  },
  {
    slug: "kplc-token-calculator-kenya",
    title: "How KPLC Token Units Are Estimated",
    description:
      "Learn why Kenya Power prepaid electricity units change and how to estimate tokens for budgets like 500, 1000 or 2000 bob.",
    category: "Utilities",
    calculatorHref: "/electricity-calculator",
    calculatorLabel: "Open KPLC Token Calculator",
    keywords: [
      "KPLC token calculator Kenya",
      "how many tokens for 1000 bob",
      "KPLC units calculator",
      "electricity bill calculator Kenya",
      "Kenya Power token units calculator",
    ],
    sections: [
      {
        heading: "Why token units change",
        body: [
          "KPLC prepaid units can vary because the final token purchase includes energy charges, taxes, levies and adjustments that may change over time.",
          "Two purchases for the same shilling amount can produce different units if tariff assumptions, charges or customer category differ.",
        ],
      },
      {
        heading: "Estimating tokens for a budget",
        body: [
          "Enter the amount you plan to spend, such as KES 500, KES 1,000 or KES 2,000, and compare the estimated prepaid units.",
          "This helps households plan electricity budgets and compare usage across weeks or months.",
        ],
      },
      {
        heading: "What to check before relying on an estimate",
        body: [
          "Use the result for planning, then compare it with your actual token receipt. Customer type, meter details and current Kenya Power adjustments can affect the final units.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many KPLC tokens do I get for 1000 bob?",
        answer:
          "The answer depends on current charges and your meter category. Use the calculator with KES 1,000 to estimate the units for your situation.",
      },
      {
        question: "Can I use this for postpaid bills?",
        answer:
          "The guide is focused on prepaid token planning. Postpaid bills may include different billing details.",
      },
    ],
  },
]

export function getSeoGuide(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug)
}
