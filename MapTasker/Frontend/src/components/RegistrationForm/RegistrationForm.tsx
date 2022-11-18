import { Form, Formik, FormikProps } from "formik";
import FormSelect from "../FormSelect/FormSelect";
import FormInput from "../FormInput/FormInput";
import { schema } from "../../validationSchema/schema.js";
import { Button } from "@mui/material";

import "./RegistrationForm.css"
import { RegisterClient } from "../../Api/Api";
import { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {

   const options = [
      {value: "", label: "Odabir uloge"},
      {value: "kartograf", label: "Kartograf"},
      {value: "spasioc", label: "Spasioc"},
      {value: "voditelj", label: "Voditelj"},
   ]

   const initialValues ={
      username: '', 
      password: '', 
      firstname: '', 
      lastname: "", 
      phonenum: "", 
      email: "", 
      role: "", 
      photo: null,
      OIB: null 
   }


   const [values, setValues] = useState(initialValues);

   const uploadFile = (e) => {
        if(e.target.files && e.target.files[0]) {
         let imageFile = e.target.files[0];
         const reader = new FileReader();
         reader.onload = x => {
            setValues({
               ...values,
               photo: imageFile
            })
         }
         console.log(imageFile)
         reader.readAsDataURL(imageFile)
        } else {
            setValues({
               ...values,
               photo: null,
            })
        }
        console.log(values.photo)
   }

   return (
      <Formik initialValues={initialValues}
         validationSchema={schema}
         onSubmit={async (values) => {
            let client = new RegisterClient("https://localhost:7270");
            client.register(
               {
                  oib: values.OIB ?? 0,
                  userName: values.username,
                  password: values.password,
                  firstName: values.firstname,
                  lastName: values.lastname,
                  phoneNumber: values.phonenum,
                  email: values.email,
                  roleId : options.findIndex(op => op.value === values.role),
                  photo: values.photo,
               }).then(res => axios.post("/public/images", values.photo)).then(user => alert("Uspješna registracija"))
               .catch(reason => alert("Korisnik već postoji"))
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
               label="OIB:"
               name="OIB"
               type="text"
               inputMode="numeric"
               placeholder="Unesite svoj OIB"
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
               <Button variant="contained" component="label">
                  Upload
                  <input name="photo" hidden accept="image/*" type="file" onChange={uploadFile}/>
               </Button>
            </div>
            <button type='submit' className='submit-button'>Click to submit</button>
         </Form>
      </Formik>

   )
}

export default RegistrationForm;












