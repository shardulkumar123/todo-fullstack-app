import * as yup from "yup";

export const UserSchema = yup.object().shape({
  user: yup
    .string()
    .required("User is required")
    .min(3, "User must be at least 3 characters"),
  age: yup.number().required("Age is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: yup
    .number()
    .required("Mobile number is required")
    .typeError("Mobile must be a number")
    .test(
      "len",
      "Mobile must be 10 digits",
      (val) => val?.toString().length === 10
    ),
  interest: yup
    .array()
    .of(yup.string())
    .min(1, "At least one interest is required"),
});
