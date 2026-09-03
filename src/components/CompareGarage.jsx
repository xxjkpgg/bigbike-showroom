import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Gauge, Heart, Tag, Timer, Zap } from "lucide-react";
import { BIKES } from "../data/showroom";

const PAGE_COPY = {
  th: {
    compare: "เปรียบเทียบรถ",
    compareLead: "วางสเปกของซูเปอร์ไบค์สองคันไว้ข้างกัน แล้วเลือกรถที่ตรงกับสไตล์คุณ",
    garage: "โรงรถของฉัน",
    garageLead: "บันทึกรถที่สนใจไว้ในพื้นที่ส่วนตัว เพื่อกลับมาเปรียบเทียบภายหลัง",
    first: "รถคันที่หนึ่ง",
    second: "รถคันที่สอง",
    empty: "ยังไม่มีรถในโรงรถ",
    emptyHint: "เลือกรถจากรายการด้านล่างเพื่อเริ่มสร้างคอลเลกชัน",
    add: "เพิ่มเข้าโรงรถ",
    remove: "นำออก",
    saved: "บันทึกแล้ว",
    back: "กลับสู่โชว์รูม",
    labels: { engine: "เครื่องยนต์", power: "แรงม้า", topSpeed: "ความเร็วสูงสุด", price: "ราคา" },
  },
  en: {
    compare: "Compare machines",
    compareLead: "Put two superbikes side by side and find the machine that fits your riding style.",
    garage: "My garage",
    garageLead: "Save the machines that matter and return to compare them whenever you like.",
    first: "First machine",
    second: "Second machine",
    empty: "Your garage is empty",
    emptyHint: "Choose a machine below to begin your collection.",
    add: "Add to garage",
    remove: "Remove",
    saved: "Saved",
    back: "Back to showroom",
    labels: { engine: "Engine", power: "Power", topSpeed: "Top speed", price: "Price" },
  },
};

const specs = [
  ["engine", Gauge],
  ["power", Zap],
  ["topSpeed", Timer],
  ["price", Tag],
];

function PageShell({ lang, title, lead, onBack, children }) {
  const copy = PAGE_COPY[lang];
  return (
    <motion.main
      className="min-h-screen bg-[#f4f4f1] px-5 py-6 text-[#111214] sm:px-10 lg:px-16"
      style={{ fontFamily: lang === "th" ? '"IBM Plex Sans Thai", sans-serif' : undefined }}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
    >
      <div className="mx-auto max-w-7xl">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-semibold text-black/45 transition hover:text-black">
          <ArrowLeft size={15} /> {copy.back}
        </button>
        <div className="mt-12 max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/35">BIGBIKE SHOWROOM</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-black/50 sm:text-base">{lead}</p>
        </div>
        {children}
      </div>
    </motion.main>
  );
}

function BikeSelect({ value, onChange, label }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/35">
        {BIKES.map((bike) => <option key={bike.id} value={bike.id}>{bike.brand} · {bike.name.en}</option>)}
      </select>
    </label>
  );
}

function CompareCard({ bike, lang, labels, winnerBySpec }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-black/[0.08] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
      <div className="relative h-48 overflow-hidden bg-[#111214] sm:h-64">
        <img src={bike.homeImage} alt={bike.name[lang]} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-5 left-5 text-white"><p className="text-[9px] uppercase tracking-[0.2em] text-white/55">{bike.brand}</p><h2 className="mt-1 text-2xl font-semibold">{bike.name[lang]}</h2></div>
      </div>
      <div className="divide-y divide-black/[0.07] p-5 sm:p-7">
        {specs.map(([key, Icon]) => (
          <div key={key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <span className="flex items-center gap-2 text-xs text-black/45"><Icon size={15} style={{ color: bike.themeColor }} />{labels[key]}</span>
            <span className="flex items-center gap-2 text-base font-semibold">{bike.specs[key]}{winnerBySpec[key] === bike.id && <Check size={15} className="text-emerald-600" />}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ComparisonChart({ left, right, lang }) {
  const rows = [
    { key: "power", label: lang === "th" ? "แรงม้า" : "Power", unit: "hp" },
    { key: "topSpeed", label: lang === "th" ? "ความเร็วสูงสุด" : "Top speed", unit: "km/h" },
    { key: "price", label: lang === "th" ? "ราคา" : "Price", unit: "THB" },
  ];
  const number = (value) => Number(String(value).replace(/[^0-9.]/g, ""));

  return (
    <section className="mt-6 rounded-[1.5rem] border border-black/[0.08] bg-white p-4 shadow-[0_16px_45px_rgba(0,0,0,.05)] sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">Performance overview</p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em]">{lang === "th" ? "ภาพรวมสมรรถนะ" : "Performance at a glance"}</h2>
        </div>
        <div className="flex flex-wrap gap-4 text-[10px] font-semibold text-black/55">
          {[left, right].map((bike) => <span key={bike.id} className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: bike.themeColor }} />{bike.name[lang]}</span>)}
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {rows.map((row) => {
          const leftValue = number(left.specs[row.key]);
          const rightValue = number(right.specs[row.key]);
          const max = Math.max(leftValue, rightValue, 1);
          return (
            <div key={row.key}>
              <div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-semibold text-black/55">{row.label}</span><span className="text-[8px] uppercase tracking-[0.16em] text-black/30">{row.unit}</span></div>
              <div className="space-y-2">
                {[{ bike: left, value: leftValue }, { bike: right, value: rightValue }].map(({ bike, value }) => (
                  <div key={bike.id} className="grid grid-cols-[74px_1fr_86px] items-center gap-3 sm:grid-cols-[120px_1fr_110px]">
                    <span className="truncate text-[10px] font-semibold text-black/45">{bike.brand}</span>
                    <div className="h-2 overflow-hidden rounded-full bg-black/[0.055]">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: bike.themeColor }} initial={{ width: 0 }} animate={{ width: `${Math.max((value / max) * 100, 3)}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
                    </div>
                    <span className="text-right text-xs font-bold tabular-nums">{bike.specs[row.key]}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ComparePage({ lang, onBack }) {
  const copy = PAGE_COPY[lang];
  const [leftId, setLeftId] = useState(BIKES[0].id);
  const [rightId, setRightId] = useState(BIKES[1].id);
  const left = BIKES.find((bike) => bike.id === leftId) ?? BIKES[0];
  const right = BIKES.find((bike) => bike.id === rightId) ?? BIKES[1];
  const winnerBySpec = useMemo(() => {
    const number = (value) => Number(String(value).replace(/[^0-9.]/g, ""));
    return {
      power: number(left.specs.power) >= number(right.specs.power) ? left.id : right.id,
      topSpeed: number(left.specs.topSpeed) >= number(right.specs.topSpeed) ? left.id : right.id,
    };
  }, [left, right]);
  return <PageShell lang={lang} title={copy.compare} lead={copy.compareLead} onBack={onBack}>
    <div className="mt-10 grid gap-4 rounded-2xl border border-black/[0.08] bg-white/55 p-4 sm:grid-cols-2 sm:p-5">
      <BikeSelect value={leftId} onChange={setLeftId} label={copy.first} />
      <BikeSelect value={rightId} onChange={setRightId} label={copy.second} />
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-2"><CompareCard bike={left} lang={lang} labels={copy.labels} winnerBySpec={winnerBySpec} /><CompareCard bike={right} lang={lang} labels={copy.labels} winnerBySpec={winnerBySpec} /></div>
    <ComparisonChart left={left} right={right} lang={lang} />
  </PageShell>;
}

export function GaragePage({ lang, favorites, onToggle, onBack }) {
  const copy = PAGE_COPY[lang];
  const saved = BIKES.filter((bike) => favorites.includes(bike.id));
  return <PageShell lang={lang} title={copy.garage} lead={copy.garageLead} onBack={onBack}>
    {saved.length === 0 && <div className="mt-10 rounded-[2rem] border border-dashed border-black/15 bg-white/45 px-6 py-12 text-center"><Heart className="mx-auto text-black/20" /><h2 className="mt-4 text-xl font-semibold">{copy.empty}</h2><p className="mt-2 text-sm text-black/40">{copy.emptyHint}</p></div>}
    <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {BIKES.map((bike) => {
        const active = favorites.includes(bike.id);
        return <article key={bike.id} className={`overflow-hidden rounded-3xl border bg-white transition ${active ? "border-black/15 shadow-[0_20px_55px_rgba(0,0,0,.09)]" : "border-black/[0.07] opacity-70"}`}>
          <div className="h-44 bg-[#111214]"><img src={bike.homeImage} alt={bike.name[lang]} className="h-full w-full object-cover" /></div>
          <div className="p-5"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">{bike.brand}</p><h2 className="mt-1 text-xl font-semibold">{bike.name[lang]}</h2><p className="mt-2 text-xs text-black/45">{bike.specs.power} hp · {bike.specs.topSpeed} km/h</p>
            <button onClick={() => onToggle(bike.id)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition" style={{ borderColor: active ? bike.themeColor : "rgba(0,0,0,.14)", color: active ? bike.themeColor : "#111214" }}><Heart size={14} fill={active ? "currentColor" : "none"} />{active ? copy.remove : copy.add}</button>
          </div>
        </article>;
      })}
    </div>
  </PageShell>;
}
