import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import "./SlideToEnter.scss";
import { getBouncyText } from "../../utils/helper";

function SlideToEnter({ onUnlock, delay = 500 }) {
  const sliderRef = useRef(null);
  const buttonRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [show, setShow] = useState(false);

  // show after delay
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!dragging) return;
    const controller = new AbortController();
    const { signal } = controller;

    const slider = sliderRef.current;
    const button = buttonRef.current;
    if (!slider || !button) return;

    const sliderRect = slider.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const maxOffset = sliderRect.width - buttonRect.width - 12;

    // common move handler
    const onMove = (clientX) => {
      let newX = clientX - sliderRect.left - buttonRect.width / 2;
      const clamped = Math.max(0, Math.min(newX, maxOffset));
      setOffsetX(clamped);
      if (clamped >= maxOffset - 10) {
        onUnlock();
      }
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      onMove(e.clientX);
    };

    const handleTouchMove = (e) => {
      // prevent page scroll
      e.preventDefault();
      if (e.touches.length > 0) {
        onMove(e.touches[0].clientX);
      }
    };

    const handleEnd = (e) => {
      e.preventDefault();
      setDragging(false);
      if (offsetX >= maxOffset - 10) {
        onUnlock();
      } else {
        // animate back
        let cur = offsetX;
        const step = () => {
          cur -= 5;
          if (cur <= 0) {
            setOffsetX(0);
          } else {
            setOffsetX(cur);
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      }
    };

    // register listeners with passive:false
    window.addEventListener("mousemove", handleMouseMove, {
      passive: false,
      signal,
    });
    window.addEventListener("mouseup", handleEnd, { passive: false, signal });
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      signal,
    });
    window.addEventListener("touchend", handleEnd, { passive: false, signal });
    window.addEventListener("touchcancel", handleEnd, {
      passive: false,
      signal,
    });

    return () => controller.abort();
  }, [dragging, offsetX, onUnlock]);

  if (!show) return null;

  return (
    <motion.div
      className="slider-wrapper"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        position: "absolute",
        bottom: "20%",
        width: "100%",
        zIndex: 100,
        minHeight: 60,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="slider-container" ref={sliderRef}>
        <div className="slider-text-wrapper">
          <motion.div
            className="slider-text"
            animate={{ y: [0, 0, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          >
            {getBouncyText("SLIDE TO ENTER ➔")}
          </motion.div>
          <div
            className="text-mask"
            style={{
              width: `${offsetX + (buttonRef.current?.clientWidth || 0)}px`,
            }}
          />
        </div>

        <div
          className="slider-button"
          ref={buttonRef}
          onMouseDown={() => setDragging(true)}
          onTouchStart={(e) => {
            e.preventDefault(); // למנוע גם התחלת גלילה
            setDragging(true);
          }}
          style={{ transform: `translateX(${offsetX}px)` }}
        />
      </div>
    </motion.div>
  );
}

export default SlideToEnter;
