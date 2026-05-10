export const calculateTax = (type, inputs) => {
  let taxAmount = 0;
  let taxableAmount = 0;
  let rateUsed = 0;
  let formulaUsed = "";
  let steps = [];

  switch (type) {
    case "house_land_rent": {
      const rent = Math.max(parseFloat(inputs.monthlyRent) || 0, 0);
      const months = Math.max(parseFloat(inputs.months) || 0, 0);
      rateUsed = Math.max(parseFloat(inputs.ratePercent) || 0, 0) / 100;
      
      taxableAmount = rent * months;
      taxAmount = taxableAmount * rateUsed;
      formulaUsed = "Tax = Monthly Rent × Number of Months × Tax Rate";
      steps = [
        `1. Determine monthly rent: ${rent}`,
        `2. Mutiply by rent duration (${months} months) to get taxable base: ${taxableAmount}`,
        `3. Apply tax rate of ${(rateUsed * 100).toFixed(2)}%`,
        `4. Tax Amount = ${taxableAmount} × ${rateUsed} = ${taxAmount}`
      ];
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
      break;
    }
    
    default:
      throw new Error(`Unknown calculator type: ${type}`);
  }

  return {
    taxAmount,
    taxableAmount,
    rateUsed: rateUsed * 100,
    formulaUsed,
    steps
  };
};
