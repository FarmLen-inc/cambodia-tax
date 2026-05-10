"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

export default function CalculatorForm({ tax, onCalculate }) {
  const [inputs, setInputs] = useState(() => {
    const initial = { ratePercent: tax.ratePercent || 0 };
    if (tax.calculatorType === "unused_land") {
      initial.exemptedArea = tax.defaultExemptedArea || 1200;
    } else if (tax.calculatorType === "immovable_property") {
      initial.exemptionAmount = tax.defaultExemptionAmount || 100000000;
    }
    return initial;
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    const requiredFields = {
      house_land_rent: ["monthlyRent", "months", "ratePercent"],
      unused_land: ["landArea", "exemptedArea", "valuePerSquareMeter", "ratePercent"],
      immovable_property: ["propertyValue", "exemptionAmount", "ratePercent"]
    };

    const reqs = requiredFields[tax.calculatorType] || [];
    const missing = reqs.find((req) => inputs[req] === undefined || inputs[req] === "");
    if (missing) {
      setError("Please fill in all required fields.");
      return;
    }

    onCalculate(tax.calculatorType, inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
        <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
        Enter Details
      </h3>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {tax.calculatorType === "house_land_rent" && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Rent</label>
              <input type="number" min="0" step="0.01" name="monthlyRent" value={inputs.monthlyRent || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Number of Months</label>
              <input type="number" min="0" step="1" name="months" value={inputs.months || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none" required />
            </div>
          </>
        )}

        {tax.calculatorType === "unused_land" && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Land Area (sq meters)</label>
              <input type="number" min="0" step="0.01" name="landArea" value={inputs.landArea || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Exempted Area (sq meters)</label>
              <input type="number" min="0" step="0.01" name="exemptedArea" value={inputs.exemptedArea ?? ""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Value per sq meter</label>
              <input type="number" min="0" step="0.01" name="valuePerSquareMeter" value={inputs.valuePerSquareMeter || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none" required />
            </div>
          </>
        )}

        {tax.calculatorType === "immovable_property" && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Property Value</label>
              <input type="number" min="0" step="0.01" name="propertyValue" value={inputs.propertyValue || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Exemption Amount</label>
              <input type="number" min="0" step="0.01" name="exemptionAmount" value={inputs.exemptionAmount ?? ""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none" required />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tax Rate (%) <span className="text-slate-400 font-normal italic ml-1">- To verify from class material</span></label>
          <input type="number" min="0" step="0.01" name="ratePercent" value={inputs.ratePercent ?? ""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none" required />
        </div>
      </div>

      <button type="submit" className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200">
        Calculate Tax
      </button>
    </form>
  );
}
