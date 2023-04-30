import { ActivityDatas } from "@/types/Home";
import React, { FunctionComponent, useContext, useState } from "react";
import Date from "../Date";
import { Trash } from "../Icons";
import axios from "axios";
import Loader from "../Loader";
import { activityGroupReducer } from "@/reducers/activityGroupReducer";
import { ActivityContext } from "@/context/ActivityContext";
import { useRouter } from "next/router";
import ModalDelete from "../ModalDelete";
import { toast } from "react-hot-toast";
interface Props {
  datas?: ActivityDatas | null;
  fetchData: () => void;
}
const ActivityDataCards: FunctionComponent<Props> = ({ datas, fetchData }) => {
  const [loading, setLoading] = useState<number | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [showModalRemove, setShowModalRemove] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const [title2, setTitle2] = useState<string>();
  // store
  const { state, dispatch } = useContext(ActivityContext);

  // route
  const router = useRouter();

  // remove activity
  const removeActivity = async () => {
    try {
      setLoading(id);
      await axios.delete(`/api-web/activity-groups/${id}`);

      dispatch({
        type: "REMOVE_GROUP",
        payload: id,
      });
      fetchData();
      setLoading(null);
      setId(null);
      toast.success("Activity berhasil dihapus");
      setShowModalRemove(false);
    } catch (error) {
      console.log(error);
      setLoading(null);
    }
  };

  const handleClickCard = (id: number) => {
    router.push(`/detail/${id}`);
  };

  const handleOpenModalDelete = (value: number, titleValue: string) => {
    setId(value);
    setShowModalRemove(true);
    setTitle2(titleValue);
  };

  return (
    <>
      <ModalDelete
        show={showModalRemove}
        title="Apakah anda yakin menghapus Activity"
        title2={`"${title2}"?`}
        actionNegative={() => setShowModalRemove(false)}
        actionPositive={() => removeActivity()}
        loading={loading}
      />
      <div className="w-full h-full mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-20  w-full h-auto">
          {datas?.data?.map((item, i) => (
            <div
              data-cy="activity-item"
              className="bg-white border border-none rounded-[12px] p-6 h-[234px] shadow-card flex flex-col  hover:brightness-95 transition-all duration-300 ease-in-out"
              key={item?.id}
            >
              <div
                data-cy="activity-item-title"
                className="flex flex-col grow-[1] cursor-pointer"
                onClick={() => handleClickCard(item?.id as number)}
              >
                <p className="text-18 font-bold leading-[27px]">
                  {item?.title}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div data-cy="activity-item-date">
                  <p className="text-14 text-text-secondary font-[500]">
                    <Date dateString={item.created_at as string} />
                  </p>
                </div>
                <button
                  data-cy="activity-item-delete-button"
                  onClick={() =>
                    handleOpenModalDelete(
                      item?.id as number,
                      item?.title as string
                    )
                  }
                >
                  {loading === item?.id ? (
                    <Loader size={16} color="text-secondary" />
                  ) : (
                    <Trash />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActivityDataCards;
