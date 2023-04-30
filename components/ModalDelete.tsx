import React, { Fragment, FunctionComponent, useState } from "react";
import { ArrowDown, Dot, ModalDeleteSvg } from "./Icons";
import Button from "./Button";
import Loader from "./Loader";

interface Props {
  title?: string;
  title2?: string;
  show: boolean;
  actionPositive: () => void;
  actionNegative: () => void;
  loading?: number | null;
}

const ModalDelete: FunctionComponent<Props> = ({
  title,
  show,
  title2,
  actionPositive,
  actionNegative,
  loading,
}) => {
  const getColorClass = (color: string): string | undefined => {
    switch (color) {
      case "primary":
        return "bg-primary  text-white";
      case "white":
        return "bg-white  text-white";
      case "red":
        return "bg-red";
      case "blue":
        return "bg-blue  text-white hover:brightness-110";
      case "purple":
        return "bg-purple  text-white hover:brightness-110";
      case "orange":
        return "bg-orange  text-white hover:brightness-110";
      case "green":
        return "bg-green  text-white hover:brightness-110";
      case "danger":
        return "bg-danger  text-white hover:brightness-110";
      case "gray-light":
        return "bg-gray-light hover:brightness-95";
      default:
        return "bg-primary  text-white hover:brightness-110";
    }
  };
  return (
    <>
      <div
        data-cy="modal-delete"
        className={`transition-all duration-1000 ease-in-out  fixed top-0 left-0 right-0 z-50 w-full py-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-[rgba(0,0,0,0.5)] ${
          !show && " hidden"
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative flex flex-col gap-2 w-full max-w-[390px] h-auto bg-white rounded-lg shadow py-6 ">
            <div className="flex flex-col justify-between  items-center w-full border-[#E5E5E5] px-5">
              <div data-cy="modal-delete-icon" className="text-[80px]">
                <ModalDeleteSvg />
              </div>
              <div
                data-cy="modal-delete-title"
                className="flex flex-col text-center mb-6 mt-2"
              >
                <span className="font-[400] text-[14px]">{title}</span>
                <span className="font-[600] text-[14px]">{title2}</span>
              </div>
              <div className="flex gap-10">
                <div data-cy="modal-delete-cancel-button">
                  <Button
                    onClick={() => actionNegative()}
                    bg="gray-light"
                    disable={loading ? true : false}
                  >
                    Batal
                  </Button>
                </div>

                <button
                  data-cy="modal-delete-confirm-button"
                  className={`text-14 border rounded-full border-none px-6  h-[44px] flex items-center justify-center gap-4 transition duration-300 ease-in-out text-text-secondary-2 ${getColorClass(
                    "danger"
                  )} relative`}
                  type="button"
                  onClick={() => actionPositive()}
                >
                  {loading ? (
                    <Fragment>
                      <div className="flex items-center justify-center gap-[1rem] invisible">
                        Hapus
                      </div>
                      <div className="absolute">
                        <Loader color="red" size={22} />
                      </div>
                    </Fragment>
                  ) : (
                    "Hapus"
                  )}
                </button>

                {/* <Button
                  data-cy="modal-delete-confirm-button"
                  onClick={() => actionPositive()}
                  bg="danger"
                >
                  {loading ? (
                    <Fragment>
                      <div className="flex items-center justify-center gap-[1rem] invisible">
                        Hapus
                      </div>
                      <div className="absolute">
                        <Loader color="red" size={22} />
                      </div>
                    </Fragment>
                  ) : (
                    "Hapus"
                  )}
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ModalDelete.defaultProps = {
  title: "Tambah List Item",
};

export default ModalDelete;
