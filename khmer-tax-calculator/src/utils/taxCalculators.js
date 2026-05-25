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

    case "public_lighting_tax": {
      const invoiceValue = Math.max(parseFloat(inputs.invoiceValue) || 0, 0);
      rateUsed = Math.max(parseFloat(inputs.ratePercent) || 0, 0) / 100;

      taxableAmount = invoiceValue;
      taxAmount = taxableAmount * rateUsed;
      formulaUsed = "អាករ = តម្លៃវិក្កបត្រ (មិនរួម VAT និង PLT) × ៥%";
      steps = [
        `១. តម្លៃវិក្កបត្រ (មិនរួម VAT និង PLT)៖ ${invoiceValue.toLocaleString()} រៀល`,
        `២. អនុវត្តអត្រា ${(rateUsed * 100).toFixed(2)}%`,
        `៣. អាករសរុប = ${invoiceValue.toLocaleString()} × ${rateUsed} = ${taxAmount.toLocaleString()} រៀល`,
      ];
      break;
    }

    case "accommodation_tax": {
      const accommodationFee = Math.max(parseFloat(inputs.accommodationFee) || 0, 0);
      rateUsed = Math.max(parseFloat(inputs.ratePercent) || 0, 0) / 100;

      taxableAmount = accommodationFee;
      taxAmount = taxableAmount * rateUsed;
      formulaUsed = "អាករ = ថ្លៃស្នាក់នៅ (រួម ពន្ធទាំងអស់ លើកលែង AT & VAT) × ២%";
      steps = [
        `១. ថ្លៃស្នាក់នៅ (រួម ពន្ធទាំងអស់ លើកលែង AT & VAT)៖ ${accommodationFee.toLocaleString()} រៀល`,
        `២. អនុវត្តអត្រា ${(rateUsed * 100).toFixed(2)}%`,
        `៣. អាករសរុប = ${accommodationFee.toLocaleString()} × ${rateUsed} = ${taxAmount.toLocaleString()} រៀល`,
      ];
      break;
    }

    case "registration_tax": {
      const TRANSFER_RATES = {
        real_estate: { label: "អចលនទ្រព្យ (ដី/ផ្ទះ)",            rate: 0.04, useMax: true  },
        vehicle:     { label: "យានយន្ត / មធ្យោបាយដឹកជញ្ជូន",    rate: 0.04, useMax: false },
        shares:      { label: "ភាគហ៊ុន (Corporate Shares)",       rate: 0.001, useMax: false },
        contract:    { label: "កិច្ចសន្យារដ្ឋ/សាធារណៈ",           rate: 0.001, useMax: false },
      };
      const transferKey = inputs.transferType || "real_estate";
      const selected = TRANSFER_RATES[transferKey] ?? TRANSFER_RATES.real_estate;
      const contractValue = Math.max(parseFloat(inputs.contractValue) || 0, 0);
      const gdtValue = Math.max(parseFloat(inputs.gdtValue) || 0, 0);

      taxableAmount = selected.useMax ? Math.max(contractValue, gdtValue) : contractValue;
      rateUsed = selected.rate;
      taxAmount = taxableAmount * selected.rate;
      formulaUsed = selected.useMax
        ? "ពន្ធ = max(តម្លៃកិច្ចសន្យា, តម្លៃ GDT) × ៤%"
        : `ពន្ធ = តម្លៃ × ${rateUsed * 100}%`;
      steps = [
        `១. ប្រភេទផ្ទេរ: ${selected.label}`,
        ...(selected.useMax
          ? [
              `២. តម្លៃកិច្ចសន្យា: ${contractValue.toLocaleString()} រៀល`,
              `៣. តម្លៃ GDT: ${gdtValue.toLocaleString()} រៀល`,
              `៤. មូលដ្ឋានគិតពន្ធ = max(${contractValue.toLocaleString()}, ${gdtValue.toLocaleString()}) = ${taxableAmount.toLocaleString()} រៀល`,
              `៥. ពន្ធ = ${taxableAmount.toLocaleString()} × ${rateUsed * 100}% = ${taxAmount.toLocaleString()} រៀល`,
            ]
          : [
              `២. តម្លៃទ្រព្យ/ភាគហ៊ុន: ${contractValue.toLocaleString()} រៀល`,
              `៣. ពន្ធ = ${contractValue.toLocaleString()} × ${rateUsed * 100}% = ${taxAmount.toLocaleString()} រៀល`,
            ]
        ),
      ];
      break;
    }

    case "fiscal_stamp_duty": {
      const SIGN_RATES = {
        unlit:     { label: "ផ្ទាំងគ្មានពន្លឺ (Unlit)",              rate: 20_000 },
        lit:       { label: "ផ្ទាំងមានពន្លឺ (Illuminated)",          rate: 40_000 },
        billboard: { label: "ផ្ទាំងធំ/ផ្លូវ (Large Billboard)",       rate: 80_000 },
      };
      const LANG_COEFFICIENTS = {
        khmer_top:   { label: "ភាសាខ្មែរខ្ពស់ជាង (ត្រឹមត្រូវ)",     coef: 1.0 },
        foreign_top: { label: "ភាសាបរទេសខ្ពស់ជាង (ពិន័យ ×២)",        coef: 2.0 },
      };
      const signKey = inputs.signType || "lit";
      const langKey = inputs.languagePosition || "khmer_top";
      const width = Math.max(parseFloat(inputs.signWidth) || 0, 0);
      const height = Math.max(parseFloat(inputs.signHeight) || 0, 0);
      const selectedSign = SIGN_RATES[signKey] ?? SIGN_RATES.lit;
      const selectedLang = LANG_COEFFICIENTS[langKey] ?? LANG_COEFFICIENTS.khmer_top;

      const area = width * height;
      taxableAmount = area;
      rateUsed = 0;
      taxAmount = area * selectedSign.rate * selectedLang.coef;
      formulaUsed = "ពន្ធ = ទទឹង × កម្ពស់ × អត្រា/m² × មេគុណទីតាំងភាសា";
      steps = [
        `១. ផ្ទៃផ្ទាំង = ${width} × ${height} = ${area.toLocaleString()} m²`,
        `២. ប្រភេទ: ${selectedSign.label} — ${selectedSign.rate.toLocaleString()} រៀល/m²`,
        `៣. ទីតាំងភាសា: ${selectedLang.label} (×${selectedLang.coef})`,
        `៤. ពន្ធ = ${area.toLocaleString()} × ${selectedSign.rate.toLocaleString()} × ${selectedLang.coef} = ${taxAmount.toLocaleString()} រៀល/ឆ្នាំ`,
      ];
      break;
    }

    case "tax_on_income": {
      const entityType = inputs.entityType || "corporate";
      const profit = Math.max(parseFloat(inputs.taxableProfit) || 0, 0);

      if (entityType === "corporate") {
        rateUsed = 0.20;
        taxableAmount = profit;
        taxAmount = profit * 0.20;
        formulaUsed = "ពន្ធ = ប្រាក់ចំណេញសុទ្ធ × ២០%";
        steps = [
          `១. ប្រាក់ចំណេញសុទ្ធ៖ ${profit.toLocaleString()} រៀល`,
          `២. អនុវត្តអត្រា ២០% (នីតិបុគ្គលទូទៅ)`,
          `៣. ពន្ធ = ${profit.toLocaleString()} × ០.២០ = ${taxAmount.toLocaleString()} រៀល`,
        ];
      } else if (entityType === "insurance") {
        rateUsed = 0.05;
        taxableAmount = profit;
        taxAmount = profit * 0.05;
        formulaUsed = "ពន្ធ = បុព្វលាភធានារ៉ាប់រងសរុប × ៥%";
        steps = [
          `១. បុព្វលាភធានារ៉ាប់រង (Gross Premiums)៖ ${profit.toLocaleString()} រៀល`,
          `២. អនុវត្តអត្រា ៥% (ក្រុមហ៊ុនធានារ៉ាប់រង)`,
          `៣. ពន្ធ = ${profit.toLocaleString()} × ០.០៥ = ${taxAmount.toLocaleString()} រៀល`,
        ];
      } else {
        // Individual / Sole proprietorship — annual progressive
        const BRACKETS = [
          { max: 18_000_000,   rate: 0.00, cumDeduction: 0 },
          { max: 24_000_000,   rate: 0.05, cumDeduction: 900_000 },
          { max: 102_000_000,  rate: 0.10, cumDeduction: 2_100_000 },
          { max: 150_000_000,  rate: 0.15, cumDeduction: 7_200_000 },
          { max: Infinity,     rate: 0.20, cumDeduction: 14_700_000 },
        ];
        const bracket = BRACKETS.find((b) => profit <= b.max);
        taxableAmount = profit;
        taxAmount = Math.max(profit * bracket.rate - bracket.cumDeduction, 0);
        rateUsed = bracket.rate;
        formulaUsed = "ពន្ធ = (ប្រាក់ចំណេញ × អត្រា) − ការកាត់ប្រចាំជំហ្វាន";
        steps = [
          `១. ប្រាក់ចំណេញសុទ្ធប្រចាំឆ្នាំ៖ ${profit.toLocaleString()} រៀល`,
          `២. ជំហ្វានពន្ធដែលត្រូវ: ${(bracket.rate * 100).toFixed(0)}% (ការកាត់: ${bracket.cumDeduction.toLocaleString()})`,
          `៣. ពន្ធ = (${profit.toLocaleString()} × ${bracket.rate}) − ${bracket.cumDeduction.toLocaleString()} = ${taxAmount.toLocaleString()} រៀល`,
        ];
      }
      break;
    }

    case "tax_on_salary": {
      const grossSalary = Math.max(parseFloat(inputs.grossSalary) || 0, 0);
      const nssf = Math.max(parseFloat(inputs.nssfContribution) || 0, 0);
      const hasSpouse = inputs.hasSpouse === "yes" ? 1 : 0;
      const numChildren = Math.max(parseInt(inputs.numChildren) || 0, 0);

      const familyAllowance = (hasSpouse + numChildren) * 150_000;
      taxableAmount = Math.max(grossSalary - nssf - familyAllowance, 0);

      const TOS_BRACKETS = [
        { max: 1_500_000,   rate: 0.00, cumDeduction: 0 },
        { max: 2_000_000,   rate: 0.05, cumDeduction: 75_000 },
        { max: 8_500_000,   rate: 0.10, cumDeduction: 175_000 },
        { max: 12_500_000,  rate: 0.15, cumDeduction: 600_000 },
        { max: Infinity,    rate: 0.20, cumDeduction: 1_225_000 },
      ];
      const bracket = TOS_BRACKETS.find((b) => taxableAmount <= b.max);
      taxAmount = Math.max(taxableAmount * bracket.rate - bracket.cumDeduction, 0);
      rateUsed = bracket.rate;
      formulaUsed = "ពន្ធ = (ប្រាក់ខែសុទ្ធ × អត្រា) − ការកាត់កងតាមកាំពន្ធ";
      steps = [
        `១. ប្រាក់ខែសរុប៖ ${grossSalary.toLocaleString()} រៀល`,
        `២. ដក NSSF: −${nssf.toLocaleString()} រៀល`,
        `៣. ដកការកាត់កងអ្នកនៅក្នុងបន្ទុក (${hasSpouse > 0 ? "ប្ដីប្រពន្ធ ១" : ""}${numChildren > 0 ? `; កូន ${numChildren}` : ""}): −${familyAllowance.toLocaleString()} រៀល`,
        `៤. ប្រាក់ខែសុទ្ធ (មូលដ្ឋានគិតពន្ធ)៖ ${taxableAmount.toLocaleString()} រៀល`,
        `៥. កាំពន្ធ: ${(bracket.rate * 100).toFixed(0)}% (ការកាត់: ${bracket.cumDeduction.toLocaleString()})`,
        `៦. ពន្ធ = (${taxableAmount.toLocaleString()} × ${bracket.rate}) − ${bracket.cumDeduction.toLocaleString()} = ${taxAmount.toLocaleString()} រៀល`,
      ];
      break;
    }

    case "vat": {
      const supplyValue = Math.max(parseFloat(inputs.supplyValue) || 0, 0);
      const inputVat = Math.max(parseFloat(inputs.inputVat) || 0, 0);
      rateUsed = 0.10;

      const outputVat = supplyValue * 0.10;
      taxableAmount = supplyValue;
      taxAmount = Math.max(outputVat - inputVat, 0);
      formulaUsed = "VAT សុទ្ធ = Output VAT (១០%) − Input VAT";
      steps = [
        `១. តម្លៃផ្គត់ផ្គង់ (មិនរួម VAT)៖ ${supplyValue.toLocaleString()} រៀល`,
        `២. Output VAT = ${supplyValue.toLocaleString()} × ១០% = ${outputVat.toLocaleString()} រៀល`,
        `៣. ដក Input VAT (ការទិញ): −${inputVat.toLocaleString()} រៀល`,
        `៤. VAT សុទ្ធដែលត្រូវបង់ = ${taxAmount.toLocaleString()} រៀល`,
      ];
      break;
    }

    case "specific_tax": {
      const SPECIFIC_TAX_RATES = {
        cigarettes:          { label: "បារី / ស៊ីហ្គារ",            rate: 0.20 },
        beer:                { label: "ស្រាបៀរ",                   rate: 0.30 },
        soft_drinks:         { label: "ភេសជ្ជៈ (មិនមែនស្រា)",      rate: 0.10 },
        air_tickets:         { label: "សំបុត្រយន្តហោះ",            rate: 0.10 },
        entertainment:       { label: "សេវាកម្មកំសាន្ត (Karaoke)",  rate: 0.10 },
        vehicle_under_2000:  { label: "យានយន្ត < 2000cc",           rate: 0.10 },
        vehicle_2000_3000:   { label: "យានយន្ត 2000–3000cc",        rate: 0.30 },
        vehicle_over_3000:   { label: "យានយន្ត > 3000cc",           rate: 0.45 },
      };
      const supplyTypeKey = inputs.supplyType || "local";
      const productKey = inputs.productType || "beer";
      const grossValue = Math.max(parseFloat(inputs.grossValue) || 0, 0);
      const selected = SPECIFIC_TAX_RATES[productKey] ?? SPECIFIC_TAX_RATES.beer;

      if (supplyTypeKey === "local") {
        taxableAmount = grossValue * 0.90;
        formulaUsed = "អាករ = (តម្លៃ × ៩០%) × អត្រា";
        steps = [
          `១. តម្លៃលក់ (pre-VAT)៖ ${grossValue.toLocaleString()} រៀល`,
          `២. មូលដ្ឋានគិតអាករ (x90%)= ${taxableAmount.toLocaleString()} រៀល`,
        ];
      } else {
        taxableAmount = grossValue;
        formulaUsed = "អាករ = (CIF + ពន្ធគយ) × អត្រា";
        steps = [
          `១. CIF + ពន្ធគយ៖ ${grossValue.toLocaleString()} រៀល`,
        ];
      }
      rateUsed = selected.rate;
      taxAmount = taxableAmount * selected.rate;
      steps.push(
        `៣. ប្រភេទ: ${selected.label} — អត្រា ${rateUsed * 100}%`,
        `៤. អាករ = ${taxableAmount.toLocaleString()} × ${selected.rate} = ${taxAmount.toLocaleString()} រៀល`,
      );
      break;
    }

    case "minimum_tax": {
      const turnover = Math.max(parseFloat(inputs.annualTurnover) || 0, 0);
      const netProfit = Math.max(parseFloat(inputs.annualNetProfit) || 0, 0);

      const mt = turnover * 0.01;
      const toi = netProfit * 0.20;
      taxableAmount = turnover;
      taxAmount = Math.max(mt, toi);
      rateUsed = 0.01;
      formulaUsed = "MT = ចំណូលសរុប × ១%; TOI = ចំណេញ × ២០%; បង់ max(MT, TOI)";
      steps = [
        `១. ចំណូលសរុបប្រចាំឆ្នាំ (excl. VAT)៖ ${turnover.toLocaleString()} រៀល`,
        `២. ពន្ធអប្បបរមា (MT) = ${turnover.toLocaleString()} × ១% = ${mt.toLocaleString()} រៀល`,
        `៣. ប្រាក់ចំណេញសុទ្ធ៖ ${netProfit.toLocaleString()} រៀល`,
        `៤. ពន្ធលើប្រាក់ចំណូល (TOI) = ${netProfit.toLocaleString()} × ២០% = ${toi.toLocaleString()} រៀល`,
        `៥. ពន្ធដែលត្រូវបង់ = max(${mt.toLocaleString()}, ${toi.toLocaleString()}) = ${taxAmount.toLocaleString()} រៀល (${mt >= toi ? "MT ខ្ពស់ជាង" : "TOI ខ្ពស់ជាង"})`,
      ];
      break;
    }

    case "withholding_tax": {
      const WHT_RATES = {
        services_resident:        { label: "សេវាកម្ម/ប្រឹក្សាយោបល់ (អ្នករស់នៅ)",  rate: 0.15 },
        royalties_resident:       { label: "រូបិយប័ណ្ណ (Royalties, អ្នករស់នៅ)",    rate: 0.15 },
        interest_nonbank:         { label: "ការប្រាក់ (មិនមែនធនាគារ, អ្នករស់នៅ)",  rate: 0.15 },
        rental_resident:          { label: "ការជួល (អ្នករស់នៅ)",                  rate: 0.10 },
        interest_fixed_deposit:   { label: "ការប្រាក់ (ប្រាក់បញ្ញើ Fixed Term)",   rate: 0.06 },
        interest_savings:         { label: "ការប្រាក់ (ប្រាក់សន្សំ Savings)",      rate: 0.04 },
        nonresident_all:          { label: "ប្រភេទទាំងអស់ (អ្នកមិនរស់នៅ)",         rate: 0.14 },
      };
      const paymentKey = inputs.paymentType || "rental_resident";
      const grossAmount = Math.max(parseFloat(inputs.grossAmount) || 0, 0);
      const selected = WHT_RATES[paymentKey] ?? WHT_RATES.rental_resident;

      rateUsed = selected.rate;
      taxableAmount = grossAmount;
      taxAmount = grossAmount * selected.rate;
      const netAmount = grossAmount - taxAmount;
      formulaUsed = "WHT = ទំហំការទូទាត់ × អត្រា";
      steps = [
        `១. ចំនួនទូទាត់សរុប៖ ${grossAmount.toLocaleString()} រៀល`,
        `២. ប្រភេទ: ${selected.label} — អត្រា ${rateUsed * 100}%`,
        `៣. WHT = ${grossAmount.toLocaleString()} × ${selected.rate} = ${taxAmount.toLocaleString()} រៀល`,
        `៤. ទទួលបានសុទ្ធ = ${grossAmount.toLocaleString()} − ${taxAmount.toLocaleString()} = ${netAmount.toLocaleString()} រៀល`,
      ];
      break;
    }

    case "patent_tax": {
      const PATENT_FEES = {
        small:        { label: "អ្នកបង់ពន្ធតូច (Small)",                 fee: 400_000 },
        medium:       { label: "អ្នកបង់ពន្ធមធ្យម (Medium)",               fee: 1_200_000 },
        large_under:  { label: "អ្នកបង់ពន្ធធំ — ≤ ១០,០០០ Million KHR",    fee: 3_000_000 },
        large_over:   { label: "អ្នកបង់ពន្ធធំ — > ១០,០០០ Million KHR",    fee: 5_000_000 },
      };
      const sizeKey = inputs.taxpayerSize || "small";
      const selected = PATENT_FEES[sizeKey] ?? PATENT_FEES.small;

      rateUsed = 0;
      taxableAmount = 0;
      taxAmount = selected.fee;
      formulaUsed = "ពន្ធ = ថ្លៃថេរប្រចាំឆ្នាំតាមប្រភេទ";
      steps = [
        `១. ប្រភេទអ្នកបង់ពន្ធ: ${selected.label}`,
        `២. ពន្ធប្រចាំឆ្នាំ = ${selected.fee.toLocaleString()} រៀល`,
        `៣. ត្រូវបង់មុន ៣១ មីនា ប្រចាំឆ្នាំ`,
      ];
      break;
    }

    case "transportation_tax": {
      const FEE_SCHEDULE = {
        moto_under_125:    { label: "ម៉ូតូ ≤ 125cc",         fee: 10_000 },
        moto_over_125:     { label: "ម៉ូតូ > 125cc",         fee: 15_000 },
        car_under_1500:    { label: "រថយន្ត ≤ 1500cc",       fee: 150_000 },
        car_1501_2500:     { label: "រថយន្ត 1501–2500cc",    fee: 250_000 },
        car_over_2500:     { label: "រថយន្ត > 2500cc",       fee: 400_000 },
        light_truck:       { label: "រថយន្តធុនស្រាល",     fee: 300_000 },
        heavy_truck:       { label: "រថយន្តធុនធ្ងន់",     fee: 600_000 },
        bus:               { label: "រថយន្តក្រុង",       fee: 500_000 },
        boat_under_10t:    { label: "នាវា < 10 តោន",         fee: 200_000 },
        boat_over_10t:     { label: "នាវា ≥ 10 តោន",         fee: 500_000 },
      };
      const vehicleKey = inputs.vehicleType || "car_under_1500";
      const selected = FEE_SCHEDULE[vehicleKey] ?? FEE_SCHEDULE["car_under_1500"];

      rateUsed = 0;
      taxableAmount = 0;
      taxAmount = selected.fee;
      formulaUsed = "ពន្ធ = ថ្លៃថេរប្រចាំឆ្នាំតាមប្រភេទយានយន្ត (Prakas No. 738)";
      steps = [
        `១. ប្រភេទយានយន្ត៖ ${selected.label}`,
        `២. ពន្ធប្រចាំឆ្នាំថេរ = ${selected.fee.toLocaleString()} រៀល`,
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
