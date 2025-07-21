// Intro.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SlideToEnter from "./SlideToEnter";
import ScrollIntro from "./ScrollIntro";
import "./Intro.scss";
import { useLibraryStore } from "../../../context/LibraryContext";

export const SECTIONS = {
  en: [
    `Hello and welcome to Nadav Landesman’s portfolio!\n` +
      `I’m a Full‑Stack Developer passionate about building end‑to‑end solutions.\n` +
      `On this site you’ll find a simple CRUD application.`,
    `If you’d like to skip this introduction, feel free to use the main menu at the top.\n` +
      `Otherwise, sit back and enjoy the interactive presentation.`,
    `Here you can experience a dynamic background that responds to your cursor movements.\n` +
      `You can toggle the animations or disable the background entirely\n` +
      `using the dedicated buttons in the menu.`,
    `Did you notice that the cursor and animations change colors in sync?\n\n` +
      `Did you notice that with every mouse movement the background changes speed?`,
    `NOW YOU ARE READY TO DIVE IN!\n\n` +
      `Slide to enter and explore the application.\n\n` +
      `Enjoy!`,
  ],
  it: [
    `Ciao e benvenuto nel portfolio di Nadav Landesman!\n` +
      `Sono uno sviluppatore Full‑Stack appassionato di creare soluzioni end‑to‑end.\n` +
      `In questo sito troverai una semplice applicazione CRUD.`,
    `Se desideri saltare questa introduzione, sentiti libero di usare il menu principale in alto.\n` +
      `Altrimenti, rilassati e goditi la presentazione interattiva.`,
    `Qui puoi sperimentare uno sfondo dinamico che risponde ai movimenti del cursore.\n` +
      `Puoi attivare o disattivare le animazioni o disabilitare completamente lo sfondo\n` +
      `utilizzando gli appositi pulsanti nel menu.`,
    `Hai notato che il cursore e le animazioni cambiano colore in sincrono?\n\n` +
      `Hai notato che a ogni movimento del mouse lo sfondo ne modifica la velocità?`,
    `ADESSO SEI PRONTO PER COMINCIARE!\n\n` +
      `Scorri per entrare ed esplorare l'applicazione.\n\n` +
      `Buon divertimento!`,
  ],
};

export default function Intro() {
  const navigate = useNavigate();
  const { lang } = useLibraryStore();
  const sections = useMemo(() => (lang ? SECTIONS.en : SECTIONS.it), [lang]);
  const lastIndex = sections.length - 1;

  const [currentSection, setCurrentSection] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [hasFinishedTypingOnce, setHasFinishedTypingOnce] = useState(false);
  const [hasTypedNow, setHasTypedNow] = useState(false);

  // נקבל מ־ScrollIntro התראה מתי ההקלדה בסקשן האחרון הסתיימה
  const handleTypingDone = useCallback(() => {
    setHasFinishedTypingOnce(true);
    setHasTypedNow(true); // להציג הפעם!
  }, []);

  // בכל פעם שמגיעים לסקשן אחרון - אם כבר היה typing פעם, להראות מיד
  React.useEffect(() => {
    if (currentSection === lastIndex && hasFinishedTypingOnce) {
      setHasTypedNow(true);
    }
  }, [currentSection, lastIndex, hasFinishedTypingOnce]);

  const handleSectionChange = useCallback(
    (sectionIndex) => {
      setCurrentSection(sectionIndex);
      // אם עברו אחורה – אל תציג מיד (רק אם כבר היה typing לפחות פעם אחת)
      if (sectionIndex !== lastIndex) setHasTypedNow(false);
    },
    [lastIndex]
  );

  const handleUnlock = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/books");
    }, 600);
  }, [navigate]);

  return (
    <div className={`intro-wrapper ${isExiting ? "exit" : ""}`}>
      <ScrollIntro
        sections={sections}
        onSectionChange={handleSectionChange}
        onTypingDone={
          currentSection === lastIndex && !hasFinishedTypingOnce
            ? handleTypingDone
            : undefined
        }
      />
      {currentSection === lastIndex && hasTypedNow && (
        <SlideToEnter onUnlock={handleUnlock} />
      )}
    </div>
  );
}
