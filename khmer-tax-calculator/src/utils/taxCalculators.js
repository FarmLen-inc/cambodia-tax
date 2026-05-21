export const calculateTax = (type, inputs) => {
  let taxAmount = 0;
  let taxableAmount = 0;
  let rateUsed = 0;
  let formulaUsed = "";
  let steps = [];
  let result = {};

  switch (type) {
    case "business_classification": {
      const income = Math.max(parseFloat(inputs.annualIncome) || 0, 0);
      
      let classification = '';
      let classificationKm = '';
      let icon = '';
      let details = '';
      
      if (income < 250_000_000) {
        classification = 'Small Enterprise';
        classificationKm = 'អាជីវកម្មតូច';
        icon = '🏪';
        details = 'Below 250 million KHR annually';
        rateUsed = 2.5;
      } else if (income < 700_000_000) {
        classification = 'Medium Enterprise';
        classificationKm = 'អាជីវកម្មមធ្យម';
        icon = '🏬';
        details = 'Below 700 million KHR annually';
        rateUsed = 10;
      } else {
        classification = 'Large Enterprise';
        classificationKm = 'អាជីវកម្មធំ';
        icon = '🏦';
        details = 'Over 700 million KHR annually';
        rateUsed = 20;
      }
      
      result = {
        classification,
        classificationKm,
        icon,
        details,
        income,
        applicableRate: rateUsed
      };
      steps = [
        `1. Annual income: ${income.toLocaleString()} KHR`,
        `2. ${classification}: ${details}`,
        `3. Applicable tax rate range: ${rateUsed}%`
      ];
      formulaUsed = 'Classification based on annual turnover thresholds';
      break;
    }

    case "salary_tax": {
      const salary = Math.max(parseFloat(inputs.monthlySalary) || 0, 0);
      
      if (salary <= 1_500_000) {
        taxAmount = 0;
        rateUsed = 0;
      } else if (salary <= 2_000_000) {
        taxAmount = salary * 0.05 - 75_000;
        rateUsed = 5;
      } else if (salary <= 8_500_000) {
        taxAmount = salary * 0.10 - 175_000;
        rateUsed = 10;
      } else if (salary <= 12_500_000) {
        taxAmount = salary * 0.15 - 600_000;
        rateUsed = 15;
      } else {
        taxAmount = salary * 0.20 - 1_225_000;
        rateUsed = 20;
      }
      
      taxAmount = Math.max(0, taxAmount);
      taxableAmount = salary;
      const netSalary = salary - taxAmount;
      
      result = {
        grossSalary: salary,
        netSalary,
        taxAmount,
        bracket: rateUsed
      };
      steps = [
        `1. Gross salary: ${salary.toLocaleString()} KHR`,
        `2. Tax bracket: ${rateUsed}%`,
        `3. Tax formula: Salary × ${rateUsed}% − constant`,
        `4. Tax amount: ${taxAmount.toLocaleString()} KHR`,
        `5. Net salary: ${netSalary.toLocaleString()} KHR`
      ];
      formulaUsed = 'Progressive tax brackets: 0% to 20%';
      break;
    }

    case "vat": {
      const price = Math.max(parseFloat(inputs.price) || 0, 0);
      const priceType = inputs.priceType || 'included';
      
      let originalPrice, vatAmount, finalPrice;
      
      if (priceType === 'included') {
        vatAmount = price * 10 / 110;
        originalPrice = price - vatAmount;
        finalPrice = price;
      } else {
        vatAmount = price * 0.10;
        originalPrice = price;
        finalPrice = price + vatAmount;
      }
      
      result = {
        originalPrice,
        vatAmount,
        finalPrice,
        priceType,
        vatRate: 10
      };
      steps = [
        `1. Original price: ${originalPrice.toLocaleString()} KHR`,
        `2. VAT (10%): ${vatAmount.toLocaleString()} KHR`,
        `3. Final price (with VAT): ${finalPrice.toLocaleString()} KHR`
      ];
      formulaUsed = priceType === 'included' ? 'VAT = Price × 10/110' : 'VAT = Price × 10%';
      break;
    }

    case "excise_tax": {
      const sellingPrice = Math.max(parseFloat(inputs.sellingPrice) || 0, 0);
      const exciseRate = Math.max(parseFloat(inputs.exciseRate) || 0, 0) / 100;
      const vatRate = 0.10;
      
      const taxBase = (0.9 * sellingPrice) / ((1 + vatRate) * (1 + exciseRate));
      const exciseTax = taxBase * exciseRate;
      const finalPrice = taxBase + exciseTax;
      
      result = {
        sellingPrice,
        taxBase,
        exciseTax,
        finalPrice,
        exciseRate: exciseRate * 100,
        vatRate: 10
      };
      steps = [
        `1. Selling price: ${sellingPrice.toLocaleString()} KHR`,
        `2. Tax base (90% adjusted): ${taxBase.toLocaleString()} KHR`,
        `3. Excise tax (${(exciseRate * 100).toFixed(1)}%): ${exciseTax.toLocaleString()} KHR`,
        `4. Final price: ${finalPrice.toLocaleString()} KHR`
      ];
      formulaUsed = 'Tax Base = 90% × Price ÷ [(1 + VAT) × (1 + Rate)] | Excise = Base × Rate';
      break;
    }

    case "withholding_tax": {
      const paymentAmount = Math.max(parseFloat(inputs.paymentAmount) || 0, 0);
      const incomeType = inputs.incomeType || 'service';
      const residency = inputs.residency || 'resident';
      
      let whtRate = 0;
      let incomeLabel = '';
      
      switch (incomeType) {
        case 'service':
          incomeLabel = 'Service Payment';
          whtRate = residency === 'resident' ? 0.15 : 0.14;
          break;
        case 'rent':
          incomeLabel = 'Rental Payment';
          whtRate = residency === 'resident' ? 0.10 : 0.14;
          break;
        case 'interest':
          incomeLabel = 'Interest Payment';
          whtRate = residency === 'resident' ? 0.15 : 0.14;
          break;
        case 'royalty':
          incomeLabel = 'Royalty Payment';
          whtRate = residency === 'resident' ? 0.15 : 0.14;
          break;
        default:
          whtRate = 0.15;
      }
      
      const withholdingTax = paymentAmount * whtRate;
      const netAmount = paymentAmount - withholdingTax;
      
      result = {
        paymentAmount,
        incomeType,
        incomeLabel,
        residency,
        withholdingTax,
        netAmount,
        whtRate: whtRate * 100
      };
      steps = [
        `1. Payment amount: ${paymentAmount.toLocaleString()} KHR`,
        `2. Income type: ${incomeLabel}`,
        `3. Residency: ${residency}`,
        `4. WHT rate: ${(whtRate * 100).toFixed(0)}%`,
        `5. Withholding tax: ${withholdingTax.toLocaleString()} KHR`,
        `6. Net amount: ${netAmount.toLocaleString()} KHR`,
        `7. Payment due: 20th of following month`
      ];
      formulaUsed = 'WHT = Payment Amount × Rate (varies by type and residency)';
      break;
    }

    case "minimum_tax": {
      const turnover = Math.max(parseFloat(inputs.annualTurnover) || 0, 0);
      const toi = Math.max(parseFloat(inputs.toi) || 0, 0);
      
      const minimumTax = turnover * 0.01;
      const taxPayable = toi > 0 ? Math.max(minimumTax, toi) : minimumTax;
      const comparisonResult = toi > minimumTax ? 'TOI' : 'Minimum Tax';
      
      result = {
        turnover,
        minimumTax,
        toi,
        taxPayable,
        comparison: comparisonResult,
        minimumTaxRate: 1
      };
      steps = [
        `1. Annual turnover: ${turnover.toLocaleString()} KHR`,
        `2. Minimum tax (1%): ${minimumTax.toLocaleString()} KHR`,
        toi > 0 ? `3. Tax on income (TOI): ${toi.toLocaleString()} KHR` : `3. No TOI provided`,
        toi > 0 ? `4. Payable: max(${minimumTax.toLocaleString()}, ${toi.toLocaleString()}) = ${taxPayable.toLocaleString()} KHR` : `4. Tax payable (Minimum): ${taxPayable.toLocaleString()} KHR`,
        `5. Purpose: Ensure minimum contribution to state even if business reports losses`
      ];
      formulaUsed = 'Minimum Tax = Turnover × 1% | Tax Payable = max(TOI, Minimum Tax)';
      break;
    }

    case "house_land_rent": {
      const rent = Math.max(parseFloat(inputs.monthlyRent) || 0, 0);
      const months = Math.max(parseFloat(inputs.months) || 0, 0);
      rateUsed = Math.max(parseFloat(inputs.ratePercent) || 0, 0) / 100;
      
      taxableAmount = rent * months;
      taxAmount = taxableAmount * rateUsed;
      formulaUsed = "Tax = Monthly Rent × Number of Months × Tax Rate";
      steps = [
        `1. Determine monthly rent: ${rent}`,
        `2. Multiply by rent duration (${months} months) to get taxable base: ${taxableAmount}`,
        `3. Apply tax rate of ${(rateUsed * 100).toFixed(2)}%`,
        `4. Tax Amount = ${taxableAmount} × ${rateUsed} = ${taxAmount}`
      ];
      result = { taxAmount, taxableAmount, rateUsed: rateUsed * 100 };
      break;
    }
    
    case "unused_land": {
      const area = Math.max(parseFloat(inputs.landArea) || 0, 0);
      const exempt = Math.max(parseFloat(inputs.exemptedArea) || 0, 0);
      const value = Math.max(parseFloat(inputs.valuePerSquareMeter) || 0, 0);
      rateUsed = Math.max(parseFloat(inputs.ratePercent) || 0, 0) / 100;
      
      const chargeableArea = Math.max(area - exempt, 0);
      taxableAmount = chargeableArea * value;
      taxAmount = taxableAmount * rateUsed;
      formulaUsed = "Tax = (Land Area - Exempted Area) × Value per m² × Tax Rate";
      steps = [
        `1. Subtract exempted area (${exempt} m²) from total land area (${area} m²): ${chargeableArea} m²`,
        `2. Multiply chargeable area by value per m² (${value}): ${taxableAmount}`,
        `3. Apply tax rate of ${(rateUsed * 100).toFixed(2)}%`,
        `4. Tax Amount = ${taxableAmount} × ${rateUsed} = ${taxAmount}`
      ];
      result = { taxAmount, taxableAmount, rateUsed: rateUsed * 100, chargeableArea };
      break;
    }

    case "immovable_property": {
      const value = Math.max(parseFloat(inputs.propertyValue) || 0, 0);
      const exemption = Math.max(parseFloat(inputs.exemptionAmount) || 0, 0);
      rateUsed = Math.max(parseFloat(inputs.ratePercent) || 0, 0) / 100;
      
      taxableAmount = Math.max(value - exemption, 0);
      taxAmount = taxableAmount * rateUsed;
      formulaUsed = "Tax = (Property Value - Exemption Amount) × Tax Rate";
      steps = [
        `1. Subtract exemption amount (${exemption}) from property value (${value}): ${taxableAmount}`,
        `2. Apply tax rate of ${(rateUsed * 100).toFixed(2)}%`,
        `3. Tax Amount = ${taxableAmount} × ${rateUsed} = ${taxAmount}`
      ];
      result = { taxAmount, taxableAmount, rateUsed: rateUsed * 100 };
      break;
    }
    
    default:
      throw new Error(`Unknown calculator type: ${type}`);
  }

  return {
    taxAmount: result.taxAmount !== undefined ? result.taxAmount : taxAmount,
    taxableAmount: result.taxableAmount !== undefined ? result.taxableAmount : taxableAmount,
    rateUsed: result.rateUsed !== undefined ? result.rateUsed : (rateUsed * 100),
    formulaUsed,
    steps,
    ...result
  };
};
