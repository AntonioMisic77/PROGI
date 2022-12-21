import { Form, Formik, FormikProps } from "formik";
import FormSelect from "../FormSelect/FormSelect";
import FormInput from "../FormInput/FormInput";
import { schema } from "../../validationSchema/schema.js";
import { Button } from "@mui/material";
import "./RegistrationForm.css"
import { RegisterClient } from "../../Api/Api";

const RegistrationForm = () => {

   const options = [
      {value: "", label: "Odabir uloge"},
      {value: "kartograf", label: "Kartograf"},
      {value: "spasioc", label: "Spasioc"},
      {value: "voditelj", label: "Voditelj"},
   ]

   return (
      <Formik initialValues={{ username: "", password: "", firstname: "", lastname: "", phonenum: "", email: "", role: "", photo: null, OIB: null }}
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
                  photo: "https://imgur.com/gallery/o0dYwkQ",
                  confirmed: false
               }).then(user => {
                  alert("Pričekajte odobrenje administratora");
               })
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












