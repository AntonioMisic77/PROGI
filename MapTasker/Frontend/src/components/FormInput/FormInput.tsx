import React from "react";
import { FieldHookConfig, useField } from 'formik';

import "./FormInput.css"

interface FormInputProps {
   label: string,
}

const FormInput = (props: FormInputProps & FieldHookConfig<string>) => {
   const [field, meta] = useField(props);

   return (
      <>
         <label className="form-label">{props.label}</label>
         <input
            {...field}
            placeholder={props.placeholder}
            type={props.type}
            className="form-input"
            style={{ borderColor: (meta.touched && meta.error) ? "#fc8181" : "white" }}
         />
         {meta.touched && meta.error && <div className="error">{meta.error}</div>}
      </>
   );
};
export default FormInput;