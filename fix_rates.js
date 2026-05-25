const fs = require('fs');
const file = 'khmer-tax-calculator/src/utils/taxCalculators.js';
let data = fs.readFileSync(file, 'utf8');

// registration_tax
data = data.replace(/rateUsed = selected.rate \* 100;/g, 'rateUsed = selected.rate;');
data = data.replace(/`ពន្ធ = តម្លៃ × \$\{rateUsed\}%`;/g, '`ពន្ធ = តម្លៃ × ${rateUsed * 100}%`;');
data = data.replace(/`៥. ពន្ធ = \$\{taxableAmount.toLocaleString\(\)\} × \$\{rateUsed\}% =/g, '`៥. ពន្ធ = ${taxableAmount.toLocaleString()} × ${rateUsed * 100}% =');
data = data.replace(/`៣. ពន្ធ = \$\{contractValue.toLocaleString\(\)\} × \$\{rateUsed\}% =/g, '`៣. ពន្ធ = ${contractValue.toLocaleString()} × ${rateUsed * 100}% =');

// tax_on_income
data = data.replace(/rateUsed = 20;/g, 'rateUsed = 0.20;');
data = data.replace(/rateUsed = 5;/g, 'rateUsed = 0.05;');
data = data.replace(/rateUsed = bracket.rate \* 100;/g, 'rateUsed = bracket.rate;');

// vat
data = data.replace(/rateUsed = 10;/g, 'rateUsed = 0.10;');

// specific_tax and withholding_tax
data = data.replace(/— អត្រា \$\{rateUsed\}%`/g, '— អត្រា ${rateUsed * 100}%`');
data = data.replace(/អត្រាពន្ធកាត់ទុក: \$\{rateUsed\}%`/g, 'អត្រាពន្ធកាត់ទុក: ${rateUsed * 100}%`');

// minimum_tax
data = data.replace(/rateUsed = 1;/g, 'rateUsed = 0.01;');

fs.writeFileSync(file, data);
