import * as React from 'react';
import { Form, Formik, FormikProps } from "formik";
import FormInput from "../FormInput/FormInput";
import { schemaMR } from "../../validationSchema/schemaMR.js";
import { Button, TextField } from "@mui/material";
import { MissingReportClient } from '../../Api/Api';

const maskMap = {
    hrv:"____-__-__"
  };


const FileMissingPerson = () => {


     const [value, setValue] = React.useState<Date>(new Date());

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
                photo: "./dwayne-the-rock-.jpg",
                description: values.description ?? '',
                reportedAt: values.reportedAt ?? value,
                foundAt: values.foundAt,
                comments: []


            }).then(missingReport => {
                alert("Uspješna prijava nestale osobe!");
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
                    name="lastname"
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
                
                

                <div className='photo'>
                    <label>Fotografija</label>
                    <Button variant="contained" component="label" role="button" onClick={() => {}} style={{marginLeft:"1vw"}}>
                        Upload
                    </Button>
                </div>

                <button type='submit' className='submit-button'>Click to submit</button>

            </Form>

        </Formik>

    );
}

export default FileMissingPerson;