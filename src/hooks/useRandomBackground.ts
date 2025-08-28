import { useEffect, useState } from "react";

export const useRandomBackground = () => {
  const [bg, setBg] = useState<string>("");

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 7) + 1;
    setBg(`/profile_bgs/${randomNum}.jpg`);
  }, []);

  useEffect(() => {
    console.log(bg);
  }, [bg]);

  return {
    bg,
  };
};
