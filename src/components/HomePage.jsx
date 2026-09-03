import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronRight } from "lucide-react";
import { BIKES, HOME_COPY } from "../data/showroom";
import { hexToRgba } from "../utils/color";
export default function HomePage({ lang, setLang, onEnter }) {
  const copy = HOME_COPY[lang];
  const [selectedBikeId, setSelectedBikeId] = useState(BIKES[0].id);
  const selectedBike = BIKES.find((bike) => bike.id === selectedBikeId) ?? BIKES[0];
  const accent = selectedBike.themeColor;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSelectedBikeId((currentId) => {
        const currentIndex = BIKES.findIndex((bike) => bike.id === currentId);
        return BIKES[(currentIndex + 1) % BIKES.length].id;
      });
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-[#f4f4f1] text-[#111214]"
      style={{ fontFamily: lang === "th" ? '"IBM Plex Sans Thai", "Leelawadee UI", sans-serif' : undefined }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.985, filter: "blur(7px)" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -right-32 top-14 h-[620px] w-[620px] rounded-full blur-[120px]"
        animate={{ backgroundColor: hexToRgba(accent, 0.11) }}
        transition={{ duration: 0.8 }}
      />

      <header className="relative z-20 grid grid-cols-2 items-center border-b border-black/[0.07] bg-white/20 px-5 py-4 backdrop-blur-md sm:px-8 md:grid-cols-3">
        <div className="flex items-center gap-2.5">
          <motion.span
            className="h-2.5 w-2.5 rounded-full"
            animate={{ backgroundColor: accent, boxShadow: `0 0 16px ${hexToRgba(accent, 0.58)}` }}
          />
          <span className="text-[11px] font-bold tracking-[0.28em]">BIGBIKE SHOWROOM</span>
        </div>
        <div className="hidden justify-self-center text-[8px] font-semibold uppercase tracking-[0.25em] text-black/30 md:block">
          Curated interactive motorcycles
        </div>
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "th" : "en")}
          className="justify-self-end flex items-center gap-2 rounded-full border border-black/15 bg-white/55 px-3.5 py-2 text-xs font-semibold text-black/70 backdrop-blur-md transition hover:border-black/35 hover:text-black"
        >
          <Globe size={14} />
          {lang === "en" ? "TH" : "EN"}
        </button>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-69px)] max-w-[1540px] grid-cols-1 items-center gap-10 px-5 py-10 sm:px-10 lg:grid-cols-[0.86fr_1.14fr] lg:px-16 xl:gap-16">
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-black/40">
            <motion.span className="h-px w-10" animate={{ backgroundColor: accent }} />
            {copy.eyebrow}
          </div>
          <h1
            className={`mt-6 text-5xl sm:text-6xl xl:text-7xl ${
              lang === "th"
                ? "font-medium leading-[1.14] tracking-[-0.025em]"
                : "font-semibold leading-[0.98] tracking-[-0.055em]"
            }`}
          >
            {copy.titleTop}
            <motion.span className="mt-2 block" animate={{ color: accent }} transition={{ duration: 0.6 }}>
              {copy.titleAccent}
            </motion.span>
          </h1>
          <p className={`mt-7 max-w-xl text-sm text-black/58 sm:text-base ${lang === "th" ? "font-light leading-8" : "leading-7"}`}>
            {copy.description}
          </p>

          <div className="mt-9 grid max-w-xl grid-cols-3 border-y border-black/10 py-4">
            {copy.features.map((feature, index) => (
              <div key={feature} className={`px-3 first:pl-0 ${index > 0 ? "border-l border-black/10" : ""}`}>
                <span className="block text-[8px] font-semibold tracking-[0.18em] text-black/25">0{index + 1}</span>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.11em] text-black/55">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <motion.button
              type="button"
              onClick={onEnter}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-full bg-[#111214] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
            >
              <motion.span className="h-1.5 w-1.5 rounded-full" animate={{ backgroundColor: accent }} />
              {copy.enter}
              <ChevronRight size={17} />
            </motion.button>
            <span className="text-[9px] uppercase tracking-[0.13em] text-black/35">{copy.hint}</span>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="relative min-h-[400px] lg:min-h-[620px]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-black/[0.09] bg-[#111214] shadow-[0_35px_90px_rgba(0,0,0,0.22)]">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:58px_58px]" />
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedBike.id}
                src={selectedBike.homeImage}
                alt={`${selectedBike.brand} superbike studio render`}
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
            <div className="pointer-events-none absolute left-7 top-6 text-white">
              <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/45">{selectedBike.brand}</p>
              <p className="mt-1 text-sm font-semibold tracking-wide">{selectedBike.name[lang]}</p>
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/45 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">{copy.collection}</p>
                <span className="text-[8px] uppercase tracking-[0.16em] text-white/25">Select a machine</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                {BIKES.map((bike) => (
                  <button
                    type="button"
                    key={bike.id}
                    onClick={() => setSelectedBikeId(bike.id)}
                    className="flex h-12 flex-1 items-center justify-center rounded-xl border bg-white/[0.04] p-2.5 transition-all duration-300 hover:bg-white/[0.08]"
                    style={{
                      borderColor: selectedBike.id === bike.id ? bike.themeColor : "rgba(255,255,255,0.1)",
                      boxShadow: selectedBike.id === bike.id ? `inset 0 0 18px ${hexToRgba(bike.themeColor, 0.24)}` : "none",
                    }}
                    aria-label={`Show ${bike.brand}`}
                  >
                    <img src={bike.logo} alt={bike.brand} className="h-full w-full object-contain opacity-75" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}
