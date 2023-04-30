import { Actions, ActivityDatas, Datas } from "@/types/Home";
import { Reducer } from "react";

export const activityGroupReducer: Reducer<
  ActivityDatas | null,
  Actions<ActionsMapActivityGroupReducer>
> = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return action.payload;
    case "REMOVE_GROUP":
      const tmp = state?.data;
      const filteredData = tmp?.filter((item) => action.payload !== item.id);
      return { ...state, data: filteredData };
    case "PUSH_DATA":
      // if (!state?.data) console.log("asu");
      const tmp2 = state?.data;
      tmp2?.push({ ...action?.payload });
      // tmp2?.reverse();
      return { ...state, data: tmp2 };
    case "SET_DATA":
    default:
      return state;
  }
};

export type ActionsMapActivityGroupReducer = {
  SET_DATA: ActivityDatas | null;
  REMOVE_GROUP: number;
  PUSH_DATA: Datas | null;
};
