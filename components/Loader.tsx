"use client";

import React, { FunctionComponent } from "react";
import { LoaderIcon } from "./Icons";

interface Props {
  color?: string;
  size?: number;
}

const Loader: FunctionComponent<Props> = ({ color, size }) => {
  const getColorClass = (color: string): string | undefined => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "white":
        return "text-white";
      case "red":
        return "text-red";
      case "blue":
        return "text-blue";
      case "purple":
        return "text-purple";
      case "orange":
        return "text-orange";
      case "green":
        return "text-green";
      case "secondary":
        return "text-secondary-2";
      default:
        return "text-primary";
    }
  };
  return (
    <div
      className={`animate-spin ${getColorClass(color as string)} text-${size}`}
    >
      <LoaderIcon />
    </div>
  );
};

Loader.defaultProps = {
  color: "primary",
  size: 4,
};
export default Loader;
