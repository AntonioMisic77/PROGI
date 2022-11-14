import React from "react";
import { FieldHookConfig, useField } from "formik";

import "./FormSelect.css"

interface FormSelectProps {
   label: string,
   options: {value:string, label:string}[]
}

const FormSelect = (props: FormSelectProps & FieldHookConfig<string>) => {
   const [field, meta] = useField(props);

   return (
      <>
         <label className="form-label">{props.label}</label>
         <select
            {...field}
            className="form-select"
            style={{ borderColor: (meta.touched && meta.error) ? "#fc8181" : "white" }}
         >
            {props.options.map(option => <option value={option.value}>{option.label}</option>)}
         </select>
         {meta.touched && meta.error && <div className="error">{meta.error}</div>}
      </>
   );
};
export default FormSelect;