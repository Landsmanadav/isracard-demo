// Intro.jsx
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SlideToEnter from "./SlideToEnter";
import ScrollIntro from "./ScrollIntro";
import "./Intro.scss";

export default function Intro() {
  const navigate = useNavigate();
  // מגדירים כאן את ה־sections בשביל שנוכל לחשב lastIndex דינמי
  const sections = [
    // Step 1: Introduction & skip option
    `Hi, I’m Nadav Landesman\n` +
      `This is my take-home assignment for a development role at Isracard.\n` +
      `If you’d like to skip the Hero section, use the top menu to go straight to Books or Members.`,

    // Step 2: Who I am & my focus
    `I’m a Full-Stack Developer passionate about crafting dynamic user interfaces with React,\n` +
      `and building powerful automation behind the scenes.\n` +
      `I emphasize performance, maintainability, and a seamless user experience.`,

    // Step 3: Hero features & Slide to Enter
    `Welcome to the Hero section! Here you’ll enjoy an interactive background that responds to cursor movement.\n` +
      `When you’re ready to dive in\n` +
      `Slide to enter and explore the system.`,
  ];

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
