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
      formulaUsed = "ពន្ធ = ប្រាក់ជួលប្រចាំខែ × ចំនួនខែ × អត្រាពន្ធ";
      steps = [
        `១. ប្រាក់ជួលប្រចាំខែ៖ ${rent.toLocaleString()}`,
        `២. គុណនឹងចំនួនខែ (${months}) ដើម្បីបានមូលដ្ឋានគិតពន្ធ៖ ${taxableAmount.toLocaleString()}`,
        `៣. អនុវត្តអត្រាពន្ធ ${(rateUsed * 100).toFixed(2)}%`,
        `៤. ពន្ធសរុប = ${taxableAmount.toLocaleString()} × ${rateUsed} = ${taxAmount.toLocaleString()}`,
      ];
      break;
    }

    case "unused_land": {
      const marketValue = Math.max(parseFloat(inputs.landMarketValue) || 0, 0);
      rateUsed = Math.max(parseFloat(inputs.ratePercent) || 0, 0) / 100;

      // Official formula: 2% of total land market value (no area exemption)
      taxableAmount = marketValue;
      taxAmount = taxableAmount * rateUsed;
      formulaUsed = "ពន្ធ = តម្លៃទីផ្សារដីសរុប × អត្រាពន្ធ (២%)";
      steps = [
        `១. តម្លៃទីផ្សារដីសរុប៖ ${marketValue.toLocaleString()} រៀល`,
        `២. អនុវត្តអត្រាពន្ធ ${(rateUsed * 100).toFixed(2)}%`,
        `៣. ពន្ធសរុប = ${marketValue.toLocaleString()} × ${rateUsed} = ${taxAmount.toLocaleString()} រៀល`,
      ];
      break;
    }

    case "immovable_property": {
      const propertyValue = Math.max(parseFloat(inputs.propertyValue) || 0, 0);
      const EXEMPTION = 100_000_000; // 100 million KHR fixed by law
      rateUsed = Math.max(parseFloat(inputs.ratePercent) || 0, 0) / 100;

      // Official formula: (Property Value × 80%) − 100,000,000 KHR) × 0.1%
      const assessedValue = propertyValue * 0.8;
      taxableAmount = Math.max(assessedValue - EXEMPTION, 0);
      taxAmount = taxableAmount * rateUsed;
      formulaUsed = "ពន្ធ = ((តម្លៃអចលនទ្រព្យ × ៨០%) − ១០០,០០០,០០០ រៀល) × ០.១%";
      steps = [
        `១. តម្លៃអចលនទ្រព្យ៖ ${propertyValue.toLocaleString()} រៀល`,
        `២. គណនាតម្លៃវាយតម្លៃ (៨០%)៖ ${propertyValue.toLocaleString()} × ០.៨ = ${assessedValue.toLocaleString()} រៀល`,
        `៣. ដកការលើកលែង ១០០,០០០,០០០ រៀល៖ ${assessedValue.toLocaleString()} − ១០០,០០០,០០០ = ${taxableAmount.toLocaleString()} រៀល`,
        `៤. អនុវត្តអត្រាពន្ធ ${(rateUsed * 100).toFixed(2)}%`,
        `៥. ពន្ធសរុប = ${taxableAmount.toLocaleString()} × ${rateUsed} = ${taxAmount.toLocaleString()} រៀល`,
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
    steps,
  };
};
