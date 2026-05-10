export const taxes = [
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
    ratePercent: 10 // Example default, can be overridden
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
    defaultExemptedArea: 1200 // sq meters
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
    defaultExemptionAmount: 100000000 // In KHR usually, but generic here
  }
];

export const getTaxById = (id) => taxes.find((t) => t.id === id);
