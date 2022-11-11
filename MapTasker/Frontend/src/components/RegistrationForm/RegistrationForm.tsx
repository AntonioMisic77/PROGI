import { Form, Formik, FormikProps } from "formik";
import FormSelect from "../FormSelect/FormSelect";
import FormInput from "../FormInput/FormInput";
import { schema } from "../../validationSchema/schema.js";
import { Button } from "@mui/material";

import "./RegistrationForm.css"

const RegistrationForm = () => {

   const options = [
      {value: "", label: "Odabir uloge"},
      {value: "kartograf", label: "Kartograf"},
      {value: "spasioc", label: "Spasioc"},
      {value: "voditelj", label: "Voditelj"},
   ]

   return (
      <Formik initialValues={{ username: "", password: "", firstname: "", lastname: "", phonenum: "", email: "", role: "", photo: null }}
         validationSchema={schema}
         onSubmit={async (values) => {
            console.log(values);
         }}
         >
         <Form>
            <h1 className="register-header">Registracija</h1>
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
            <FormInput
               label="Ime:"
               name="firstname"
               type="text"
               placeholder="Unesite svoje ime"
            />
            <FormInput
               label="Prezime:"
               name="lastname"
               type="text"
               placeholder="Unesite svoje prezime"
            />
            <FormInput
               label="Broj mobitela:"
               name="phonenum"
               type="phone"
               placeholder="Unesite svoj broj mobitela"
            />
            <FormInput
               label="E-mail:"
               name="email"
               type="email"
               placeholder="Unesite svoju E-mail adresu"
            />
            <FormSelect
               label="Uloga:"
               name="role"
               placeholder="Odaberite ulogu za koju se prijavljujete"
               options={options}
               > 
            </FormSelect>
            <div className='photo'>
               <label>Fotografija</label>
               <Button variant="contained" component="label" role="button" onClick={() => {}} style={{marginLeft:"1vw"}}>
                  Upload
               </Button>
            </div>
            <button type='submit' className='submit-button'>Click to submit</button>
         </Form>
      </Formik>

   )
}

export default RegistrationForm;












