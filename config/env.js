import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  ARCJET_KEY,
  ARCJET_ENV,
  QSTASH_URL,
  QSTASH_TOKEN,
  EMAIL_PASSWORD,
  SERVER_URL,
  MONGO_URI,
  JWT_SECRET,
  JWT_LIFETIME,
} = process.env;
