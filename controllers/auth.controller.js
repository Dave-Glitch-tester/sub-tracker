import usersmodel from "../models/usersmodel.js";
import { startSession } from "mongoose";
import { BadRequest, unAuthenticatedError } from "../Errors/index.js";

const login = async (req, res) => {
  // const session = await startSession()
  // session.startTransaction()
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequest("Please provide email and password");

  const user = await usersmodel.findOne({ email });
  if (!user) throw new BadRequest("User not found");

  const isPasswordcorrect = await user.comparePassword(password);
  console.log(isPasswordcorrect);
  if (!isPasswordcorrect)
    throw new unAuthenticatedError("Invalid crendentials");
  const token = await user.createJwt();
  res.status(200).json({
    success: true,
    token,
  });
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequest("Name, Email and Password must be included");

  const existingUser = await usersmodel.findOne({ email });
  if (existingUser) throw new BadRequest("User already Exist");

  const newUser = new usersmodel({
    name,
    email,
    password,
  });
  await newUser.save();
  const token = await newUser.createJwt();
  res.status(201).json({
    success: true,
    token,
  });
};

const logout = (req, res) => {
  res.json({ message: "logout Routes" });
};

export { login, logout, register };
