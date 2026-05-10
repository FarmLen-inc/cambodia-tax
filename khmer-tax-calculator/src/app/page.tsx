import Link from "next/link";
import { taxes } from "../data/taxes";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Khmer Tax Calculator</h1>
          <p className="text-lg text-slate-600">Educational tool for calculating Cambodian taxes.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {taxes.map((tax) => (
            <Link key={tax.id} href={`/taxes/${tax.id}`} className="block group">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full transition-all duration-200 hover:shadow-md hover:border-indigo-300 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
                      {tax.category}
                    </span>
                    <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight mb-1">{tax.nameEn}</h2>
                    <h3 className="text-sm text-slate-500 font-medium">{tax.nameKm}</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{tax.summary}</p>
                </div>
                <div className="text-indigo-600 font-medium text-sm flex items-center">
                  Calculate Tax →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
