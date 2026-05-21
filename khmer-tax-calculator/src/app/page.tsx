"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { taxes } from "../data/taxes";

const TAX_ICONS: Record<string, string> = {
  house_land_rent: "real_estate_agent",
  unused_land: "landscape",
  immovable_property: "domain",
};

const CATEGORY_LABELS: Record<string, { km: string; en: string; style: string; icon: string }> = {
  "National Tax": {
    km: "ថ្នាក់ជាតិ",
    en: "National",
    style: "bg-error-container text-on-error-container",
    icon: "public",
  },
  "Sub-National Tax": {
    km: "ថ្នាក់ក្រោមជាតិ",
    en: "Sub-National",
    style: "bg-surface-variant text-on-surface-variant border border-outline-variant",
    icon: "map",
  },
};

export default function Home() {
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (category: string) =>
    setFilter((prev) => (prev === category ? null : category));

  const visibleTaxes = taxes.filter((t) => {
    const matchCategory = filter ? t.category === filter : true;
    const searchString = searchQuery.toLowerCase();
    const matchSearch =
      !searchQuery ||
      t.nameKm.toLowerCase().includes(searchString) ||
      t.nameEn.toLowerCase().includes(searchString) ||
      t.summary.toLowerCase().includes(searchString);
    return matchCategory && matchSearch;
  });

  return (
    <div className="antialiased flex flex-col min-h-screen">
      {/* TopAppBar */}
      <header className="bg-surface shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-7xl mx-auto">
          <div className="hidden md:flex flex-1 justify-center">
            <div className="relative w-full" style={{ maxWidth: 600 }}>
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                className="w-full bg-surface-container-high text-on-surface placeholder:text-outline rounded-full py-3 pl-12 pr-4 border-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all font-body-md text-body-md shadow-inner"
                placeholder="ស្វែងរក..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-6 mr-4">
              <button onClick={() => toggle("National Tax")} className={`font-label-md text-label-md transition-colors ${filter === "National Tax" ? "text-secondary underline underline-offset-4" : "text-primary hover:text-secondary"}`}>ថ្នាក់ជាតិ</button>
              <button onClick={() => toggle("Sub-National Tax")} className={`font-label-md text-label-md transition-colors ${filter === "Sub-National Tax" ? "text-secondary underline underline-offset-4" : "text-primary hover:text-secondary"}`}>ថ្នាក់ក្រោមជាតិ</button>
            </div>
            <button aria-label="Account" className="p-2 rounded-full hover:bg-surface-variant transition-colors text-primary" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col gap-12">
        {/* Hero Section */}
        <section className="relative rounded-xl overflow-hidden glass-card shadow-[0_8px_32px_rgba(0,6,102,0.08)] border-2 border-surface-container-lowest/50 p-8 md:p-16 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 z-10 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-surface-variant w-fit">
              <span className="material-symbols-outlined text-secondary text-sm">school</span>
              <span className="font-label-md text-label-md text-secondary">សម្រាប់គោលបំណងអប់រំប៉ុណ្ណោះ</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-gradient leading-tight">
              ប្រព័ន្ធគណនាពន្ធកម្ពុជា
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              ស្វែងយល់ពីរបៀបគណនាពន្ធផ្សេងៗនៅកម្ពុជា តាមរយៈឧបករណ៍គណនាដែលងាយស្រួលប្រើ និងមានភាពត្រឹមត្រូវ។ ឧបករណ៍នេះបង្កើតឡើងសម្រាប់ជាជំនួយស្មារតី និងការសិក្សាតែប៉ុណ្ណោះ។
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="#calculators"
                className="bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded-full hover:bg-primary-container shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                ចាប់ផ្តើមគណនា
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-inner border border-surface-container-lowest">
            <Image
              src="/hero-image.png"
              alt="Financial background"
              fill
              className="object-cover opacity-80 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-surface/80 to-transparent" />
          </div>
        </section>

        {/* Calculators Grid */}
        <section id="calculators" className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-background flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary bg-surface-container-high p-2 rounded-full">calculate</span>
              ឧបករណ៍គណនាពន្ធ
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTaxes.length === 0 ? (
              <div className="col-span-full py-12 text-center text-on-surface-variant font-body-md">
                រកមិនឃើញពន្ធដែលអ្នកស្វែងរកទេ!
              </div>
            ) : (
              visibleTaxes.map((tax) => {
                const cat = CATEGORY_LABELS[tax.category] ?? CATEGORY_LABELS["Sub-National Tax"];
                const icon = TAX_ICONS[tax.id] ?? "calculate";
                const accentColor = tax.category === "National Tax" ? "bg-primary" : "bg-secondary";
              const btnColor = tax.category === "National Tax"
                ? "text-primary hover:bg-primary hover:text-on-primary"
                : "text-secondary hover:bg-secondary hover:text-on-secondary";
              const iconColor = tax.category === "National Tax" ? "text-primary" : "text-secondary";

              return (
                <article
                  key={tax.id}
                  className="bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-surface-container-high flex flex-col h-full group relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 bg-surface-container-low ${iconColor} rounded-full group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-label-md text-[12px] flex items-center gap-1 ${cat.style}`}>
                      <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
                      {cat.km}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-headline-md text-headline-md text-on-background mb-2">{tax.nameKm}</h3>
                    <p className="font-body-md text-body-md text-outline text-sm line-clamp-2">{tax.summary}</p>
                  </div>
                  <Link
                    href={`/taxes/${tax.id}`}
                    className={`mt-6 w-full bg-surface-container-high font-label-md text-label-md py-3 rounded-full transition-colors flex items-center justify-center gap-2 ${btnColor}`}
                  >
                    <span className="material-symbols-outlined text-sm">calculate</span>
                    គណនាពន្ធ
                  </Link>
                </article>
              );
            })
          )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-tertiary w-full mt-auto">
        <div className="w-full px-margin-mobile md:px-margin-desktop flex flex-col items-center gap-base max-w-7xl mx-auto justify-center py-6">
          <div className="flex flex-col md:flex-row items-center md:justify-between w-full gap-4 md:gap-8">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-headline-md font-headline-md text-on-tertiary font-black">ប្រព័ន្ធគណនាពន្ធ</span>
              <p className="font-body-md text-body-md text-tertiary-fixed-dim text-sm">
                រក្សាសិទ្ធិគ្រប់យ៉ាង © ២០២៦ ប្រព័ន្ធគណនាពន្ធកម្ពុជា។
              </p>
            </div>
            <div className="max-w-xs md:text-right">
              <p className="font-body-md text-body-md text-tertiary-fixed-dim text-xs opacity-70 whitespace-nowrap">
                ឧបករណ៍គណនាពន្ធអប់រំសម្រាប់ប្រទេសកម្ពុជា។ មិនមែនជាដំបូន្មានផ្នែកច្បាប់ទេ។
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Nav Bar (Mobile Only) */}
      <nav className="md:hidden bg-surface-container-lowest fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-gutter shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-lg">
        <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 scale-90 transition-transform duration-150">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-label-md text-label-md text-[10px] mt-1">ទំព័រដើម</span>
        </button>
        <button className="flex flex-col items-center justify-center text-outline px-4 py-1 hover:bg-surface-variant rounded-full">
          <span className="material-symbols-outlined">calculate</span>
          <span className="font-label-md text-label-md text-[10px] mt-1">ឧបករណ៍គណនា</span>
        </button>
        <button className="flex flex-col items-center justify-center text-outline px-4 py-1 hover:bg-surface-variant rounded-full">
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-md text-label-md text-[10px] mt-1">ប្រវត្តិ</span>
        </button>
        <button className="flex flex-col items-center justify-center text-outline px-4 py-1 hover:bg-surface-variant rounded-full">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-label-md text-[10px] mt-1">គណនី</span>
        </button>
      </nav>
    </div>
  );
}
