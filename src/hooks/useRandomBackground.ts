import { useEffect, useState } from "react";

export const useRandomBackground = () => {
  const [bg, setBg] = useState<string>("");

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 15) + 1;
    setBg(`/profile_bgs/${randomNum}.jpg`);
    console.log(bg);
  }, []);

  return {
    bg,
  };
};
