"use client";

export default function ResultBox({ result, onReset }) {
  if (!result) return null;

  const fmt = (n) => Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 });
  const isUSD = result.inputCurrency === "USD";
  const rate = result.exchangeRate || 4000;

  const displayAmt = (v) => isUSD ? `$${fmt(Number(v) / rate)}` : `${fmt(v)} ៛`;
  const subAmt = (v) => isUSD ? `(~ ${fmt(v)} ៛)` : "";

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-2">
          លទ្ធផលនៃការគណនាពន្ធ
        </h1>
        <p className="text-on-surface-variant font-body-md text-body-md">
          របាយការណ៍សង្ខេបអំពីកាតព្វកិច្ចពន្ធរបស់អ្នកសម្រាប់ការគណនានេះ
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Hero Card — Total Tax */}
        <div className="md:col-span-12 lg:col-span-7 bg-primary-container text-on-primary-container p-8 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[280px]">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-secondary rounded-full opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-on-primary-container rounded-full opacity-5 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <span className="font-label-md text-label-md text-on-primary-container/80 uppercase tracking-wider block mb-2">
              ពន្ធសរុបដែលត្រូវបង់
            </span>
            <div className="flex items-baseline gap-4 flex-wrap">
              <span className="font-headline-lg text-5xl md:text-6xl text-white">
                {displayAmt(result.taxAmount)}
              </span>
              {isUSD && (
                <span className="font-headline-md text-2xl text-white/80">
                  {subAmt(result.taxAmount)}
                </span>
              )}
            </div>
            <div className="mt-6 flex items-center gap-2 bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="font-label-md text-label-md">
                {result.rateUsed > 0 ? `គណនាតាមអត្រាពន្ធ ${result.rateUsed}%` : "ថ្លៃថេរប្រចាំឆ្នាំ"}
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="md:col-span-12 lg:col-span-5 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <h3 className="font-headline-md text-headline-md text-primary mb-6">
            ព័ត៌មានលម្អិត
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
              <span className="text-on-surface-variant font-body-md text-body-md">
                មូលដ្ឋានគណនា
              </span>
              <span className="font-bold text-on-surface text-right">
                {displayAmt(result.taxableAmount)} <br className="md:hidden" />
                {isUSD && <span className="font-normal text-sm text-on-surface-variant ml-2">{subAmt(result.taxableAmount)}</span>}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
              <span className="text-on-surface-variant font-body-md text-body-md">
                ពន្ធដែលត្រូវបង់
              </span>
              <span className="font-bold text-primary text-right">
                {displayAmt(result.taxAmount)} <br className="md:hidden" />
                {isUSD && <span className="font-normal text-sm text-primary/70 ml-2">{subAmt(result.taxAmount)}</span>}
              </span>
            </div>
            {result.rateUsed > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-body-md text-body-md">
                  អត្រាពន្ធ
                </span>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md text-label-md">
                  {result.rateUsed}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="md:col-span-12 flex flex-col md:flex-row gap-4 justify-center mt-2">
          <button
            className="flex items-center justify-center gap-2 bg-primary text-on-primary px-10 py-4 rounded-full font-label-md text-label-md hover:bg-primary-container transition-all shadow-md active:scale-95 group"
            onClick={() => window.print()}
          >
            <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">download</span>
            ទាញយកជា PDF
          </button>
          {onReset && (
            <button
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-10 py-4 rounded-full font-label-md text-label-md hover:bg-primary-fixed transition-all active:scale-95"
              onClick={onReset}
            >
              <span className="material-symbols-outlined">restart_alt</span>
              គណនាឡើងវិញ
            </button>
          )}
        </div>

      </div>

      {/* Disclaimer */}
      <div className="mt-10 bg-surface-container-low p-6 rounded-xl border-l-4 border-primary flex items-start gap-4">
        <span
          className="material-symbols-outlined text-primary flex-shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          info
        </span>
        <div>
          <h4 className="font-label-md text-label-md text-primary mb-1">បញ្ជាក់</h4>
          <p className="text-sm text-on-surface-variant leading-relaxed font-body-md">
            ការគណនានេះគឺសម្រាប់ជាឯកសារយោងតែប៉ុណ្ណោះ។ លទ្ធផលពិតប្រាកដអាចមានការប្រែប្រួលផ្អែកលើបទប្បញ្ញត្តិពន្ធដារចុងក្រោយ និងលក្ខខណ្ឌជាក់ស្តែងរបស់អ្នក។ សូមពិគ្រោះជាមួយអ្នកជំនាញពន្ធដារសម្រាប់ព័ត៌មានផ្លូវការ។
          </p>
        </div>
      </div>
    </div>
  );
}
