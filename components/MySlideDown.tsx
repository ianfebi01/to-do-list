"use client";
import React, { FunctionComponent } from "react";
import SlideDown from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
interface Props {
  children: React.ReactNode;
  open: boolean;
}

const MySlideDown: FunctionComponent<Props> = ({ children, open }) => {
  return (
    <SlideDown className={"my-dropdown-slidedown"}>
      {open ? children : null}
    </SlideDown>
  );
};

export default MySlideDown;
