import { Actions, ActivityDatas } from "@/types/Home";
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
    default:
      return state;
  }
};

export type ActionsMapActivityGroupReducer = {
  SET_DATA: ActivityDatas | null;
  REMOVE_GROUP: number;
};
