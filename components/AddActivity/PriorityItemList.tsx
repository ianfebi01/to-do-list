"use client";

import { PriorityContent } from "@/utils/PriorityContent";
import React, { FunctionComponent } from "react";
import { Dot } from "../Icons";

interface Props {
  item: PriorityContent;
}

const PriorityItemList: FunctionComponent<Props> = ({ item }) => {
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
      default:
        return "text-primary";
    }
  };
  return (
    <div className="flex items-center gap-18">
      <div className={`text-10 ${getColorClass(item.color as string)}`}>
        <Dot />
      </div>
      <p className="text-16 font-light text-text-secondary-2">{item.text}</p>
    </div>
  );
};

export default PriorityItemList;
