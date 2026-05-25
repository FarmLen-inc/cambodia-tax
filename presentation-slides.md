---
marp: true
theme: default
paginate: true
---

# 🇰🇭 Cambodia Tax Calculator
**Simplifying Cambodian Tax Calculations for Everyone**
*Date: May 2026*
*Presenter: [Your Name]*

---

## 🛑 Problem Statement

- **Complexity in Tax Law**: Cambodian tax regulations (e.g., Prakas No. 578 / 573) can be difficult to interpret for an average citizen or small business owner.
- **Manual Calculation Errors**: Accurately calculating percentages across different tax bases (rent, unused land, etc.) is prone to human error.
- **Lack of Accessible Tools**: There are limited localized, user-friendly digital tools available that provide both Khmer and English support side-by-side.

---

## 🎯 Our Solution

**Khmer Tax Calculator** is a modern web application designed to instantly and accurately compute various Cambodian taxes based on the latest regulations.

- **Dual-Language**: Full support for Khmer and English.
- **Instant Feedback**: Real-time calculations with detailed breakdowns.
- **Educational**: Educates citizens by displaying the exact formulas and rules used.

---

## ✨ Key Features & Scope

Current supported tax calculators include:

1. **Tax on House and Land Rent (ពន្ធលើឈ្នួលផ្ទះនិងដី)**
   - Computes based on an exact 10% rate for Cambodian residents.
2. **Tax on Unused Land (ពន្ធលើដីធ្លីមិនប្រើប្រាស់)**
   - Computes an annual 2% tax on the market value of unused land.
*(Add more taxes supported here)*

---

## 💻 Tech Stack

Our application leverages modern web technologies for performance and maintainability:

- **Frontend Framework**: React & Next.js (App Router)
- **Styling**: Tailwind CSS for responsive and elegant UI
- **Language**: TypeScript/JavaScript (ES6+)
- **Deployment**: Vercel (Fast, Global CDN)

---

## 🔍 System Architecture & Design

- **Component-Based**: Reusable UI blocks (`CalculatorForm`, `ResultBox`).
- **Data Driven**: Tax rules and rates are decoupled into a dedicated configuration file (`data/taxes.js`).
- **Dynamic Routing**: Next.js dynamic routes (`app/taxes/[id]`) automatically handle different tax calculators efficiently.

---

## 🚀 Live Demonstration

*Let's jump into the application to see how it works!*

**Demo Flow:**
1. Navigate to the main dashboard.
2. Select "Tax on House and Land Rent".
3. Input a monthly rent of 1,000,000 KR / $1,000.
4. Review the generated real-time tax breakdown.

---

## 🔮 Future Work & Roadmap

- **Integration of More Tax Types**: Salary Tax (Progressive tiers), VAT, Profit Tax, etc.
- **Export Functionality**: Allow users to download their calculation summaries as PDFs for tax filing.
- **Mobile Application**: Porting the Next.js PWA into a native mobile app for easier accessibility in rural areas.

---

## 💬 Q&A

**Thank you!**
*Any questions?*

- **GitHub:** [Link to your repo]
- **Live Demo:** [Link to your Vercel deployment]