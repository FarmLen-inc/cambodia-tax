"use client";

import { useState } from "react";

export default function CalculatorForm({ tax, onCalculate }) {
  const [inputs, setInputs] = useState(() => {
    const initial = { ratePercent: tax.ratePercent || 0 };
    if (tax.calculatorType === "unused_land") {
      initial.exemptedArea = tax.defaultExemptedArea || 1200;
    } else if (tax.calculatorType === "immovable_property") {
      initial.exemptionAmount = tax.defaultExemptionAmount || 100000000;
    } else if (tax.calculatorType === "vat") {
      initial.priceType = "included";
    } else if (tax.calculatorType === "withholding_tax") {
      initial.incomeType = "service";
      initial.residency = "resident";
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

    const requiredFields = {
      business_classification: ["annualIncome"],
      salary_tax: ["monthlySalary"],
      vat: ["price"],
      excise_tax: ["sellingPrice", "exciseRate"],
      withholding_tax: ["paymentAmount"],
      minimum_tax: ["annualTurnover"],
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
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="info-card orange" style={{ marginBottom: '16px' }}>
          <div className="ic-icon">⚠️</div>
          <div>{error}</div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tax.calculatorType === "business_classification" && (
          <div className="form-group">
            <label>Annual Income (KHR) <span>*</span></label>
            <div className="input-wrap">
              <input
                type="number"
                min="0"
                step="100000"
                name="annualIncome"
                value={inputs.annualIncome || ""}
                onChange={handleChange}
                placeholder="e.g., 500,000,000"
                required
              />
              <span className="unit">KHR</span>
            </div>
          </div>
        )}

        {tax.calculatorType === "salary_tax" && (
          <div className="form-group">
            <label>Monthly Salary (KHR) <span>*</span></label>
            <div className="input-wrap">
              <input
                type="number"
                min="0"
                step="10000"
                name="monthlySalary"
                value={inputs.monthlySalary || ""}
                onChange={handleChange}
                placeholder="e.g., 3,000,000"
                required
              />
              <span className="unit">KHR</span>
            </div>
          </div>
        )}

        {tax.calculatorType === "vat" && (
          <>
            <div className="form-group">
              <label>Price Type <span>*</span></label>
              <div className="radio-group">
                <label className={`radio-label ${inputs.priceType === "included" ? "checked" : ""}`}>
                  <input type="radio" name="priceType" value="included" checked={inputs.priceType === "included"} onChange={handleChange} />
                  <div className="radio-dot"></div>
                  <span>Inclusive (with tax)</span>
                </label>
                <label className={`radio-label ${inputs.priceType === "excluded" ? "checked" : ""}`}>
                  <input type="radio" name="priceType" value="excluded" checked={inputs.priceType === "excluded"} onChange={handleChange} />
                  <div className="radio-dot"></div>
                  <span>Exclusive (without tax)</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Price (KHR) <span>*</span></label>
              <div className="input-wrap">
                <input
                  type="number"
                  min="0"
                  step="1000"
                  name="price"
                  value={inputs.price || ""}
                  onChange={handleChange}
                  placeholder="e.g., 1,100,000"
                  required
                />
                <span className="unit">KHR</span>
              </div>
            </div>
          </>
        )}

        {tax.calculatorType === "excise_tax" && (
          <>
            <div className="form-group">
              <label>Selling Price (KHR) <span>*</span></label>
              <div className="input-wrap">
                <input
                  type="number"
                  min="0"
                  step="10000"
                  name="sellingPrice"
                  value={inputs.sellingPrice || ""}
                  onChange={handleChange}
                  placeholder="e.g., 1,300,000"
                  required
                />
                <span className="unit">KHR</span>
              </div>
            </div>
            <div className="form-group">
              <label>Excise Tax Rate <span>*</span></label>
              <select name="exciseRate" value={inputs.exciseRate || ""} onChange={handleChange} required>
                <option value="">-- Select Item --</option>
                <option value="35">Spirits/Alcohol (35%)</option>
                <option value="30">Beer (30%)</option>
                <option value="25">Cigars (25%)</option>
                <option value="20">Cigarettes (20%)</option>
                <option value="10">Soft Drinks (10%)</option>
                <option value="5">Cement (5%)</option>
              </select>
            </div>
          </>
        )}

        {tax.calculatorType === "withholding_tax" && (
          <>
            <div className="form-group">
              <label>Income Type <span>*</span></label>
              <select name="incomeType" value={inputs.incomeType || "service"} onChange={handleChange}>
                <option value="service">Service Payment</option>
                <option value="rent">Rental Payment</option>
                <option value="interest">Interest Payment</option>
                <option value="royalty">Royalty Payment</option>
              </select>
            </div>
            <div className="form-group">
              <label>Residency Status <span>*</span></label>
              <div className="radio-group">
                <label className={`radio-label ${inputs.residency === "resident" ? "checked" : ""}`}>
                  <input type="radio" name="residency" value="resident" checked={inputs.residency === "resident"} onChange={handleChange} />
                  <div className="radio-dot"></div>
                  <span>Resident</span>
                </label>
                <label className={`radio-label ${inputs.residency === "non-resident" ? "checked" : ""}`}>
                  <input type="radio" name="residency" value="non-resident" checked={inputs.residency === "non-resident"} onChange={handleChange} />
                  <div className="radio-dot"></div>
                  <span>Non-Resident</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Payment Amount (KHR) <span>*</span></label>
              <div className="input-wrap">
                <input
                  type="number"
                  min="0"
                  step="100000"
                  name="paymentAmount"
                  value={inputs.paymentAmount || ""}
                  onChange={handleChange}
                  placeholder="e.g., 5,000,000"
                  required
                />
                <span className="unit">KHR</span>
              </div>
            </div>
          </>
        )}

        {tax.calculatorType === "minimum_tax" && (
          <>
            <div className="form-group">
              <label>Annual Turnover (KHR) <span>*</span></label>
              <div className="input-wrap">
                <input
                  type="number"
                  min="0"
                  step="100000"
                  name="annualTurnover"
                  value={inputs.annualTurnover || ""}
                  onChange={handleChange}
                  placeholder="e.g., 500,000,000"
                  required
                />
                <span className="unit">KHR</span>
              </div>
            </div>
            <div className="form-group">
              <label>Tax on Income (TOI) - Optional</label>
              <div className="input-wrap">
                <input
                  type="number"
                  min="0"
                  step="100000"
                  name="toi"
                  value={inputs.toi || ""}
                  onChange={handleChange}
                  placeholder="Leave blank to compare minimum only"
                />
                <span className="unit">KHR</span>
              </div>
            </div>
          </>
        )}

        {tax.calculatorType === "house_land_rent" && (
          <>
            <div className="form-group">
              <label>Monthly Rent <span>*</span></label>
              <input type="number" min="0" step="0.01" name="monthlyRent" value={inputs.monthlyRent || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Number of Months <span>*</span></label>
              <input type="number" min="0" step="1" name="months" value={inputs.months || ""} onChange={handleChange} required />
            </div>
          </>
        )}

        {tax.calculatorType === "unused_land" && (
          <>
            <div className="form-group">
              <label>Land Area (sq meters) <span>*</span></label>
              <input type="number" min="0" step="0.01" name="landArea" value={inputs.landArea || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Exempted Area (sq meters) <span>*</span></label>
              <input type="number" min="0" step="0.01" name="exemptedArea" value={inputs.exemptedArea ?? ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Value per sq meter <span>*</span></label>
              <input type="number" min="0" step="0.01" name="valuePerSquareMeter" value={inputs.valuePerSquareMeter || ""} onChange={handleChange} required />
            </div>
          </>
        )}

        {tax.calculatorType === "immovable_property" && (
          <>
            <div className="form-group">
              <label>Property Value <span>*</span></label>
              <input type="number" min="0" step="0.01" name="propertyValue" value={inputs.propertyValue || ""} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Exemption Amount <span>*</span></label>
              <input type="number" min="0" step="0.01" name="exemptionAmount" value={inputs.exemptionAmount ?? ""} onChange={handleChange} required />
            </div>
          </>
        )}

        {(tax.calculatorType === "house_land_rent" || tax.calculatorType === "unused_land" || tax.calculatorType === "immovable_property") && (
          <div className="form-group">
            <label>Tax Rate (%) <span>*</span></label>
            <input type="number" min="0" step="0.01" name="ratePercent" value={inputs.ratePercent ?? ""} onChange={handleChange} required />
          </div>
        )}
      </div>

      <div className="btn-row">
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
          🧮 Calculate Tax
        </button>
        <button type="button" onClick={() => setInputs({})} className="btn btn-reset">
          🔄 Reset
        </button>
      </div>
    </form>
  );
}
