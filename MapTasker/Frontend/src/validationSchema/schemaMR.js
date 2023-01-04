import * as yup from "yup";

const OIBRules = /^\d{11}$/;

export const schemaMR =  yup.object().shape({
    firstname: yup.string().required("Ovo polje je obavezno"),
    lastname: yup.string().required("Ovo polje je obavezno"),
    OIB: yup.string().matches(OIBRules, {message: "Unesite ispravan OIB"}),
    photo: yup.mixed().nullable(),
    reportedAt: yup.date().required("Ovo polje je obavezno")
});