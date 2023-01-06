import * as React from 'react';
import { Form, Formik, FormikProps } from "formik";
import FormInput from "../FormInput/FormInput";
import { schemaMR } from "../../validationSchema/schemaMR.js";
import { Button, TextField } from "@mui/material";
import { MissingReportClient } from '../../Api/Api';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


const FileMissingPerson = () => {

    let [image, setImage] = useState<string>("")

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


     const [value, setValue] = React.useState<Date>(new Date());
     const navigate = useNavigate();

    return(
        <Formik initialValues={{ firstName: "", lastName: "", OIB: null, photo: "", description: null, reportedAt: null, foundAt: undefined}}
         validationSchema={schemaMR}
         onSubmit={async (values) => {
            let client = new MissingReportClient('https://localhost:7270');
            client.createMissingReport({
                id: 0,
                firstName: values.firstName,
                lastName: values.lastName,
                oib: values.OIB ?? 0,
                photo: image,
                description: values.description ?? '',
                reportedAt: values.reportedAt ?? value,
                foundAt: values.foundAt,
                comments: []


            }).then(missingReport => {
                alert("Uspješna prijava nestale osobe!");
                navigate('/missing-reports');
             }).catch(reason => alert("Prijava osobe već postoji"))
         }}
         >

            <Form> 
                <h1 className="missing-header">Prijava nestale osobe</h1>

                <FormInput
                    label="Ime:"
                    name="firstName"
                    type="text"
                    placeholder="Unesite ime"
                    />

                <FormInput
                    label="Prezime:"
                    name="lastName"
                    type="text"
                    placeholder="Unesite prezime"
                />

                <FormInput
                    label="OIB:"
                    name="OIB"
                    type="text"
                    inputMode="numeric"
                    placeholder="Unesite OIB"
                />

                <FormInput
                    label="Opis:"
                    name="description"
                    type="text"
                    placeholder="Unesite opis osobe"
                />

                <FormInput
                    label="Zadnje viđen/a"
                    name="reportedAt"
                    type="date"
                    placeholder="Unesite datum nestanka"
                />
                
                
                <label className="form-label"> Fotografija: </label>
                <div style={{display:"flex", flexDirection:"column", marginTop: "10px"}}>
                    <input name="photo" accept="image/*" type="file" onChange={uploadImage}/>
                    <img src={image === "" ? "blank-profile-photo.jpeg" : image} style={{maxHeight: "100px", maxWidth: "100px", marginTop: "10px"}}/>
                </div> 


                <button type='submit' className='submit-button'>Click to submit</button>

            </Form>

        </Formik>

    );
}

export default FileMissingPerson;