import * as yup from "yup";
const addOfferSchema = yup.object().shape({
    category: yup
      .string()
      .required()
      .oneOf(["internship", "partTime", "fullTime"]),
    description: yup.string().required(),
    requirements: yup.array().of(yup.string().nullable()).required().min(1),
    name: yup.string().required(),
    mode: yup.string().required().oneOf(["local", "remote"]),
  });

const updateOfferSchema = yup.object().shape({
  fullName: yup.string().required().max(255),
  gender: yup.string().required().max(255).oneOf(["male", "female", "other"]),
});


export {
    addOfferSchema,
  updateOfferSchema,
};
