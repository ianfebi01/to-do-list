import { Plus } from "@/components/Icons";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/Layout/layout";
import type { ReactElement } from "react";
import Image from "next/image";
import emptyState from "../public/images/activity-empty-state.svg";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-36 font-bold">Activity</h1>
        <button className="bg-primary border rounded-full border-none px-6 text-white h-[54px] text-18 flex items-center justify-center gap-10 hover:brightness-110 transition duration-300 ease">
          <Plus />
          Tambah
        </button>
      </div>
      <div className="flex justify-center items-center">
        <div className="max-w-[767px]">
          <Image
            src="/images/activity-empty-state.svg"
            alt="Activity empty state"
            layout="fill"
            className="image--empty-state"
          />
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
