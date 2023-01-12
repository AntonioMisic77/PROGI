import { Form, Formik, FormikProps } from "formik";
import FormSelect from "../FormSelect/FormSelect";
import FormInput from "../FormInput/FormInput";
import { schema } from "../../validationSchema/schema.js";
import { Button } from "@mui/material";
import "./RegistrationForm.css"
import { RegisterClient } from "../../Api/Api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegistrationValues {
   username: string, 
   password: string, 
   firstname: string, 
   lastname: string, 
   phonenum: string, 
   email: string, 
   role: string, 
   OIB: number | null
}

const RegistrationForm = () => {

   let navigate = useNavigate();
   let [image, setImage] = useState<string>("")

   const options = [
      {value: "", label: "Odabir uloge"},
      {value: "kartograf", label: "Kartograf"},
      {value: "spasioc", label: "Spasioc"},
      {value: "voditelj", label: "Voditelj"},
   ]

   const initialValues : RegistrationValues = {
      username: "", 
      password: "", 
      firstname: "", 
      lastname: "", 
      phonenum: "", 
      email: "", 
      role: "", 
      OIB: null 
   }

   const uploadImage = (e: any) => {
      if(e.target.files && e.target.files[0]) {
         let imageFile = e.target.files[0];
         console.log(imageFile);
         const reader = new FileReader();
         reader.onloadend = () => {
            if (typeof reader.result === 'string'){
               setImage(reader.result);
            }
         };
         reader.readAsDataURL(imageFile);
      }
   }

   return (
      <Formik initialValues={initialValues}
         validationSchema={schema}
         onSubmit={ async (values) => {
            let client = new RegisterClient(process.env.REACT_APP_API_URL);
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
                  photo: image,
                  confirmed: false
               })
            navigate("/")
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
            <label className="form-label"> Fotografija: </label>
            <div style={{display:"flex", flexDirection:"column", marginTop: "10px"}}>
               <input name="photo" accept="image/*" type="file" onChange={uploadImage}/>
               <img src={image === "" ? "blank-profile-photo.jpeg" : image} style={{maxHeight: "100px", maxWidth: "100px", marginTop: "10px"}}/>
            </div> 
            <button type='submit' className='submit-button'>Click to submit</button>
         </Form>
      </Formik>
   )
}
export default RegistrationForm