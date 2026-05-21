"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateTax } from "../../../utils/taxCalculators";
import CalculatorForm from "../../../components/CalculatorForm";
import ResultBox from "../../../components/ResultBox";

export default function TaxDetailClient({ tax }) {
  const [result, setResult] = useState(null);

  if (!tax) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="font-headline-md text-headline-md text-on-background mb-4">រកមិនឃើញពន្ធ</h1>
          <Link href="/" className="text-primary hover:text-secondary font-label-md text-label-md">← ត្រឡប់ទៅទំព័រដើម</Link>
        </div>
      </div>
    );
  }

  const handleCalculate = (type, inputs) => {
    const calcResult = calculateTax(type, inputs);
    setResult(calcResult);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-primary hover:text-secondary font-label-md text-label-md transition-colors mb-8">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          ត្រឡប់ទៅទំព័រដើម
        </Link>

        {!result ? (
          <CalculatorForm tax={tax} onCalculate={handleCalculate} />
        ) : (
          <ResultBox result={result} onReset={() => setResult(null)} />
        )}
      </div>
    </div>
  );
}
