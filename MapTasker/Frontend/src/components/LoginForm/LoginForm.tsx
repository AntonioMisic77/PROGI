import * as React from 'react';
import { Form, Formik } from "formik";
import FormInput from "../FormInput/FormInput";

import "./LoginForm.css"
import { LoginClient } from '../../Api/Api';

const LoginForm = () => {

   return (
      <Formik initialValues={{ email: "", password: "" }}
         onSubmit={async (values) => {
            let client = new LoginClient("https://localhost:7270");
            client.login(values).then(token => {
               localStorage.setItem("Bearer token", "Bearer " + token)
               alert("Uspješan login")
            }).catch(err => alert("Neispravan email ili lozinka"))
         }}
         >
         <Form>
            <h1 className="login-header">Prijava</h1>
            <FormInput
               label="E-mail:"
               name="email"
               type="text"
               placeholder="Unesite email"
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












