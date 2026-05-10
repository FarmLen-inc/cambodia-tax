"use client";

export default function ResultBox({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6 lg:mt-0">
      <h3 className="text-xl font-semibold text-slate-800 mb-6 border-b pb-4">Calculation Result</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2">
          <span className="text-slate-600 font-medium">Taxable Amount</span>
          <span className="text-lg font-semibold text-slate-800">{result.taxableAmount.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-slate-600 font-medium">Rate Applied</span>
          <span className="text-lg font-semibold text-slate-800">{result.rateUsed}%</span>
        </div>

        <div className="flex justify-between items-center py-4 border-t border-b border-indigo-100 bg-indigo-50/50 -mx-6 px-6">
          <span className="text-indigo-900 font-semibold text-lg">Final Tax Amount</span>
          <span className="text-2xl font-bold text-indigo-600">{result.taxAmount.toLocaleString()}</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg mt-6">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Formula Used:</h4>
          <p className="text-sm text-slate-600 font-mono mb-4">{result.formulaUsed}</p>

          <h4 className="text-sm font-semibold text-slate-700 mb-2">Step-by-Step Breakdown:</h4>
          <ul className="text-sm text-slate-600 space-y-2">
            {result.steps.map((step, idx) => (
              <li key={idx} className="flex"><span className="mr-2 text-indigo-500">•</span> {step}</li>
            ))}
          </ul>
        </div>
        
        <div className="text-xs text-slate-400 mt-4 italic text-center">
          Note: This app is for informational and educational purposes only. Rates may be unverified.
        </div>
      </div>
    </div>
  );
}
