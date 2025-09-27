"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Alert from "@/app/components/ui/Alert/Alert";
import s from "./AlertStack.module.css";
import { AnimatePresence } from "framer-motion";

type AlertType = "success" | "error" | "info";

export interface ShowAlertOptions {
  id?: string;
  duration?: number;
  className?: string;
}

export interface AlertItem {
  id: string;
  key: string;
  message: React.ReactNode;
  type: AlertType;
  duration?: number;
  className?: string;
}

interface AlertContextValue {
  showAlert: (
    message: React.ReactNode,
    type?: AlertType,
    options?: ShowAlertOptions
  ) => string;
  hideAlert: (id: string) => void;
  clearAlerts: () => void;
}

const AlertContext = createContext<AlertContextValue | null>(null);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const timeouts = useRef<Record<string, number>>({});

  const hideAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    if (timeouts.current[id]) {
      window.clearTimeout(timeouts.current[id]);
      delete timeouts.current[id];
    }
  }, []);

  const showAlert = useCallback(
    (
      message: React.ReactNode,
      type: AlertType = "info",
      options?: ShowAlertOptions
    ) => {
      const id = options?.id ?? Math.random().toString(36).slice(2);
      const duration = options?.duration ?? 3000;

      if (timeouts.current[id]) {
        window.clearTimeout(timeouts.current[id]);
        delete timeouts.current[id];
      }

      const renderKey = `${id}-${performance.now()}`;

      setAlerts((prev) => {
        const next = prev.filter((a) => a.id !== id);
        return [
          ...next,
          {
            id,
            key: renderKey,
            message,
            type,
            duration,
            className: options?.className,
          },
        ];
      });

      if (duration > 0) {
        timeouts.current[id] = window.setTimeout(() => hideAlert(id), duration);
      }
      return id;
    },
    [hideAlert]
  );

  const clearAlerts = useCallback(() => {
    Object.values(timeouts.current).forEach((t) => window.clearTimeout(t));
    timeouts.current = {};
    setAlerts([]);
  }, []);

  const value = useMemo(
    () => ({ showAlert, hideAlert, clearAlerts }),
    [showAlert, hideAlert, clearAlerts]
  );

  return (
    <AlertContext.Provider value={value}>
      {children}

      {}
      {typeof window !== "undefined" &&
        createPortal(
          <div
            className={s.stack}
            aria-live="polite"
            aria-relevant="additions removals"
          >
            <AnimatePresence mode="sync" initial={false}>
              {alerts.map(({ id, key, message, type, className }) => (
                <div key={key} className={s.item}>
                  <Alert
                    message={message}
                    type={type}
                    className={className}
                    onClose={() => hideAlert(id)}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
};
