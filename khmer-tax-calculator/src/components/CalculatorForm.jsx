"use client";

import { useState } from "react";

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
};

const REQUIRED = {
  house_land_rent:    ["monthlyRent", "months", "ratePercent"],
  unused_land:        ["landMarketValue", "ratePercent"],
  immovable_property: ["propertyValue", "ratePercent"],
};

export default function CalculatorForm({ tax, onCalculate }) {
  const [inputs, setInputs] = useState({ ratePercent: tax.ratePercent || 0 });
  const [error, setError] = useState("");

  const formatNumber = (val) => {
    if (val === undefined || val === null || val === "") return "";
    const str = val.toString();
    const parts = str.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Remove space before storing in state so calculation remains valid
    const rawValue = value.replace(/\s/g, "");
    // Allow empty string or valid positive numbers (with or without decimal)
    if (rawValue === "" || /^\d*\.?\d*$/.test(rawValue)) {
      setInputs((prev) => ({ ...prev, [name]: rawValue }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const reqs = REQUIRED[tax.calculatorType] || [];
    const missing = reqs.find((r) => inputs[r] === undefined || inputs[r] === "");
    if (missing) {
      setError("សូមបំពេញគ្រប់វាលដែលតម្រូវ។");
      return;
    }
    onCalculate(tax.calculatorType, inputs);
  };

  const fields = FIELDS[tax.calculatorType] || [];

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
              percent
            </span>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface">
                អត្រាពន្ធ
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {tax.ratePercent}%
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-md text-[12px] whitespace-nowrap">
            <span className="material-symbols-outlined text-[16px] mr-1">gavel</span>
            កំណត់ដោយច្បាប់
          </span>
        </div>

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
                {f.unit && <span className="text-outline">{f.unit}</span>}
              </label>
              <div className="relative">
                {f.prefix ? (
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-outline pointer-events-none font-body-md">
                    {f.prefix}
                  </span>
                ) : (
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-outline pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">{f.icon}</span>
                  </span>
                )}
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
            {tax.ratePercent}% — {tax.formula}
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
