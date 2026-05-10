import Link from "next/link"
import { Calculator, BookOpen, Landmark } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <Landmark size={16} />
            Cambodian Tax Learning App
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Understand and calculate Cambodian taxes easily.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            A simple educational web application that explains national and
            sub-national taxes with clear summaries, formulas, and calculators.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-medium text-white shadow-sm hover:bg-blue-800"
            >
              <Calculator size={18} />
              Start Calculating
            </Link>

            <Link
              href="/taxes"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3 font-medium text-blue-700 hover:bg-blue-50"
            >
              <BookOpen size={18} />
              Explore Taxes
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Calculator Preview</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Tax on Salary
            </h2>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Monthly Salary</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  1,500,000 KHR
                </p>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm text-blue-700">Estimated Tax</p>
                <p className="mt-1 text-2xl font-bold text-blue-900">
                  0 KHR
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 