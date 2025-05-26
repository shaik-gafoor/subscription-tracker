import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_ADDRESS } from "./env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

export default transporter;
