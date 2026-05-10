"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getTaxById } from "../../../data/taxes";
import { calculateTax } from "../../../utils/taxCalculators";
import CalculatorForm from "../../../components/CalculatorForm";
import ResultBox from "../../../components/ResultBox";
import { useState } from "react";

export default function TaxDetailPage({ params }) {
  const resolvedParams = use(params);
  const tax = getTaxById(resolvedParams.id);
  const [result, setResult] = useState(null);

  if (!tax) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Tax Not Found</h1>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">← Back to Overview</Link>
        </div>
      </div>
    );
  }

  const handleCalculate = (type, inputs) => {
    const calcResult = calculateTax(type, inputs);
    setResult(calcResult);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Overview
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {tax.category}
              </span>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{tax.nameEn}</h1>
              <h2 className="text-xl text-slate-600 font-medium">{tax.nameKm}</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-900">Summary</h3>
                <p>{tax.summary}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">Who Pays</h3>
                  <p>{tax.whoPays}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Tax Base</h3>
                  <p>{tax.taxBase}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-1">Formula</h3>
                <p className="font-mono text-sm text-indigo-700">{tax.formula}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Example</h3>
                <p className="text-sm italic text-slate-600">{tax.example}</p>
              </div>
              <div className="bg-amber-50 text-amber-800 p-4 rounded-lg text-sm">
                <p>{tax.notes}</p>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <CalculatorForm tax={tax} onCalculate={handleCalculate} />
            </div>
          </div>
        </div>

        {result && (
          <div className="max-w-2xl mx-auto">
            <ResultBox result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
