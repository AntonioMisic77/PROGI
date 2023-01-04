import React, { useEffect, useState } from "react";
import { useUserData } from '../../hooks/useUserData';
import { Form, Formik, FormikProps } from "formik";
import { UserClient, UserDto } from "../../Api/Api";
import FormSelect from "../FormSelect/FormSelect";
import FormInput from "../FormInput/FormInput";
import { Button } from "@mui/material";
import "./EditProfile.css"
import { schema } from "../../validationSchema/schema.js";
import { schema2 } from "../../validationSchema/schema2.js";
import { roles } from "../../models/Role";


const EditProfile = () => {

   let { user } = useUserData();

   let [editing, setEditing] = useState<boolean>(false);

   const options = [
      { value: "", label: "Odabir uloge" },
      { value: "kartograf", label: "Kartograf" },
      { value: "spasioc", label: "Spasioc" },
      { value: "voditelj", label: "Voditelj" },
   ]

   return (
      <Formik initialValues={{ phonenum: user?.phoneNumber, email: user?.email }}
         validationSchema={schema2}
         onSubmit={async (values) => {
            let client = new UserClient(process.env.REACT_APP_API_URL);
            client.updateUser(
               {
                  phoneNumber: values.phonenum ?? '',
                  email: values.email ?? ''
               }).then(user => {
                  alert("Uspješno promijenjeni podatci");
                  window.location.reload();
               })
         }}
      >
         <Form>
            <div style={{display: "flex", alignItems: "center"}}>
               <h1 className="profile-header" style={{paddingRight: "10px"}}>{editing ? "Uredi profil" : "Korisnički podaci"}</h1>
               { !editing && <Button variant="contained" onClick = {() => setEditing(true)} style={{height: "40%"}}> Uredi </Button>}
            </div>
            

            <div className="profile-unmodifiable">Korisničko ime: {user?.userName}</div>

            <div className="profile-unmodifiable">Ime: {user?.firstName}</div>

            <div className="profile-unmodifiable">Prezime: {user?.lastName}</div>

            <div className="profile-unmodifiable">OIB: {user?.oib}</div>

            <div className="profile-unmodifiable">Uloga: {roles[user?.roleId ?? 0]}</div>

            {
               editing ?
               <>
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
               </>
               :
               <>
                  <div className="profile-unmodifiable">Broj mobitela: {user?.phoneNumber}</div>
                  <div className="profile-unmodifiable">E-mail: {user?.email}</div>
               </>  
            }
            
            
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