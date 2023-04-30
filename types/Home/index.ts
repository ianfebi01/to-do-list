type Datas = {
  id: number;
  title: string;
  created_at: string;
};

export interface ActivityDatas {
  total?: number;
  limit?: number;
  skip?: number;
  data?: Datas[];
  prevState?: null;
}

export type ActivityDetailsDataList = {
  id?: number;
  title?: string;
  activity_group_id?: number;
  is_active?: number | boolean;
  priority?: string;
};
export interface ActivityDetailsDatas {
  todo_items?: ActivityDetailsDataList[];
  sort?: string;
  id?: number;
  title?: string;
  created_at?: string;
  prevState?: null;
}

export type activityContextType = {
  activityGroup: ActivityDatas | null;
  activityDetails: ActivityDetailsDatas | null;
};

export type Actions<T> = {
  [Key in keyof T]: {
    type: Key;
    payload: T[Key];
  };
}[keyof T];
