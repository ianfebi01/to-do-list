"use client";
import Header from "@/components/Header";
import React, {
  ContextType,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/Layout/layout";
import AddActivityDataList from "@/components/AddActivity/AddActivityDataList";
import ModalAddActivity from "@/components/AddActivity/ModalAddActivity";
import { useRouter } from "next/router";
import { ActivityContext } from "@/context/ActivityContext";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import axios, { AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import { ActivityDetailsDatas } from "@/types/Home";
import _debounce from "lodash/debounce";
import ModalDelete from "@/components/ModalDelete";
import { Toaster } from "react-hot-toast";
import { ModalInformationIcon } from "@/components/Icons";

interface Props {
  pid: number;
}

const AddActivityGroup: NextPageWithLayout<Props> = ({ pid }) => {
  // loading
  const [loading, setLoading] = useState<boolean>(false);

  // showSortCard
  const [showSortCard, setShowSortCard] = useState<boolean>(false);

  // form
  interface Form {
    title?: string;
  }

  const [form, setForm] = useState<Form>({
    title: "",
  });

  // router
  const router = useRouter();

  // store
  const { state, dispatch } = useContext(ActivityContext);

  useEffect(() => {
    getDatas(pid);
  }, []);

  // get datas
  const getDatas = async (id: number) => {
    try {
      setLoading(true);
      const res: AxiosResponse<ActivityDetailsDatas> = await axios.get(
        `/api-web/activity-groups/${id}`
      );
      if (res) {
        dispatch({
          type: "SET_DATA",
          payload: { ...res.data },
        });
        setForm({
          ...form,
          title: res.data.title,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // handle edit title
  const handleEditTitle = async (value: string) => {
    const res = await axios.patch(`/api-web/activity-groups/${pid}`, {
      title: value,
    });
    if (res) {
    }
  };

  const debounceHandleEditTitle = useCallback(
    _debounce(handleEditTitle, 500),
    []
  );

  const onChangeTitle = async (value: string) => {
    setForm({ title: value });
    await debounceHandleEditTitle(value);
  };

  // modal
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Toaster
        toastOptions={{
          icon: (
            <div className="text-20">
              <ModalInformationIcon />
            </div>
          ),
          position: "top-right",
          className: "text-14",
          style: {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            height: "44px",
          },
        }}
      />
      <ModalAddActivity show={showModal} setShow={setShowModal} pid={pid} />
      <Header
        type="NewActivity"
        title={form?.title}
        setTitle={(value: string) => onChangeTitle(value)}
        handleClickButton={() => setShowModal(true)}
        handleClickBack={() => router.back()}
        showSortCard={showSortCard}
        setShowSortCard={() => setShowSortCard(!showSortCard)}
        pid={pid}
        dataEmpty={state?.activityDetails?.todo_items?.length ? true : false}
      />

      <div className="h-full flex justify-center items-center mt-4 ">
        {loading ? (
          <Loader size={40} color="primary" />
        ) : !loading &&
          state?.activityDetails?.todo_items != undefined &&
          !state?.activityDetails?.todo_items.length ? (
          <div data-cy="todo-empty-state">
            <EmptyState img="/images/todo-empty-state.svg" />
          </div>
        ) : (
          <AddActivityDataList datas={state?.activityDetails?.todo_items} />
        )}
      </div>
    </>
  );
};

AddActivityGroup.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { pid } = context.query;
  return {
    props: {
      pid,
    },
  };
}
export default AddActivityGroup;
