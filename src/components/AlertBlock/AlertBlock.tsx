import React from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";
import s from "./AlertBlock.module.css";

type AlertType = "success" | "error" | "info";

type AlertBlockProps = {
  message: string;
  type: AlertType;
  className?: string;
  onClose?: () => void;
  description?: string;
  link?: { href: string; text: string };
  icon?: React.ReactNode;
};

const ICONS: Record<AlertType, React.ReactNode> = {
  success: <FiCheckCircle aria-hidden />,
  error: <FiAlertCircle aria-hidden />,
  info: <FiInfo aria-hidden />,
};

const toneClassName = (type: AlertType) =>
  type === "success" ? s.success : type === "error" ? s.error : s.info;

const AlertBlock: React.FC<AlertBlockProps> = ({
  message,
  type,
  className,
  onClose,
  description,
  link,
  icon,
}) => {
  const ariaLive: "polite" | "assertive" =
    type === "error" ? "assertive" : "polite";

  return (
    <div
      className={[
        s.alert,
        toneClassName(type),
        onClose ? s.dismissible : "",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="alert"
      aria-live={ariaLive}
      data-type={type}
    >
      <div className={s.icon} aria-hidden>
        {icon ?? ICONS[type]}
      </div>

      <div className={s.content}>
        <div className={s.message}>{message}</div>
        {description && <div className={s.description}>{description}</div>}
        {link && (
          <a className={s.link} href={link.href}>
            {link.text}
          </a>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          className={s.close}
          onClick={onClose}
          aria-label="Close alert"
        >
          <FiX aria-hidden />
        </button>
      )}
    </div>
  );
};

export default AlertBlock;
