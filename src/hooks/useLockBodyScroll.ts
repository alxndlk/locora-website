"use client";

import { useEffect, useRef } from "react";

export function useLockBodyScroll(locked: boolean) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!locked) return;

    scrollYRef.current = window.scrollY || window.pageYOffset;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    const prevTop = body.style.top;
    const prevWidth = body.style.width;
    const prevPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.position = prevPosition;
      body.style.top = prevTop;
      body.style.width = prevWidth;
      body.style.paddingRight = prevPaddingRight;

      window.scrollTo(0, scrollYRef.current);
    };
  }, [locked]);
}
