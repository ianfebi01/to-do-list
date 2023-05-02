import { ModalInformationIcon, Plus } from "@/components/Icons";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/Layout/layout";
import { ReactElement, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import useAxios from "axios-hooks";
import axios from "axios";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import { ActivityDatas } from "@/types/Home";
import ActivityDataCards from "@/components/Home/ActivityDataCards";
import { ActivityContext, useActivity } from "@/context/ActivityContext";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const Home: NextPageWithLayout = () => {
  // get all data
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCreateActivityGroup, setLoadingCreateActivityGroup] =
    useState<boolean>(false);

  useEffect(() => {
    FetchData();
  }, []);

  const { state, dispatch } = useContext(ActivityContext);

  const FetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "/api-web/activity-groups?email=ianfebi01%40gmail.com"
      );

      dispatch({
        type: "SET_DATA",
        payload: res.data,
      });
      // dispatchDatas(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // route
  const createNewActivity = async () => {
    try {
      setLoadingCreateActivityGroup(true);
      const res = await axios.post("/api-web/activity-groups", {
        title: "New Activity",
        email: "ianfebi01@gmail.com",
      });
      dispatch({
        type: "PUSH_DATA",
        payload: { ...res.data },
      });
      await FetchData();

      setLoadingCreateActivityGroup(false);
    } catch (error) {
      setLoadingCreateActivityGroup(false);
    }
  };

  return (
    <>
      <div data-cy="modal-information">
        <Toaster
          toastOptions={{
            icon: (
              <div className="text-20" data-cy="modal-information-icon">
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
      </div>
      <Header
        type="Home"
        title="Activity"
        handleClickButton={() => createNewActivity()}
        loading={loadingCreateActivityGroup}
      />
      <div className="h-full flex justify-center items-center mt-4">
        {loading ? (
          <Loader size={40} color="primary" />
        ) : !loading &&
          state?.activityGroup?.data != undefined &&
          !state?.activityGroup?.data.length ? (
          <EmptyState img="/images/activity-empty-state.svg" />
        ) : (
          <ActivityDataCards
            data-cy="activity-card-list"
            fetchData={() => FetchData()}
            datas={state.activityGroup}
          />
        )}
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
