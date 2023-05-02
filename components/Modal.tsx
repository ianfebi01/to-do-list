import React, { Fragment, FunctionComponent, useState } from "react";
import { ArrowDown, Dot } from "./Icons";
import Button from "./Button";
import Loader from "./Loader";
import OutsideClickHandler from "react-outside-click-handler";

interface Props {
  title?: string;
  children: React.ReactNode;
  show: boolean;
  actionPositive: () => void;
  loading?: boolean;
  dataCyTitle: string;
  dataCyAction: string;
  disable: boolean;
  actionNegative: () => void;
}

const Modal: FunctionComponent<Props> = ({
  title,
  children,
  show,
  actionPositive,
  loading,
  dataCyTitle,
  dataCyAction,
  disable,
  actionNegative,
}) => {
  return (
    <>
      <div
        className={`transition-all duration-1000 ease-in-out  fixed top-0 left-0 right-0 z-50 w-full py-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-[rgba(0,0,0,0.5)] ${
          !show && " hidden"
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <OutsideClickHandler
            onOutsideClick={() => {
              actionNegative();
            }}
          >
            <div className="relative flex flex-col gap-2 w-full max-w-[803px] h-auto bg-white rounded-lg shadow py-6 ">
              <div className="flex justify-between  border-b-[1px] border-[#E5E5E5] px-5 pb-4">
                <span data-cy={dataCyTitle} className="font-[600] text-[18px]">
                  {title}
                </span>
              </div>

              <div className="flex flex-col px-5 py-8 gap-16">{children}</div>
              <div className="flex justify-end  border-t-[1px] border-[#E5E5E5] px-5 pt-4">
                <div data-cy={dataCyAction}>
                  <Button onClick={() => actionPositive()} disable={disable}>
                    {loading ? (
                      <Fragment>
                        <div className="flex items-center justify-center gap-[1rem] invisible">
                          Simpan
                        </div>
                        <div className="absolute">
                          <Loader color="primary" size={22} />
                        </div>
                      </Fragment>
                    ) : (
                      "Simpan"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
};

Modal.defaultProps = {
  title: "Tambah List Item",
};

export default Modal;
