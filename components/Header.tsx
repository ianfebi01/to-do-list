import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useState,
} from "react";
import Button from "./Button";
import {
  ArrowLeft,
  ArrowSort,
  CheckedIcon,
  Dot,
  Pen,
  Plus,
  SortAz,
  SortLatest,
  SortOldest,
  SortUnfinished,
  SortZa,
} from "./Icons";
import { Router, useRouter } from "next/router";
import Loader from "./Loader";
import MySlideDown from "./MySlideDown";
import { sortContent } from "@/utils/SortContent";
import { ActivityContext } from "@/context/ActivityContext";

interface Props {
  type?: string;
  title?: string;
  setTitle?: (e: string) => void;
  handleClickButton: () => void;
  handleClickBack?: () => void;
  loading?: boolean;
  showSortCard?: boolean;
  setShowSortCard?: () => void;
  pid?: number;
  dataEmpty?: boolean;
}
const Header: FunctionComponent<Props> = ({
  type,
  title,
  setTitle,
  handleClickButton,
  handleClickBack,
  loading,
  showSortCard,
  setShowSortCard,
  pid,
  dataEmpty,
}) => {
  // state
  const [edit, setEdit] = useState<boolean>(false);

  // change title
  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setTitle) {
      setTitle(e.target.value);
    }
  };

  // handle back
  const handleBack = () => {
    if (handleClickBack) {
      handleClickBack();
    }
  };

  // handle sort
  const handleShowSortCard = () => {
    if (setShowSortCard) {
      setShowSortCard();
    }
  };

  // store
  const { state, dispatch } = useContext(ActivityContext);

  // handle icon
  const getIconCode = (icon: string) => {
    switch (icon) {
      case "latest":
        return <SortLatest />;
      case "oldest":
        return <SortOldest />;
      case "az":
        return <SortAz />;
      case "za":
        return <SortZa />;
      case "unfinished":
        return <SortUnfinished />;
      default:
        return <SortOldest />;
    }
  };

  // click sort
  const handleSortClick = (value: string) => {
    dispatch({
      type: "SET_SORT",
      payload: { sort: value },
    });
  };

  return (
    <div className="flex justify-between">
      {type === "Home" ? (
        <h1 data-cy="activity-title" className="text-36 font-bold">
          {title}
        </h1>
      ) : type === "NewActivity" ? (
        <div className="flex items-center gap-20">
          <div
            data-cy="todo-back-button"
            className="text-36 cursor-pointer"
            onClick={() => handleBack()}
          >
            <ArrowLeft />
          </div>
          {edit ? (
            <input
              autoFocus
              className="text-36 font-bold w-80  rounded-sm border-b-2 focus:outline-none"
              value={title}
              style={{ background: "none" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSetTitle(e)
              }
            />
          ) : (
            <p
              data-cy="todo-title"
              className="text-36 font-bold truncate max-w-[400px]"
            >
              {title ? title : "New Activity"}
            </p>
          )}
          <div
            data-cy="todo-title-edit-button"
            className=" text-20 cursor-pointer"
            onClick={() => setEdit(!edit)}
          >
            <Pen />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex gap-12 relative">
        {type === "NewActivity" && dataEmpty && (
          <Fragment>
            <button
              data-cy="todo-sort-button"
              type="button"
              className="text-14 border hover:brightness-95  rounded-full w-[44px] border-secondary  h-[44px] flex items-center justify-center gap-4 transition duration-300 ease-in-out text-text-secondary-2  relative"
              onClick={() => handleShowSortCard()}
            >
              <div className="text-20">
                <ArrowSort />
              </div>
            </button>
          </Fragment>
        )}
        <div className="absolute top-14  right-0">
          <MySlideDown open={showSortCard as boolean}>
            <div className="  border  border-none rounded-[6px] bg-white h-auto w-[235px] shadow-card">
              <ul className="w-full">
                {sortContent?.map((item, i) => (
                  <li
                    data-cy={item?.value}
                    className="flex justify-between cursor-pointer items-center w-full px-4 h-[52px] hover:bg-secondary transition-colors duration-300 ease-in-out border-b-[1px] border-secondary"
                    key={i}
                    onClick={() => handleSortClick(item.value)}
                  >
                    <div className="flex items-center gap-18">
                      <div className={`text-20 text-red`}>
                        {getIconCode(item?.icon)}
                      </div>
                      <p className="text-14 font-light text-text-secondary-2">
                        {item.text}
                      </p>
                    </div>
                    {state?.activityDetails?.sort === item?.value && (
                      <div>
                        <CheckedIcon />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </MySlideDown>
        </div>
        <div data-cy={pid ? "todo-add-button" : "activity-add-button"}>
          <Button onClick={handleClickButton}>
            {loading ? (
              <Fragment>
                <div className="flex items-center justify-center gap-[1rem] invisible">
                  <Plus />
                  Tambah
                </div>
                <div className="absolute">
                  <Loader color="primary" size={22} />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <Plus />
                Tambah
              </Fragment>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
Header.defaultProps = {
  setTitle: (e) => {},
};

export default Header;
