import * as React from 'react';
import { Form, Formik, FormikProps } from "formik";
import FormInput from "../FormInput/FormInput";
import { schemaMR } from "../../validationSchema/schemaMR.js";
import { Button } from "@mui/material";
import { MissingReportClient } from '../../Api/Api';
import { isDate } from 'util/types';
import { format } from 'date-fns'


let date = new Date();

//dodati argumente kod createMissingReport

const FileMissingPerson = () => {
    return(
        <Formik initialValues={{ firstName: "", lastName: "", OIB: null, photo: "", description: null, reportedAt: null, foundAt: null}}
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
                reportedAt: values.reportedAt ?? date,
                foundAt: values.foundAt ?? date,
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
                    label="Opis:"
                    name="description"
                    type="text"
                    placeholder="Unesite opis osobe"
                />

                <FormInput
                    label="Zadnje viđen/a:"
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