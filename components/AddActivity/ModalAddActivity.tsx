"use client";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "../Modal";
import { ArrowDown, Dot } from "../Icons";
import MySlideDown from "../MySlideDown";
import { PriorityContent, priorityContent } from "@/utils/PriorityContent";
import PriorityItemList from "./PriorityItemList";
import { ErrorMessage, FastField, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { ActivityContext } from "@/context/ActivityContext";
import axios, { AxiosResponse } from "axios";

interface Props {
  show: boolean;
  setShow: (val: boolean) => void;
  pid: number;
}

const ModalAddActivity: FunctionComponent<Props> = ({ show, setShow, pid }) => {
  const [priorityTogle, setPriorityTogle] = useState<boolean>(false);
  const [selectedPriority, setSelectedPriority] = useState<PriorityContent>({
    text: "",
    color: "",
    value: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  interface Form {
    title: string;
    priority: string;
    is_active?: number | boolean;
  }
  const [form, setForm] = useState<Form>({
    title: "",
    priority: "very-high",
    is_active: true,
  });

  const getPriorityActive = (value: string) => {
    const tmp = priorityContent.find((item) => item.value === value);
    if (tmp) {
      setSelectedPriority(tmp);
    }
  };

  useEffect(() => {
    getPriorityActive(form.priority);
  }, [form.priority]);

  const handleListClick = (value: string) => {
    setForm({ ...form, priority: value });
    setPriorityTogle(false);
  };

  // Form
  // Validate
  const validator = Yup.object({
    title: Yup.string().required("Name is required"),
  });

  // submit
  const { state, dispatch } = useContext(ActivityContext);

  const handleSubmit = async (values: { title: string }, submitProps: any) => {
    try {
      setLoading(true);
      setForm({ ...form, title: values.title, is_active: 1 });
      const res: AxiosResponse<Form> = await axios.post(`/api-web/todo-items`, {
        ...form,
        title: values.title,
        activity_group_id: pid,
      });
      if (res) {
        dispatch({
          type: "PUSH_DATA",
          payload: { ...res.data },
        });
      }
      submitProps.resetForm();
      setShow(false);
      setForm({ title: "", priority: "very-high", is_active: 1 });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleButtonSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const formRef = useRef<FormikProps<{ title: string }>>(null);

  return (
    <div data-cy="modal-add">
      <Modal
        dataCyTitle="modal-add-title"
        dataCyAction="modal-add-save-button"
        show={show}
        actionPositive={() => handleButtonSubmit()}
        loading={loading}
        disable={!formRef?.current?.dirty}
      >
        <div>
          <Formik
            enableReinitialize
            initialValues={{ title: form.title }}
            validationSchema={validator}
            onSubmit={handleSubmit}
            innerRef={formRef}
          >
            {(formik) => (
              <Form>
                <label
                  data-cy="modal-add-name-title"
                  htmlFor="name"
                  className="block mb-2 text-12 font-medium text-gray-900 dark:text-gray-900"
                >
                  NAMA LIST ITEM
                </label>
                <div data-cy="modal-add-name-input">
                  <FastField
                    type="text"
                    name="title"
                    id="name"
                    className="z-20 w-full font-light border rounded-[6px] border-[#E5E5E5] focus:border-primary focus:ring-0 placeholder-[#A4A4A4]"
                    placeholder="Tambahkan Nama List Item"
                    onChange={formik?.handleChange("title")}
                  />
                </div>

                <span className="error-message">
                  <ErrorMessage name="title">
                    {(msg) => (
                      <div className="text-12 text-red mt-2 ml-2">{msg}</div>
                    )}
                  </ErrorMessage>
                </span>
                {/* <button type="submit" disabled={!formik.isValid}>
                Submit
              </button> */}
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <label
            data-cy="modal-add-priority-title"
            htmlFor="priority"
            className="block mb-2 text-12 font-medium text-gray-900 dark:text-gray-900"
          >
            PRIORITY
          </label>

          <div className="relative h-[42px]">
            <div className="absolute top-0 border rounded-[6px] border-[#E5E5E5] focus:border-primary">
              <button
                data-cy="modal-add-priority-dropdown"
                className={`flex justify-between w-[205px]  px-3 h-[42px]  items-center transition-colors duration-300 ease-in-out border border-none rounded-tl-[4px] rounded-tr-[4px] ${
                  priorityTogle &&
                  "border-b-[1px] border-secondary bg-secondary"
                }`}
                onClick={() => {
                  setPriorityTogle(!priorityTogle);
                }}
              >
                {priorityTogle ? (
                  <div className="flex items-center gap-8 ">
                    <p className="text-16 font-light">Pilih Priority</p>
                  </div>
                ) : (
                  <PriorityItemList item={selectedPriority} />
                )}

                <div
                  className={`rotate-180 ${
                    priorityTogle && "rotate-0"
                  } transition-transform duration-300 ease-in-out`}
                >
                  <ArrowDown />
                </div>
              </button>

              <MySlideDown open={priorityTogle}>
                <div className=" bg-white w-[205px] border  border-none rounded-[6px]">
                  <ul className="w-full">
                    {priorityContent?.map((item, i) => (
                      <li
                        data-cy="modal-add-priority-item"
                        className="flex justify-between cursor-pointer items-center w-full px-3 h-[42px] hover:bg-secondary transition-colors duration-300 ease-in-out border-b-[1px] border-secondary"
                        key={i}
                        onClick={(value) => handleListClick(item.value)}
                      >
                        <PriorityItemList item={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </MySlideDown>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalAddActivity;
