import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const schema2 =  yup.object().shape({
    password: yup.string().min(5, "Lozinka mora sadržavati najmanje 5 znakova").matches(passwordRules, {message: "Lozinka mora sadržavati znamenke, velika i mala slova"}).required("Ovo polje je obavezno"),
    phonenum: yup.string().matches(phoneRegExp, {message: "Unesen je neispravan broj mobitela"}).required("Ovo polje je obavezno"),
    email: yup.string().email("Unesena je neispravna e-mail adresa").required("Ovo polje je obavezno"),
    photo: yup.mixed().nullable(),
});