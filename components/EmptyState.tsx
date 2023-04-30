import Image from "next/image";
import React, { FunctionComponent } from "react";

interface Props {
  img: string;
}
const EmptyState: FunctionComponent<Props> = ({ img }) => {
  return (
    <div className="max-w-[767px]">
      <Image
        src={img}
        alt="Empty state"
        width={500}
        height={100}
        priority
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default EmptyState;
