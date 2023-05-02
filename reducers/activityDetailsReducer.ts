import { Actions, ActivityDatas, ActivityDetailsDatas } from "@/types/Home";
import { Reducer } from "react";

export const activityDetailsReducer: Reducer<
  ActivityDetailsDatas | null,
  Actions<ActionsMapActivityDetailsReducer>
> = (state, { payload, type }) => {
  switch (type) {
    case "PUSH_DATA":
      // if (!state?.data) console.log("asu");
      const tmp = state?.todo_items;
      // tmp?.push({ ...state, ...payload });
      // tmp?.reverse();
      tmp?.splice(0, 0, { ...payload });
      return { ...state, todo_items: tmp };
    case "SET_DATA":
      return { ...state, ...payload };
    case "DEL_DATA_LIST":
      const tmp2 = state?.todo_items;
      const filterDatas = tmp2?.filter((item) => item.id !== payload);
      return { ...state, todo_items: filterDatas };
    case "SET_CHECKBOX":
      const tmp3 = state?.todo_items;
      const index = tmp3?.findIndex((item) => item.id === payload?.id);
      if (index != -1) {
        if (tmp3) {
          tmp3[index as number].is_active = payload?.value;
        }
      }
      return { ...state, todo_items: tmp3 };
    case "SET_TITLE":
      const tmp4 = state?.todo_items;
      const index2 = tmp4?.findIndex((item) => item.id === payload?.id);
      if (index2 != -1) {
        if (tmp4) {
          tmp4[index2 as number].title = payload?.title;
        }
      }
      return { ...state, todo_items: tmp4 };
    case "SET_SORT":
      const order = { true: 1, null: 2, false: 3 };

      const tmp5 = state?.todo_items;
      switch (payload?.sort) {
        case "sort-latest":
          tmp5?.sort((a, b) => {
            let fa = a?.id,
              fb = b?.id;
            if (fa && fb) {
              if (fa > fb) {
                return -1;
              }
              if (fa < fb) {
                return 1;
              }
            }
            return 0;
          });

          return { ...state, sort: payload?.sort, todo_items: tmp5 };
        case "sort-oldest":
          tmp5?.sort((a, b) => {
            let fa = a?.id,
              fb = b?.id;
            if (fa && fb) {
              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
            }
            return 0;
          });

          return { ...state, sort: payload?.sort, todo_items: tmp5 };
        case "sort-az":
          tmp5?.sort((a, b) => {
            let fa = a?.title?.toLowerCase(),
              fb = b?.title?.toLowerCase();
            if (fa && fb) {
              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
            }
            return 0;
          });

          return { ...state, sort: payload?.sort, todo_items: tmp5 };
        case "sort-za":
          tmp5?.sort((a, b) => {
            let fa = a?.title?.toLowerCase(),
              fb = b?.title?.toLowerCase();

            if (fa && fb) {
              if (fa > fb) {
                return -1;
              }
              if (fa < fb) {
                return 1;
              }
            }
            return 0;
          });

          return { ...state, sort: payload?.sort, todo_items: tmp5 };
        case "sort-unfinished":
          // @ts-ignore
          tmp5?.sort((a, b) => {
            if (a && b) {
              // @ts-ignore
              return b?.is_active - a?.is_active;
            }
          });

          return { ...state, sort: payload?.sort, todo_items: tmp5 };
      }

    default:
      return state;
  }
};

type SET_CHECKBOX = {
  id?: number;
  value?: number | boolean;
};
type SET_TITLE = {
  id?: number;
  title?: string;
};
type SET_SORT = {
  sort?: string;
};

export type ActionsMapActivityDetailsReducer = {
  PUSH_DATA: ActivityDetailsDatas | null;
  SET_DATA: ActivityDetailsDatas | null;
  DEL_DATA_LIST: ActivityDetailsDatas | null;
  SET_CHECKBOX: SET_CHECKBOX | null;
  SET_TITLE: SET_TITLE | null;
  SET_SORT: SET_SORT | null;
};
