import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Zap, Timer, Tag, Globe, ChevronRight, GitCompareArrows, Heart } from "lucide-react";
import { BikeCanvas } from "./BikeScene";
import { hexToRgba } from "../utils/color";
export function Header({ lang, setLang, accent, t, onHome, onCompare, onGarage, garageCount }) {
  return (
    <header className="grid grid-cols-2 md:grid-cols-3 items-center px-5 sm:px-8 py-4 border-b border-black/[0.08] bg-[#f4f4f1]/85 backdrop-blur-xl shrink-0 relative z-20">
      <button type="button" onClick={onHome} className="flex items-center gap-2.5 text-left">
        <span
          className="w-2.5 h-2.5 rounded-full transition-colors duration-700"
          style={{ backgroundColor: accent, boxShadow: `0 0 14px ${accent}` }}
        />
        <span
          className={`text-black/70 ${
            lang === "th"
              ? "text-[13px] font-medium tracking-[0.015em]"
              : "text-[11px] sm:text-xs tracking-[0.28em] font-semibold"
          }`}
        >
          {t.brandLine}
        </span>
      </button>

      <div className="hidden md:flex items-center justify-center gap-2">
        <button onClick={onCompare} className="flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.035] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/55 hover:text-black"><GitCompareArrows size={13} />{lang === "th" ? "เปรียบเทียบ" : "Compare"}</button>
        <button onClick={onGarage} className="flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.035] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/55 hover:text-black"><Heart size={13} />{lang === "th" ? "โรงรถ" : "Garage"}{garageCount > 0 && <span>{garageCount}</span>}</button>
      </div>

      <button
        onClick={() => setLang(lang === "en" ? "th" : "en")}
        className="justify-self-end flex items-center gap-2 rounded-full border border-black/15 bg-white/55 px-3.5 py-2 text-xs font-medium text-black/70 hover:text-black hover:border-black/35 transition-colors active:scale-95"
        style={{ transition: "all 0.3s" }}
      >
        <Globe size={14} strokeWidth={2} />
        <span className="tracking-wide">{lang === "en" ? "TH" : "EN"}</span>
      </button>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  THUMBNAIL RAIL (vertical on desktop, horizontal on mobile)          */
/* ------------------------------------------------------------------ */

export function ThumbRail({ bikes, activeId, onSelect, lang, t }) {
  return (
    <nav
      className="
        flex md:flex-col gap-3 md:gap-4
        overflow-x-auto md:overflow-x-visible
        px-4 md:px-3 py-3 md:py-6
        md:w-20 lg:w-24 shrink-0
        border-t md:border-t-0 md:border-r border-black/10 bg-[#f4f4f1]/90
        order-3 md:order-1 relative z-20
      "
      aria-label={t.modelsLabel}
    >
      {bikes.map((bike) => {
        const active = bike.id === activeId;
        return (
          <button
            key={bike.id}
            onClick={() => onSelect(bike.id)}
            className="relative shrink-0 md:shrink flex flex-col items-center gap-2 group focus:outline-none"
          >
            <motion.div
              className="relative w-16 h-16 md:w-full md:h-14 lg:h-16 rounded-xl overflow-hidden bg-black/[0.035] border"
              animate={{
                borderColor: active ? bike.themeColor : "rgba(0,0,0,0.12)",
                scale: active ? 1 : 0.92,
              }}
              whileHover={{ scale: active ? 1 : 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-3">
              <img
                src={bike.logo}
                alt={`${bike.brand} logo`}
                className={`
                  w-full h-full object-contain
                  transition-all duration-300
                  ${active ? "opacity-100 scale-100" : "opacity-40 scale-90 group-hover:opacity-80"}
                  `}
                />
              </div>
              {active && (
                <motion.span
                  layoutId="thumb-glow"
                  className="absolute inset-0"
                  style={{ boxShadow: `inset 0 0 22px ${hexToRgba(bike.themeColor, 0.55)}` }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.div>
            <span
              className={`text-[9px] md:text-[10px] tracking-wide leading-tight text-center max-w-[64px] md:max-w-none transition-colors duration-300 ${
                active ? "text-black" : "text-black/40 group-hover:text-black/70"
              }`}
            >
              {bike.name[lang]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  SPEC READOUT                                                        */
/* ------------------------------------------------------------------ */

function SpecItem({ icon: Icon, label, value, accent, unitless }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-[92px]">
      <div className="flex items-center gap-1.5 text-black/45">
        <Icon size={13} strokeWidth={2} style={{ color: accent }} />
        <span className="text-[10px] uppercase tracking-[0.14em]">{label}</span>
      </div>
      <span className="text-xl sm:text-2xl font-semibold text-[#111214] tabular-nums leading-none">
        {value}
        {!unitless && <span className="text-xs text-black/40 ml-1 font-normal" />}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN VIEWER — 3D canvas background + pointer-events-safe overlay   */
/* ------------------------------------------------------------------ */

export function BikeViewer({ bike, lang, t }) {
  const accent = bike.themeColor;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
  }, [bike.id]);

  const toggleEngineSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [isPlaying]);

  return (
    <div className="relative flex-1 overflow-hidden bg-[#f4f4f1] order-1 md:order-2">
      {bike.audio && (
        <audio
          ref={audioRef}
          src={bike.audio}
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= 30) {
              event.currentTarget.pause();
              event.currentTarget.currentTime = 0;
              setIsPlaying(false);
            }
          }}
        />
      )}
      <div className="showroom-shader pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <span
          className="showroom-shader__orb showroom-shader__orb--primary"
          style={{ "--shader-accent": hexToRgba(accent, 0.24) }}
        />
        <span
          className="showroom-shader__orb showroom-shader__orb--secondary"
          style={{ "--shader-accent": hexToRgba(accent, 0.14) }}
        />
        <span className="showroom-shader__veil" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 78%)",
        }}
      />
      <div className="pointer-events-none absolute left-[57%] top-0 z-0 h-[72%] w-px bg-gradient-to-b from-transparent via-black/10 to-transparent" />
      {/* ambient color wash, tied to theme color, sits above the canvas but below text */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] transition-all duration-700"
        style={{
          background: `radial-gradient(60% 55% at 60% 40%, ${hexToRgba(accent, 0.11)} 0%, rgba(255,255,255,0) 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 right-0 h-64 blur-3xl opacity-[0.12] z-[5] transition-colors duration-700"
        style={{ backgroundColor: accent }}
      />

      {/* 3D canvas — fills the whole viewer, receives drag/scroll for OrbitControls */}
      <div className="absolute inset-0 z-0">
        <BikeCanvas
          bike={bike}
          isPlaying={isPlaying}
          onToggleEngine={toggleEngineSound}
        />
      </div>

      {/* text + specs overlay — pointer-events-none so drags pass through to the canvas,
          re-enabled only on the CTA button */}
      <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
        <div className="px-5 sm:px-10 pt-6 sm:pt-8">
          <div>
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] tracking-[0.24em] text-black/40 uppercase">
            <span className="w-6 h-px transition-colors duration-500" style={{ backgroundColor: accent }} />
            {t.heroKicker}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={bike.id + "-title"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className="mt-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">{bike.brand}</p>
              <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.045em] text-[#111214] leading-[1.02]">
                {bike.name[lang]}
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-semibold tracking-wide" style={{ color: accent }}>
                {bike.tag[lang]}
              </p>
            </motion.div>
          </AnimatePresence>
          </div>
        </div>

        {/* drag hint, floats mid-right, ignored by pointer events */}
        <div className="flex items-center justify-end gap-4 px-5 sm:px-10">
          <div className="hidden sm:flex flex-col items-end gap-1 text-[9px] tracking-wide uppercase">
            <span className="text-black/35">{t.dragHint}</span>
            <span style={{ color: hexToRgba(accent, 0.72) }}>{t.engineHint}</span>
          </div>
        </div>

        <div className="mx-5 sm:mx-10 mb-5 sm:mb-8 rounded-2xl border border-black/[0.08] bg-white/[0.82] p-4 sm:p-5 shadow-[0_24px_70px_rgba(0,0,0,0.13)] backdrop-blur-2xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={bike.id + "-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-xs sm:text-sm text-black/60 max-w-xl leading-relaxed mb-4"
            >
              {bike.desc[lang]}
            </motion.p>
          </AnimatePresence>

          <div className="flex flex-wrap items-end justify-between gap-5 border-t border-black/[0.08] pt-4">
            <div className="flex flex-wrap gap-x-7 gap-y-4">
              <SpecItem icon={Gauge} label={t.specs.engine} value={bike.specs.engine} accent={accent} unitless />
              <SpecItem icon={Zap} label={t.specs.power} value={bike.specs.power} accent={accent} />
              <SpecItem icon={Timer} label={t.specs.topSpeed} value={bike.specs.topSpeed} accent={accent} />
              <SpecItem icon={Tag} label={t.specs.price} value={bike.specs.price} accent={accent} unitless />
            </div>

            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="pointer-events-auto flex items-center gap-2 rounded-full border px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-black shrink-0 transition-all duration-500"
              style={{ backgroundColor: accent, borderColor: hexToRgba(accent, 0.75), boxShadow: `0 8px 30px ${hexToRgba(accent, 0.18)}` }}
            >
              {t.cta}
              <ChevronRight size={16} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */
