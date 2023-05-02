import React, { FunctionComponent } from "react";
import styles from "../../styles/scss/components/Button.module.scss";

type DefaultProps = {
  children: React.ReactNode;
  bg?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disable?: boolean;
  dataCy?: string;
};

const Button: FunctionComponent<DefaultProps> = ({
  children,
  bg,
  onClick,
  disable,
  dataCy,
}) => {
  const getColorClass = (color: string): string | undefined => {
    switch (color) {
      case "primary":
        return "bg-primary  text-white";
      case "white":
        return "bg-white  text-white";
      case "red":
        return "bg-red";
      case "blue":
        return "bg-blue  text-white hover:brightness-110";
      case "purple":
        return "bg-purple  text-white hover:brightness-110";
      case "orange":
        return "bg-orange  text-white hover:brightness-110";
      case "green":
        return "bg-green  text-white hover:brightness-110";
      case "danger":
        return "bg-danger  text-white hover:brightness-110";
      case "gray-light":
        return "bg-gray-light hover:brightness-95";
      default:
        return "bg-primary  text-white hover:brightness-110";
    }
  };
  return (
    <button
      data-cy={dataCy}
      data-cy={dataCy}
      disabled={disable}
      className={`text-14 border rounded-full border-none px-6  h-[44px] flex items-center justify-center gap-4 transition duration-300 ease-in-out text-text-secondary-2 ${getColorClass(
        bg as string
      )} relative`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  bg: "bg-primary",
};

export default Button;
