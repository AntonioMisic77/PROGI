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

   let { user, userLoaded } = useUserData();

   let [image, setImage] = useState<string>("")
   let [editing, setEditing] = useState<boolean>(false);

   useEffect(()=>{
      if (userLoaded){
         setImage(user?.photo ?? "")
      }
   }, [image, userLoaded])

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
                  email: values.email ?? '',
                  photo: image
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
            
            {
            editing ? <>
               <label className="form-label"> Fotografija: </label>
               <div style={{display:"flex", flexDirection:"column", marginTop: "10px"}}>
                  <input name="photo" accept="image/*" type="file" onChange={uploadImage}/>
                  <img src={image === "" ? "blank-profile-photo.jpeg" : image} style={{maxHeight: "100px", maxWidth: "100px", marginTop: "10px"}}/>
               </div> 
               <button type='submit' className='submit-button'>Click to submit</button>
            </> :
            <>
               <label className="form-label"> Fotografija: </label>
               <img src={image === "" ? "blank-profile-photo.jpeg" : image} style={{maxHeight: "100px", maxWidth: "100px", marginTop: "10px"}}/>
            </>
            }
         </Form>
      </Formik>
   )
};
export default EditProfile;