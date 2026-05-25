"use client";

import { useState } from "react";

const VEHICLE_OPTIONS = [
  { value: "moto_under_125", label: "ម៉ូតូ ≤ 125cc — ១០,០០០ រៀល/ឆ្នាំ" },
  { value: "moto_over_125",  label: "ម៉ូតូ > 125cc — ១៥,០០០ រៀល/ឆ្នាំ" },
  { value: "car_under_1500", label: "រថយន្ត ≤ 1500cc — ១៥០,០០០ រៀល/ឆ្នាំ" },
  { value: "car_1501_2500",  label: "រថយន្ត 1501–2500cc — ២៥០,០០០ រៀល/ឆ្នាំ" },
  { value: "car_over_2500",  label: "រថយន្ត > 2500cc — ៤០០,០០០ រៀល/ឆ្នាំ" },
  { value: "light_truck",    label: "រថយន្តធុនស្រាល — ៣០០,០០០ រៀល/ឆ្នាំ" },
  { value: "heavy_truck",    label: "រថយន្តធុនធ្ងន់ — ៦០០,០០០ រៀល/ឆ្នាំ" },
  { value: "bus",            label: "រថយន្តក្រុង — ៥០០,០០០ រៀល/ឆ្នាំ" },
  { value: "boat_under_10t", label: "នាវា < 10 តោន — ២០០,០០០ រៀល/ឆ្នាំ" },
  { value: "boat_over_10t",  label: "នាវា ≥ 10 តោន — ៥០០,០០០ រៀល/ឆ្នាំ" },
];

const VEHICLE_OPTIONS_MAP = VEHICLE_OPTIONS; // already defined above

const FIELDS = {
  house_land_rent: [
    { name: "monthlyRent",    label: "ប្រាក់ជួលប្រចាំខែ", unit: "រៀល", icon: "payments",       type: "number" },
    { name: "months",         label: "ចំនួនខែ",           unit: "ខែ",  icon: "calendar_month", type: "number", step: "1" },
  ],
  unused_land: [
    { name: "landMarketValue", label: "តម្លៃទីផ្សារដីសរុប", unit: "រៀល", icon: "landscape", type: "number" },
  ],
  immovable_property: [
    { name: "propertyValue", label: "តម្លៃអចលនទ្រព្យ", unit: "រៀល", icon: "domain", type: "number" },
  ],
  public_lighting_tax: [
    { name: "invoiceValue", label: "តម្លៃវិក្កបត្រ (មិនរួម VAT និង PLT)", unit: "រៀល", icon: "receipt_long", type: "number" },
  ],
  accommodation_tax: [
    { name: "accommodationFee", label: "ថ្លៃស្នាក់នៅ (រួម ពន្ធ លើកលែង AT & VAT)", unit: "រៀល", icon: "hotel", type: "number" },
  ],
  transportation_tax: [
    { name: "vehicleType", label: "ប្រភេទយានយន្ត", icon: "directions_car", type: "select", options: VEHICLE_OPTIONS_MAP },
  ],
  registration_tax: [
    { name: "transferType", label: "ប្រភេទការផ្ទេរ", icon: "swap_horiz", type: "select", options: [
      { value: "real_estate", label: "អចលនទ្រព្យ (ដី/ផ្ទះ) — ៤%" },
      { value: "vehicle",     label: "យានយន្ត / មធ្យោបាយ — ៤%" },
      { value: "shares",      label: "ភាគហ៊ុន (Corporate Shares) — ០.១%" },
      { value: "contract",    label: "កិច្ចសន្យារដ្ឋ/សាធារណៈ — ០.១%" },
    ]},
    { name: "contractValue", label: "តម្លៃកិច្ចសន្យា / តម្លៃទីផ្សារ", unit: "រៀល", icon: "sell", type: "number" },
    { name: "gdtValue", label: "តម្លៃ GDT (អចលនទ្រព្យប៉ុណ្ណោះ)", unit: "រៀល", icon: "account_balance", type: "number" },
  ],
  fiscal_stamp_duty: [
    { name: "signType", label: "ប្រភេទផ្ទាំងប័ណ្ណ", icon: "signpost", type: "select", options: [
      { value: "unlit",     label: "ផ្ទាំងគ្មានពន្លឺ — ២០,០០០ រៀល/m²/ឆ្នាំ" },
      { value: "lit",       label: "ផ្ទាំងមានពន្លឺ — ៤០,០០០ រៀល/m²/ឆ្នាំ" },
      { value: "billboard", label: "ផ្ទាំងធំ/ផ្លូវ — ៨០,០០០ រៀល/m²/ឆ្នាំ" },
    ]},
    { name: "languagePosition", label: "ទីតាំងភាសា", icon: "translate", type: "select", options: [
      { value: "khmer_top",   label: "ភាសាខ្មែរខ្ពស់ជាង (ត្រឹមត្រូវ) — ×១.០" },
      { value: "foreign_top", label: "ភាសាបរទេសខ្ពស់ជាង (ពិន័យ) — ×២.០" },
    ]},
    { name: "signWidth",  label: "ទទឹងផ្ទាំង", unit: "ម៉ែត្រ", icon: "width",  type: "number" },
    { name: "signHeight", label: "កម្ពស់ផ្ទាំង", unit: "ម៉ែត្រ", icon: "height", type: "number" },
  ],
  tax_on_income: [
    { name: "entityType", label: "ប្រភេទនៃអ្នកបង់ពន្ធ", icon: "business", type: "select", options: [
      { value: "corporate",    label: "នីតិបុគ្គលទូទៅ (Corporate) — ២០%" },
      { value: "insurance",    label: "ក្រុមហ៊ុនធានារ៉ាប់រង (Insurance) — ៥%" },
      { value: "individual",   label: "បុគ្គល/ម្ចាស់អាជីវកម្ម (Individual) — ០–២០%" },
    ]},
    { name: "taxableProfit", label: "ប្រាក់ចំណេញសុទ្ធប្រចាំឆ្នាំ", unit: "រៀល", icon: "trending_up", type: "number" },
  ],
  tax_on_salary: [
    { name: "grossSalary",      label: "ប្រាក់ខែសរុប",                      unit: "រៀល", icon: "payments",      type: "number" },
    { name: "nssfContribution", label: "ការចូលរួម NSSF (ផ្នែកបុគ្គលិក)",  unit: "រៀល", icon: "health_and_safety", type: "number" },
    { name: "hasSpouse", label: "មានសហព័ទ្ធជាអ្នកនៅក្នុងបន្ទុក?", icon: "family_restroom", type: "select", options: [
      { value: "no",  label: "អត់ (No)" },
      { value: "yes", label: "មាន (Yes) — ១៥០,០០០ រៀល/ខែ" }
    ]},
    { name: "numChildren", label: "ចំនួនកូននៅក្នុងបន្ទុក", unit: "នាក់", icon: "child_care", type: "number" },
  ],
  vat: [
    { name: "supplyValue", label: "តម្លៃផ្គត់ផ្គង់ (មិនរួម VAT)", unit: "រៀល", icon: "receipt", type: "number" },
    { name: "inputVat",    label: "Input VAT (ការទិញ)", unit: "រៀល", icon: "shopping_cart", type: "number" },
  ],
  specific_tax: [
    { name: "supplyType", label: "ប្រភេទការផ្គត់ផ្គង់", icon: "category", type: "select", options: [
      { value: "local",  label: "ផលិតក្នុងស្រុក (Local Production) — Base × 90%" },
      { value: "import", label: "នាំចូល (Import) — CIF + ពន្ធគយ" },
    ]},
    { name: "productType", label: "ប្រភេទទំនិញ/សេវា", icon: "inventory_2", type: "select", options: [
      { value: "cigarettes",         label: "បារី / ស៊ីហ្គារ — ២០%" },
      { value: "beer",               label: "ស្រាបៀរ — ៣០%" },
      { value: "soft_drinks",        label: "ភេសជ្ជៈ (មិនមែនស្រា) — ១០%" },
      { value: "air_tickets",        label: "សំបុត្រយន្តហោះ — ១០%" },
      { value: "entertainment",      label: "សេវាកម្មកំសាន្ត (Karaoke) — ១០%" },
      { value: "vehicle_under_2000", label: "យានយន្ត < 2000cc — ១០%" },
      { value: "vehicle_2000_3000",  label: "យានយន្ត 2000–3000cc — ៣០%" },
      { value: "vehicle_over_3000",  label: "យានយន្ត > 3000cc — ៤៥%" },
    ]},
    { name: "grossValue", label: "តម្លៃ (pre-VAT / CIF+ពន្ធគយ)", unit: "រៀល", icon: "price_check", type: "number" },
  ],
  minimum_tax: [
    { name: "annualTurnover",   label: "ចំណូលសរុបប្រចាំឆ្នាំ (excl. VAT)", unit: "រៀល", icon: "store",       type: "number" },
    { name: "annualNetProfit",  label: "ប្រាក់ចំណេញសុទ្ធប្រចាំឆ្នាំ",       unit: "រៀល", icon: "trending_up", type: "number" },
  ],
  withholding_tax: [
    { name: "paymentType", label: "ប្រភេទការទូទាត់", icon: "swap_horiz", type: "select", options: [
      { value: "services_resident",      label: "សេវាកម្ម/ប្រឹក្សា (និវាសនជន) — ១៥%" },
      { value: "royalties_resident",     label: "រូបិយប័ណ្ណ Royalties (និវាសនជន) — ១៥%" },
      { value: "interest_nonbank",       label: "ការប្រាក់ (មិនមែនធនាគារ) — ១៥%" },
      { value: "rental_resident",        label: "ការជួល Property (និវាសនជន) — ១០%" },
      { value: "interest_fixed_deposit", label: "ការប្រាក់ Fixed Deposit — ៦%" },
      { value: "interest_savings",       label: "ការប្រាក់ Savings Account — ៤%" },
      { value: "nonresident_all",        label: "ប្រភេទទាំងអស់ (អនិវាសនជន) — ១៤%" },
    ]},
    { name: "grossAmount", label: "ទំហំការទូទាត់សរុប", unit: "រៀល", icon: "payments", type: "number" },
  ],
  patent_tax: [
    { name: "taxpayerSize", label: "ប្រភេទពន្ធ", icon: "corporate_fare", type: "select", options: [
      { value: "small",       label: "តូច (Small) — ៤០០,០០០ រៀល/ឆ្នាំ" },
      { value: "medium",      label: "មធ្យម (Medium) — ១,២០០,០០០ រៀល/ឆ្នាំ" },
      { value: "large_under", label: "ធំ — ≤ ១០,០០០ Million KHR — ៣,០០០,០០០ រៀល/ឆ្នាំ" },
      { value: "large_over",  label: "ធំ — > ១០,០០០ Million KHR — ៥,០០០,០០០ រៀល/ឆ្នាំ" },
    ]},
  ],
};

const REQUIRED = {
  house_land_rent:    ["monthlyRent", "months", "ratePercent"],
  unused_land:        ["landMarketValue", "ratePercent"],
  immovable_property: ["propertyValue", "ratePercent"],
  public_lighting_tax: ["invoiceValue", "ratePercent"],
  accommodation_tax:  ["accommodationFee", "ratePercent"],
  transportation_tax: ["vehicleType"],
  registration_tax:   ["transferType", "contractValue"],
  fiscal_stamp_duty:  ["signType", "languagePosition", "signWidth", "signHeight"],
  tax_on_income:      ["entityType", "taxableProfit"],
  tax_on_salary:      ["grossSalary"],
  vat:                ["supplyValue"],
  specific_tax:       ["supplyType", "productType", "grossValue"],
  minimum_tax:        ["annualTurnover", "annualNetProfit"],
  withholding_tax:    ["paymentType", "grossAmount"],
  patent_tax:         ["taxpayerSize"],
};

const SELECT_DEFAULTS = {
  transportation_tax: { vehicleType: "car_under_1500" },
  registration_tax:   { transferType: "real_estate", gdtValue: "0" },
  fiscal_stamp_duty:  { signType: "lit", languagePosition: "khmer_top" },
  tax_on_income:      { entityType: "corporate" },
  tax_on_salary:      { hasSpouse: "no", numChildren: "0", nssfContribution: "20000" },
  vat:                { inputVat: "0" },
  specific_tax:       { supplyType: "local", productType: "beer" },
  withholding_tax:    { paymentType: "rental_resident" },
  patent_tax:         { taxpayerSize: "small" },
};

export default function CalculatorForm({ tax, onCalculate }) {
  const [inputs, setInputs] = useState({
    ratePercent: tax.ratePercent || 0,
    ...(SELECT_DEFAULTS[tax.calculatorType] || {}),
  });
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState("KHR");
  const [exchangeRate, setExchangeRate] = useState("4000");

  const formatNumber = (val) => {
    if (val === undefined || val === null || val === "") return "";
    const str = val.toString();
    const parts = str.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "select-one") {
      setInputs((prev) => ({ ...prev, [name]: value }));
      return;
    }
    const rawValue = value.replace(/\s/g, "");
    if (rawValue === "" || /^\d*\.?\d*$/.test(rawValue)) {
      setInputs((prev) => ({ ...prev, [name]: rawValue }));
    }
  };

  const fields = FIELDS[tax.calculatorType] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const reqs = REQUIRED[tax.calculatorType] || [];
    const missing = reqs.find((r) => inputs[r] === undefined || inputs[r] === "");
    if (missing) {
      setError("សូមបំពេញគ្រប់វាលដែលតម្រូវ។");
      return;
    }

    const payload = { ...inputs };
    if (currency === "USD") {
      const rate = parseFloat(exchangeRate) || 4000;
      fields.forEach((f) => {
        if (f.unit === "រៀល" && payload[f.name] !== undefined && payload[f.name] !== "") {
          payload[f.name] = (parseFloat(payload[f.name]) * rate).toString();
        }
      });
    }

    onCalculate(tax.calculatorType, payload);
  };

  return (
    <div>
      {/* Title */}
      <header className="mb-12 text-center">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
          {tax.nameKm}
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-6 md:p-10 flex flex-col gap-8"
      >
        {/* Tax Rate Info Card */}
        <div className="bg-surface-container rounded-lg p-6 border border-primary-fixed-dim/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {tax.ratePercent === null ? "local_atm" : "percent"}
            </span>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface">
                {tax.ratePercent === null ? "ថ្លៃបង់ពន្ធ" : "អត្រាពន្ធ"}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {tax.ratePercent === null ? "ថ្លៃថេរតាមប្រភេទយានយន្ត" : `${tax.ratePercent}%`}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-md text-[12px] whitespace-nowrap">
            <span className="material-symbols-outlined text-[16px] mr-1">gavel</span>
            កំណត់ដោយច្បាប់
          </span>
        </div>

        {/* Currency Switcher */}
        <div className="bg-surface-container-lowest rounded-lg p-5 border border-primary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-label-md text-label-md text-on-surface mb-1">រូបិយប័ណ្ណបញ្ចូល (Input Currency)</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              ការគណនាផ្លូវការនឹងបំប្លែងទៅជា "រៀល" ដោយស្វ័យប្រវត្តិ។
            </p>
          </div>
          <div className="flex bg-surface border border-outline-variant rounded-full p-1">
            <button type="button" onClick={() => setCurrency("KHR")} className={`px-5 py-2 rounded-full font-label-md text-label-md transition-colors ${currency === "KHR" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface hover:bg-surface-variant"}`}>៛ KHR</button>
            <button type="button" onClick={() => setCurrency("USD")} className={`px-5 py-2 rounded-full font-label-md text-label-md transition-colors ${currency === "USD" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface hover:bg-surface-variant"}`}>$ USD</button>
          </div>
        </div>

        {currency === "USD" && (
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface flex justify-between">
              <span>អត្រាប្តូរប្រាក់ (Exchange Rate)</span>
              <span className="text-outline">៛/USD</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-outline pointer-events-none z-10">
                <span className="material-symbols-outlined text-[20px]">currency_exchange</span>
              </span>
              <input
                className="w-full bg-surface rounded-full border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary py-4 pl-10 pr-4 text-body-md font-body-md text-on-surface outline-none transition-all duration-200"
                type="text"
                inputMode="decimal"
                value={formatNumber(exchangeRate)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\s/g, "");
                  if (raw === "" || /^\d*\.?\d*$/.test(raw)) setExchangeRate(raw);
                }}
                required
              />
            </div>
          </div>
        )}

        <hr className="border-outline-variant/30" />

        {/* Error */}
        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-6">
          {fields.map((f) => (
            <div key={f.name} className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface flex justify-between">
                <span>{f.label}</span>
                {f.unit && <span className="text-outline">{f.unit === "រៀល" && currency === "USD" ? "USD" : f.unit}</span>}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-outline pointer-events-none z-10">
                  <span className="material-symbols-outlined text-[20px]">{f.icon}</span>
                </span>
                {f.type === "select" ? (
                  <select
                    className="w-full bg-surface rounded-full border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary py-4 pl-10 pr-4 text-body-md font-body-md text-on-surface outline-none transition-all duration-200 appearance-none cursor-pointer"
                    name={f.name}
                    value={inputs[f.name] ?? ""}
                    onChange={handleChange}
                    required
                  >
                    {f.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="w-full bg-surface rounded-full border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary py-4 pl-10 pr-4 text-body-md font-body-md text-on-surface outline-none transition-all duration-200"
                    type={f.type === "number" ? "text" : f.type}
                    inputMode={f.type === "number" ? "decimal" : undefined}
                    name={f.name}
                    value={f.type === "number" ? formatNumber(inputs[f.name]) : (inputs[f.name] ?? "")}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Applicable Tier / Rate Info */}
        <div className="bg-surface-container-low rounded-lg p-5 border border-outline-variant/50 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h4 className="font-label-md text-label-md text-on-surface">
              អត្រាពន្ធត្រូវអនុវត្ត
            </h4>
            <span
              className="material-symbols-outlined text-outline cursor-help text-[18px]"
              title={tax.formula}
            >
              info
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant italic">
            {tax.ratePercent !== null ? `${tax.ratePercent}% — ` : ""}{tax.formula}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-container text-on-primary rounded-full py-4 px-8 font-label-md text-label-md flex justify-center items-center gap-2 transition-colors duration-300 shadow-md hover:shadow-lg mt-4"
        >
          <span>គណនាពន្ធ</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>
    </div>
  );
}
