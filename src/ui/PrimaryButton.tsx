import React, { JSX } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaApple,
  FaAppStore,
} from "react-icons/fa";
import styles from "./Ui.module.css";
import { PrimaryButtonProps } from "../../types";
import { PiUserList } from "react-icons/pi";
import { GoArrowUpRight } from "react-icons/go";

export const PrimaryButton = ({
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
  type,
  formAction
}: PrimaryButtonProps) => {
  const iconsMap: { [key: string]: JSX.Element } = {
    FaChevronRight: <FaChevronRight size={iconSize} color={iconColor} />,
    FaChevronLeft: <FaChevronLeft size={iconSize} color={iconColor} />,
    FaAppStore: <FaAppStore size={iconSize} color={iconColor} />,
    FaApple: <FaApple size={iconSize} color={iconColor} />,
    PiUserList: <PiUserList size={iconSize} color={iconColor} />,
    GoArrowUpRight: <GoArrowUpRight size={iconSize} color={iconColor} />,
  };

  const IconComponent = icon ? iconsMap[icon] : null;

  return (
    <button
      className={styles.primaryButton}
      onClick={onClick}
      type={type}
      formAction={formAction}
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
