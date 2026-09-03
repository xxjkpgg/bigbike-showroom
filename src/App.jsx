import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BIKES, STRINGS } from "./data/showroom";
import HomePage from "./components/HomePage";
import { BikeViewer, Header, ThumbRail } from "./components/ShowroomUI";
import { ComparePage, GaragePage } from "./components/CompareGarage";

export default function BigBikeShowroom() {
  const [lang, setLang] = useState("th");
  const [activeId, setActiveId] = useState(BIKES[0].id);
  const [screen, setScreen] = useState("home");
  const [favorites, setFavorites] = useState([]);

  const activeBike = useMemo(() => BIKES.find((bike) => bike.id === activeId) ?? BIKES[0], [activeId]);
  const t = STRINGS[lang];
  const handleSelect = useCallback((id) => setActiveId(id), []);
  const toggleFavorite = useCallback((id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]), []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <AnimatePresence mode="wait">
      {screen === "home" ? (
        <HomePage key="home" lang={lang} setLang={setLang} onEnter={() => setScreen("showroom")} />
      ) : screen === "compare" ? (
        <ComparePage key="compare" lang={lang} onBack={() => setScreen("showroom")} />
      ) : screen === "garage" ? (
        <GaragePage key="garage" lang={lang} favorites={favorites} onToggle={toggleFavorite} onBack={() => setScreen("showroom")} />
      ) : (
        <motion.div
          key="showroom"
          className="w-full h-screen min-h-[640px] bg-[#f4f4f1] text-[#111214] flex flex-col font-sans overflow-hidden"
          style={{ fontFamily: lang === "th" ? '"IBM Plex Sans Thai", "Leelawadee UI", sans-serif' : undefined }}
          initial={{ opacity: 0, scale: 1.012, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.008, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Header lang={lang} setLang={setLang} accent={activeBike.themeColor} t={t} onHome={() => setScreen("home")} onCompare={() => setScreen("compare")} onGarage={() => setScreen("garage")} garageCount={favorites.length} />
          <div className="flex-1 flex flex-col md:flex-row min-h-0">
            <ThumbRail bikes={BIKES} activeId={activeId} onSelect={handleSelect} lang={lang} t={t} />
            <BikeViewer bike={activeBike} lang={lang} t={t} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
