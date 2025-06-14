import { createTransport } from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";
const accountEmail = "davidsoberekon66@gmail.com";
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD,
  },
});

export { transporter, accountEmail };
