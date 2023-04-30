import { parseISO, format } from "date-fns";
import { FunctionComponent } from "react";
import React from "react";

interface Props {
  dateString: string;
}
const Date: FunctionComponent<Props> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "d LLLL yyyy")}</time>;
};

export default Date;
