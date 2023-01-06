import * as yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const schema2 =  yup.object().shape({
    phonenum: yup.string().matches(phoneRegExp, {message: "Unesen je neispravan broj mobitela"}).required("Ovo polje je obavezno"),
    email: yup.string().email("Unesena je neispravna e-mail adresa").required("Ovo polje je obavezno"),
});