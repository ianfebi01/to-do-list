import { useFormikContext } from "formik";
import React, { FunctionComponent, useEffect } from "react";

interface Props {
  setValidDirty: (valid: boolean, dirty: boolean) => void;
}
const HandleDisableFormik: FunctionComponent<Props> = ({ setValidDirty }) => {
  const formik = useFormikContext();
  useEffect(() => {
    setValidDirty(formik.isValid, formik.dirty);
  }, [formik.dirty, formik.isValid]);
  return null;
};

export default HandleDisableFormik;
