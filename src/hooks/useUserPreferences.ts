import { useState } from "react";
import { CurrencyCode, TempUnit, TimeFmt } from "../../types";

export function useUserPreferences(
  user_currency?: CurrencyCode,
  user_temperature?: TempUnit,
  user_time_format?: TimeFmt
) {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>(
    user_currency ?? "USD"
  );
  const [currentTemperature, setCurrentTemperature] = useState<TempUnit>(
    user_temperature ?? "C"
  );
  const [currentTimeFormat, setCurrentTimeFormat] = useState<TimeFmt>(
    user_time_format ?? "24"
  );

  return {
    currentCurrency,
    setCurrentCurrency,
    currentTemperature,
    setCurrentTemperature,
    currentTimeFormat,
    setCurrentTimeFormat,
  };
}
