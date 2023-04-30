import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from "react";
import { Dot, ModalInformationIcon, Pen, Trash } from "../Icons";
import { ActivityDetailsDataList } from "@/types/Home";
import axios, { AxiosResponse } from "axios";
import { ActivityContext } from "@/context/ActivityContext";
import Loader from "../Loader";
import ModalDelete from "../ModalDelete";
import toast, { Toaster } from "react-hot-toast";
import _debounce from "lodash/debounce";

interface Props {
  datas?: ActivityDetailsDataList[];
}
const AddActivityDataList: FunctionComponent<Props> = ({ datas }) => {
  const [isActive, setIsActive] = useState<number>(0);
  const [edit, setEdit] = useState<number | null>(null);
  const [loading, setLoading] = useState<number | null>(null);
  const [showModalRemove, setShowModalRemove] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const [title2, setTitle2] = useState<string>();
  const [titleList, setTitleList] = useState<string>("");

  // getcolor
  const getColorClass = (color: string): string | undefined => {
    switch (color) {
      case "very-high":
        return "text-red";
      case "high":
        return "text-orange";
      case "normal":
        return "text-green";
      case "low":
        return "text-blue";
      case "very-low":
        return "text-purple";
      default:
        return "text-primary";
    }
  };

  // store
  const { state, dispatch } = useContext(ActivityContext);

  const handleCheckbox = async (id: number, val: string | number) => {
    try {
      const res: AxiosResponse<ActivityDetailsDataList> = await axios.patch(
        `/api-web/todo-items/${id}`,
        {
          is_active: val,
        }
      );

      if (res) {
      }
      dispatch({
        type: "SET_CHECKBOX",
        payload: { id, value: val == 1 ? true : false },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async () => {
    try {
      setLoading(id);
      const res: AxiosResponse = await axios.delete(
        `/api-web/todo-items/${id}`
      );
      if (res) {
        dispatch({
          type: "DEL_DATA_LIST",
          payload: id,
        });
      }

      toast.success("Activity list berhasil dihapus");
      setLoading(null);
      setShowModalRemove(false);
    } catch (error) {
      setLoading(null);
      console.log(error);
    }
  };

  const handleOpenModal = (value: number, titleValue: string) => {
    setId(value);
    setTitle2(titleValue);
    setShowModalRemove(true);
  };

  const handleEditButton = (value: number | null, titleValue: string) => {
    if (edit === value) {
      setEdit(null);
      setTitleList("");
    } else {
      setEdit(value);
      setTitleList(titleValue);
    }
  };

  const handleEditTitleList = async (idValue: number, value: string) => {
    try {
      const res = await axios.patch(`/api-web/todo-items/${idValue}`, {
        title: value,
      });
      if (res) {
        dispatch({
          type: "SET_TITLE",
          payload: { id: idValue, title: value },
        });
      }
    } catch (error) {}
  };

  const debounceHandleEditTitleList = useCallback(
    _debounce(handleEditTitleList, 500),
    []
  );

  const handleSetTitleList = async (idValue: number, value: string) => {
    setTitleList(value);
    await debounceHandleEditTitleList(idValue, value);
  };

  return (
    <>
      <ModalDelete
        show={showModalRemove}
        title="Apakah anda yakin menghapus List Item"
        title2={`"${title2}"?`}
        actionNegative={() => setShowModalRemove(false)}
        actionPositive={() => handleRemove()}
        loading={loading}
      />
      <div className="w-full h-full mt-10">
        <div className="grid grid-cols-1 gap-14  w-full h-auto">
          {datas?.map((item, i) => (
            <div
              data-cy={`todo-item-${i}`}
              className="bg-white border border-none rounded-[12px] p-6 min-h-[80px] shadow-card flex items-center  justify-between"
              key={i}
            >
              <div className="flex items-center gap-16">
                <div className="flex items-center">
                  <input
                    data-cy="todo-item-checkbox"
                    type="checkbox"
                    checked={!item?.is_active as boolean}
                    value={item?.is_active ? 0 : 1}
                    className="outline-none focus:outline-none focus:ring-0 text-primary w-5 h-5 border cursor-pointer border-[#C7C7C7]"
                    onChange={(e) =>
                      handleCheckbox(item?.id as number, e.target.value)
                    }
                  />
                </div>
                <div
                  data-cy="todo-item-priority-indicator"
                  className={`text-10 ${getColorClass(
                    item?.priority as string
                  )}`}
                >
                  <Dot />
                </div>
                {edit === item?.id ? (
                  <input
                    autoFocus
                    className="text-18 font-[400] w-50 rounded-sm border-b-[1px] focus:outline-none"
                    value={titleList}
                    style={{ background: "none" }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSetTitleList(item?.id as number, e.target.value)
                    }
                  />
                ) : (
                  <p
                    data-cy="todo-item-title"
                    className={`text-18  font-[400] leading-[27px] ${
                      !item?.is_active && "line-through text-text-secondary"
                    }`}
                  >
                    {item?.title}
                  </p>
                )}
                <div
                  data-cy="todo-item-edit-button"
                  className=" cursor-pointer"
                  onClick={() =>
                    handleEditButton(item?.id as number, item?.title as string)
                  }
                >
                  <Pen />
                </div>
              </div>
              <div
                data-cy="todo-item-delete-button"
                className="cursor-pointer"
                onClick={() =>
                  handleOpenModal(item?.id as number, item?.title as string)
                }
              >
                {loading === item?.id ? (
                  <Loader size={16} color="text-secondary" />
                ) : (
                  <Trash />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddActivityDataList;
