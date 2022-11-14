import * as React from 'react';
import { Form, Formik } from "formik";
import FormInput from "../FormInput/FormInput";

import "./LoginForm.css"

const LoginForm = () => {

   return (
      <Formik initialValues={{ username: "", password: "" }}
         onSubmit={async (values) => {
            console.log(values);
         }}
         >
         <Form>
            <h1 className="login-header">Prijava</h1>
            <FormInput
               label="Korisničko ime:"
               name="username"
               type="text"
               placeholder="Unesite korisničko ime"
            />

            <FormInput
               label="Lozinka:"
               name="password"
               type="password"
               placeholder="Unesite lozinku"
            />
            <button type='submit' className='submit-button'>Prijavi se</button>
         </Form>
      </Formik>

   )
}

export default LoginForm;












