import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().min(10).max(30).required(),
  password: yup.string().min(5).max(20).required(),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email().min(10).max(30).required(),
  password: yup.string().min(5).max(20).required(),
  fullName: yup.string().max(50).required(),
  phone: yup.string("Phone must be a number").min(5).max(13).required(),
});
