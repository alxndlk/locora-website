import React, { JSX } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaStore,
  FaApple,
} from "react-icons/fa";
import styles from "./Ui.module.css";
import { SecondaryButtonProps } from "../../types";

export const SecondaryButton = ({
  text,
  icon,
  iconPosition,
  iconSize,
  iconColor,
  buttonSize,
  fontSize,
  fontWeight,
  onClick,
  widthButton,
}: SecondaryButtonProps) => {
  const iconsMap: { [key: string]: JSX.Element } = {
    FaChevronRight: <FaChevronRight size={iconSize} color={iconColor} />,
    FaChevronLeft: <FaChevronLeft size={iconSize} color={iconColor} />,
    FaStore: <FaStore size={iconSize} color={iconColor} />,
    FaApple: <FaApple size={iconSize} color={iconColor} />,
  };

  const IconComponent = icon ? iconsMap[icon] : null;

  return (
    <button
      className={styles.secondaryButton}
      onClick={onClick}
      style={{
        height: buttonSize,
        fontSize: fontSize,
        fontWeight: fontWeight,
        width: widthButton,
      }}
    >
      {iconPosition === "left" && IconComponent}
      <span>{text}</span>
      {iconPosition === "right" && IconComponent}
    </button>
  );
};
