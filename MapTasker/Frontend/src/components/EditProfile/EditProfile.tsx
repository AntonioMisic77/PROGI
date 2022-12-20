import React, { useEffect } from "react";
import { useUserData } from '../../hooks/useUserData';
import { schema } from "../../validationSchema/schema.js";
import { Form, Formik, FormikProps } from "formik";
import { UserClient, UserDto } from "../../Api/Api";
import FormSelect from "../FormSelect/FormSelect";
import FormInput from "../FormInput/FormInput";
import { Button } from "@mui/material";




const EditProfile = () => {

    let {user} = useUserData();

    const options = [
        {value: "", label: "Odabir uloge"},
        {value: "kartograf", label: "Kartograf"},
        {value: "spasioc", label: "Spasioc"},
        {value: "voditelj", label: "Voditelj"},
     ]
    
    

    return (
        <Formik initialValues={{ username: user?.userName, password: user?.password, firstname: user?.firstName, lastname: user?.lastName, phonenum: user?.phoneNumber, email: user?.email, role: user?.roleId, photo: user?.photo, OIB: user?.oib }}
         validationSchema={schema}
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
                  roleId : options.findIndex(op => op.value === "" + values.role),
                  photo: "https://imgur.com/gallery/o0dYwkQ",
                  confirmed: true   
               }).then(user => {    
                  alert("Uspješno promijenjeni podatci");
               }).catch(reason => alert("Korisnik s tim podatcima već postoji"))
               
         }}
        >
            <Form> 
            <h1>Uredi profil</h1>
            <FormInput
               label="Korisničko ime:"
               name="username"
               type="text"
               readOnly={true}
               disabled={true}
               placeholder={user?.userName}
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
               readOnly={true}
               disabled={true}
               placeholder={user?.firstName}
            />
            <FormInput
               label="Prezime:"
               name="lastname"
               type="text"
               readOnly={true}
               disabled={true}
               placeholder={user?.lastName}
            />
            <FormInput
               label="OIB:"
               name="OIB"
               type="text"
               inputMode="numeric"
               readOnly={true}
               disabled={true}
               placeholder={""+user?.oib}
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
               readOnly={true}
               disabled={true}
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
};
export default EditProfile;