import React, { useEffect } from "react";
import { useUserData } from '../../hooks/useUserData';
import { Form, Formik, FormikProps } from "formik";
import { UserClient, UserDto } from "../../Api/Api";
import FormSelect from "../FormSelect/FormSelect";
import FormInput from "../FormInput/FormInput";
import { Button } from "@mui/material";
import "./EditProfile.css"
import { schema } from "../../validationSchema/schema.js";
import { schema2 } from "../../validationSchema/schema2.js";



const EditProfile = () => {

   let { user } = useUserData();

   const options = [
      { value: "", label: "Odabir uloge" },
      { value: "kartograf", label: "Kartograf" },
      { value: "spasioc", label: "Spasioc" },
      { value: "voditelj", label: "Voditelj" },
   ]

   return (
      <Formik initialValues={{ username: user?.userName, password: user?.password, firstname: user?.firstName, lastname: user?.lastName, phonenum: user?.phoneNumber, email: user?.email, role: user?.roleId, photo: user?.photo, OIB: user?.oib }}
         validationSchema={schema2}
         onSubmit={async (values) => {
            let client = new UserClient(process.env.REACT_APP_API_URL);
            client.updateUser(
               {
                  oib: values.OIB ?? 0,
                  userName: values.username,
                  password: values.password !== undefined ? values.password : '',
                  firstName: values.firstname !== undefined ? values.firstname : '',
                  lastName: values.lastname !== undefined ? values.lastname : '',
                  phoneNumber: values.phonenum !== undefined ? values.phonenum : '',
                  email: values.email !== undefined ? values.email : '',
                  roleId: options.findIndex(op => op.value === "" + values.role),
                  photo: "https://imgur.com/gallery/o0dYwkQ",
                  confirmed: true
               }).then(user => {
                  alert("Uspješno promijenjeni podatci");
               })
         }}
      >
         <Form>
            <h1 className="profile-header">Uredi profil</h1>
            <div className="profile-unmodifiable">Korisničko ime: {user?.userName}</div>

            <FormInput
               label="Lozinka:"
               name="password"
               type="password"
               placeholder="Unesite lozinku"
            />
            <div className="profile-unmodifiable">Ime: {user?.firstName}</div>

            <div className="profile-unmodifiable">Prezime: {user?.lastName}</div>

            <div className="profile-unmodifiable">OIB: {user?.oib}</div>

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
            <div className="profile-unmodifiable">Uloga: {user?.roleId}</div>

            
            <div className='photo'>
               <label>Fotografija</label>
               <Button variant="contained" component="label" role="button" onClick={() => { }} style={{ marginLeft: "1vw" }}>
                  Upload
               </Button>
            </div>
            <button type='submit' className='submit-button'>Click to submit</button>
         </Form>
      </Formik>
   )
};
export default EditProfile;