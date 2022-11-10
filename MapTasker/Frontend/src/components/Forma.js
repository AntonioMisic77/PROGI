import { Form, Formik } from "formik";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";
import { schema } from "../schemas";
import Photo from "./Photo";


//import { Button } from "react";

const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };    

function Forma() {

    function handleClick() {
        alert('lala');
      }

    return (
        <Formik initialValues={{username:"", password:"", firstname:"", lastname:"", phonenum:"", email:"", role:"", photo:null}}
                validationSchema={schema}
                onSubmit={onSubmit} >
        {(props) => (
            <Form>
                <div className='Reg'>
                <h1>Registracija</h1>
                </div>
                <CustomInput 
                    label="Korisničko ime:"
                    name ="username"
                    type="text"
                    placeholder="Unesite korisničko ime"
                />

                <CustomInput
                    label="Lozinka:"
                    name="password"
                    type="password"
                    placeholder="Unesite lozinku"
                />
                <CustomInput
                    label="Ime:"
                    name="firstname"
                    type="text"
                    placeholder="Unesite svoje ime"
                />
                <CustomInput
                    label="Prezime:"
                    name="lastname"
                    type="text"
                    placeholder="Unesite svoje prezime"
                />
                <CustomInput
                    label="Broj mobitela:"
                    name="phonenum"
                    type="phone"
                    placeholder="Unesite svoj broj mobitela"
                />
                <CustomInput
                    label="E-mail:"
                    name="email"
                    type="email"
                    placeholder="Unesite svoju E-mail adresu"
                />
                <CustomSelect
                    label="Uloga:"
                    name="role"
                    placeholder="Odaberite ulogu za koju se prijavljujete">
                    <option value="">Odabir uloge</option>
                    <option value="kartograf">Kartograf</option>
                    <option value="spasioc">Spasioc</option>
                    <option value="voditelj">Voditelj</option>
                </CustomSelect>
                <Photo /> 

                <button type = 'submit' className='gumbic' onClick={handleClick}>Click to submit</button>

           </Form>  
        )}
        </Formik>
            
 )}
           
 export default Forma;












       