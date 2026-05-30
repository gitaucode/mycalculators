# Rates Audit - May 30, 2026

This is the launch-readiness audit for the rate data used by MyCalculators. It is a practical source check, not legal, tax, payroll or financial advice.

## Summary

- M-Pesa send, withdrawal and ATM charge bands match Safaricom's published M-PESA tariff table as reviewed on May 30, 2026.
- PAYE tax bands and personal relief match KRA guidance effective from July 1, 2023.
- SHIF remains modeled as 2.75% of gross salary or declared income, with a KES 300 monthly minimum.
- NSSF is modeled using Year 4 limits for February 2026: LEL KES 9,000, UEL KES 108,000, employee maximum KES 6,480.
- VAT remains modeled at 16%.
- EPRA/Kenya Power electricity tariff values are useful estimates, but token cost can change with monthly pass-through costs.
- CBK CBR is modeled at 8.75%, based on the February 10, 2026 MPC decision.

## Official/Public Sources

| Area | Source | Status |
| --- | --- | --- |
| M-Pesa tariffs | https://www.safaricom.co.ke/personal/m-pesa/getting-started/m-pesa-rates | Checked |
| PAYE and personal relief | https://www.kra.go.ke/individual/filing-paying/types-of-taxes/individual-income-tax | Checked |
| PAYE guidance | https://www.kra.go.ke/individual/filing-paying/types-of-taxes/paye | Checked |
| VAT | https://www.kra.go.ke/individual/calculate-tax/calculating-tax/vat | Checked |
| Vehicle import duty, IDF, RDL | https://www.kra.go.ke/individual/importing/learn-about-importation/importing-motor-vehicles | Checked |
| Central Bank Rate | https://www.centralbank.go.ke | Checked |
| SHIF/SHA contribution | https://sha.go.ke and KRA/eCitizen calculator guidance | Checked |
| NSSF Year 4 payroll limits | https://www.nssf.or.ke and public payroll notices | Checked |
| Electricity tariffs | https://www.epra.go.ke/retail-electricity-tariff-calculator | Checked |

## Launch Notes

- Keep the rates page disclaimer visible: values are estimates for planning only.
- Re-check payroll and money-transfer rates monthly before launch traffic grows.
- For electricity, avoid claiming exact token units because EPRA/Kenya Power pass-through charges can vary month to month.
- For Fuliza, Safaricom references both access and maintenance fees; keep wording conservative and verify before any paid campaign.
