import * as yup from "yup";


export const schemaMR =  yup.object().shape({
    firstName: yup.string().required("Ovo polje je obavezno"),
    lastName: yup.string().required("Ovo polje je obavezno"),
    OIB: yup.number().moreThan(10000000000, "Unesite ispravan OIB").lessThan(99999999999, "Unesite ispravan OIB").required("Ovo polje je obavezno"),
    photo: yup.mixed().nullable(),
    reportedAt: yup.date().default(function () {
        return new Date();
      })
});