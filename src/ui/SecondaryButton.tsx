import React, { JSX } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaStore,
  FaApple,
} from "react-icons/fa";
import styles from "./Ui.module.css";
import { SecondaryButtonProps } from "../../types";
import { PiUserList } from "react-icons/pi";

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
  paddingButton,
}: SecondaryButtonProps) => {
  const iconsMap: { [key: string]: JSX.Element } = {
    FaChevronRight: <FaChevronRight size={iconSize} color={iconColor} />,
    FaChevronLeft: <FaChevronLeft size={iconSize} color={iconColor} />,
    FaStore: <FaStore size={iconSize} color={iconColor} />,
    FaApple: <FaApple size={iconSize} color={iconColor} />,
    PiUserList: <PiUserList size={iconSize} color={iconColor} />,
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
        padding: paddingButton,
      }}
    >
      {iconPosition === "left" && IconComponent}
      <span>{text}</span>
      {iconPosition === "right" && IconComponent}
    </button>
  );
};
