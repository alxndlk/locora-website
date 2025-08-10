"use client";
import { useEffect, useState } from "react";

export function useCooldown(until?: number) {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (!until) return setLeft(0);
    const tick = () =>
      setLeft(Math.max(0, Math.ceil((until - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [until]);
  return left;
}
