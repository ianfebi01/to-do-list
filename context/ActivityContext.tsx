import {
  ActionsMapActivityDetailsReducer,
  activityDetailsReducer,
} from "@/reducers/activityDetailsReducer";
import {
  ActionsMapActivityGroupReducer,
  activityGroupReducer,
} from "@/reducers/activityGroupReducer";
import { Actions, activityContextType } from "@/types/Home";
import { createContext, useContext, ReactNode, useReducer } from "react";

const initialState: activityContextType = {
  activityGroup: null,
  activityDetails: {
    sort: "sort-latest",
    todo_items: [],
  },
};

export const ActivityContext = createContext<{
  state: activityContextType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const mainReducer = (
  { activityGroup, activityDetails }: activityContextType,
  action: Actions<
    ActionsMapActivityDetailsReducer | ActionsMapActivityGroupReducer
  >
) => ({
  activityGroup: activityGroupReducer(activityGroup, action),
  activityDetails: activityDetailsReducer(activityDetails, action),
});

export function useActivity() {
  return useContext(ActivityContext);
}

type Props = {
  children: ReactNode;
};

export function ActivityProvider({ children }: Props) {
  // @ts-ignore
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <>
      <ActivityContext.Provider value={{ state, dispatch }}>
        {children}
      </ActivityContext.Provider>
    </>
  );
}
