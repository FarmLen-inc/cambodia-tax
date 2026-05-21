export const taxes = [
  {
    id: "business_classification",
    calculatorType: "business_classification",
    nameKm: "ចាត់ថ្នាក់អាជីវកម្ម",
    nameEn: "Business Classification",
    category: "National Tax",
    summary: "Classify your business by annual income into small, medium, or large enterprise categories.",
    whoPays: "All Business Entities",
    taxBase: "Annual Turnover/Income",
    formula: "Classification based on: < 250M KHR (Small), < 700M KHR (Medium), ≥ 700M KHR (Large)",
    example: "Annual income 500M KHR → Medium Enterprise",
    notes: "Used to determine tax obligations and reporting requirements."
  },
  {
    id: "salary_tax",
    calculatorType: "salary_tax",
    nameKm: "ពន្ធប្រាក់បៀវត្ស",
    nameEn: "Salary Tax",
    category: "National Tax",
    summary: "Calculate personal income tax on salaries using progressive tax brackets.",
    whoPays: "Employees",
    taxBase: "Gross Monthly Salary",
    formula: "Tax = Salary × Rate − Constant (varies by bracket)",
    example: "Salary 3,000,000 KHR → Tax = 3M × 10% − 175K = 125,000 KHR",
    notes: "Tax-free threshold: 1,500,000 KHR/month. Progressive rates from 0% to 20%.",
    brackets: [
      { range: "0 - 1,500,000", rate: 0, constant: 0 },
      { range: "1,500,001 - 2,000,000", rate: 5, constant: 75000 },
      { range: "2,000,001 - 8,500,000", rate: 10, constant: 175000 },
      { range: "8,500,001 - 12,500,000", rate: 15, constant: 600000 },
      { range: "> 12,500,000", rate: 20, constant: 1225000 }
    ]
  },
  {
    id: "vat",
    calculatorType: "vat",
    nameKm: "ពន្ធលើតម្លៃបន្ថែម",
    nameEn: "Value Added Tax (VAT)",
    category: "National Tax",
    summary: "Calculate VAT at 10% on goods and services. Works with both inclusive and exclusive prices.",
    whoPays: "Business Entities",
    taxBase: "Price (including or excluding VAT)",
    formula: "Inclusive: VAT = Price × 10/110 | Exclusive: VAT = Price × 10%",
    example: "Price 1,100,000 (inclusive) → VAT = 100,000 KHR",
    notes: "VAT rate is fixed at 10%. Can calculate from inclusive or exclusive prices.",
    ratePercent: 10
  },
  {
    id: "excise_tax",
    calculatorType: "excise_tax",
    nameKm: "អាករពិសេស",
    nameEn: "Excise Tax",
    category: "National Tax",
    summary: "Calculate excise tax on special goods (alcohol, tobacco) and services. Rate varies by product.",
    whoPays: "Manufacturers/Importers",
    taxBase: "90% of retail price",
    formula: "Tax Base = 90% × Selling Price ÷ [(1 + VAT) × (1 + Special Rate)] | Excise = Tax Base × Rate",
    example: "Beer (30%) selling price 1,300,000 → Tax Base ≈ 818,182 → Excise ≈ 245,455",
    notes: "Alcohol (35%), Beer (30%), Cigarettes (20%), VAT (10%) applied to tax base.",
    items: [
      { name: "Spirits (Alcohol)", rate: 35 },
      { name: "Beer", rate: 30 },
      { name: "Cigarettes", rate: 20 },
      { name: "Cigars", rate: 25 },
      { name: "Soft Drinks", rate: 10 },
      { name: "Cement", rate: 5 }
    ]
  },
  {
    id: "withholding_tax",
    calculatorType: "withholding_tax",
    nameKm: "ពន្ធកាត់ទុក",
    nameEn: "Withholding Tax (WHT)",
    category: "National Tax",
    summary: "Calculate withholding tax on payments before transfer. Rates vary by income type and residency.",
    whoPays: "Payers (Companies)",
    taxBase: "Payment Amount",
    formula: "WHT = Payment Amount × Rate (Service: 15% resident/14% non-resident, Rent: 10% resident/14% non-resident, etc.)",
    example: "Service payment 5,000,000 to resident → WHT = 750,000 (15%)",
    notes: "Declared monthly to GDT. Due by 20th of following month. Some exemptions apply.",
    rates: {
      service: { resident: 15, nonResident: 14 },
      rent: { resident: 10, nonResident: 14 },
      interest: { resident: 15, nonResident: 14 },
      royalty: { resident: 15, nonResident: 14 }
    }
  },
  {
    id: "minimum_tax",
    calculatorType: "minimum_tax",
    nameKm: "ពន្ធអប្បបរមា",
    nameEn: "Minimum Tax",
    category: "National Tax",
    summary: "Calculate minimum annual tax based on turnover. Companies pay whichever is higher: Minimum Tax or TOI.",
    whoPays: "Business Entities",
    taxBase: "Annual Turnover",
    formula: "Minimum Tax = Annual Turnover × 1% | Tax Payable = max(TOI, Minimum Tax)",
    example: "Turnover 500,000,000 → Minimum Tax = 5,000,000 (paid if TOI < 5M)",
    notes: "Ensures all businesses contribute minimum tax even with losses. Prevents false loss reporting."
  },
  {
    id: "house_land_rent",
    calculatorType: "house_land_rent",
    nameKm: "ពន្ធលើឈ្នួលផ្ទះនិងដី",
    nameEn: "Tax on House and Land Rent",
    category: "Sub-National Tax",
    summary: "A tax imposed on the rental of houses and land.",
    whoPays: "Property Owner or Landlord",
    taxBase: "Gross monthly rental income",
    formula: "Tax = Monthly Rent × Number of Months × Tax Rate",
    example: "If rent is 1000/month for 12 months with 10% rate: Tax = 1000 × 12 × 0.10 = 1200",
    notes: "Rate varies based on property type or location. (To verify from class material)",
    ratePercent: 10
  },
  {
    id: "unused_land",
    calculatorType: "unused_land",
    nameKm: "ពន្ធលើដីធ្លីមិនប្រើប្រាស់",
    nameEn: "Tax on Unused Land",
    category: "Sub-National Tax",
    summary: "A tax on vacant land to encourage usage or development.",
    whoPays: "Land Owner",
    taxBase: "Value of land minus exempted area",
    formula: "Tax = (Land Area - Exempted Area) × Value per m² × Tax Rate",
    example: "Land area 2000sqm, exempt 1200sqm, value 1000/sqm, rate 2%: Tax = (2000 - 1200) × 1000 × 0.02",
    notes: "Rate is generally 2% of the tax base. (To verify from class material)",
    ratePercent: 2,
    defaultExemptedArea: 1200
  },
  {
    id: "immovable_property",
    calculatorType: "immovable_property",
    nameKm: "ពន្ធលើអចលនទ្រព្យ",
    nameEn: "Tax on Immovable Property",
    category: "Sub-National Tax",
    summary: "Annual recurring tax on properties like land, houses, and buildings.",
    whoPays: "Property Owner",
    taxBase: "Assessed value of property minus exemption amount",
    formula: "Tax = (Property Value - Exemption Amount) × Tax Rate",
    example: "Property value 1000000, Exemption 250000, Rate 0.1%: Tax = (1000000 - 250000) × 0.001",
    notes: "Typical rate is 0.1%. Typical exemption is 100,000,000 KHR. (To verify from class material)",
    ratePercent: 0.1,
    defaultExemptionAmount: 100000000
  }
];

export const getTaxById = (id) => taxes.find((t) => t.id === id);
