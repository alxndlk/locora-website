import styles from "./ProfileView.module.css";
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { label: string; value: T }[];
  className?: string;
}) {
  return (
    <div
      className={`${styles.segmented} ${className || ""}`}
      role="tablist"
      aria-label="segment"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={`${styles.segment} ${
              active ? styles.segment_active : ""
            }`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
