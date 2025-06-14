import BadRequest from "../Errors/BadRequest.js";
import usersmodel from "../models/usersmodel.js";

const getAllUsers = async (req, res) => {
  const users = await usersmodel.find({});
  res.status(200).json({
    success: true,
    data: users,
  });
};

const getuser = async (req, res) => {
  const { id } = req.params;
  const user = await usersmodel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await usersmodel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: updatedUser,
  });
};
const createUser = async (req, res) => {
  const newUser = await usersmodel.create(req.body);
  res.status(200).json({
    success: true,
    data: newUser,
  });
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await usersmodel.findByIdAndDelete(id);
  if (!deletedUser) throw new BadRequest(`Cannot find Id for ${id}`);
  res.status(200).json({
    success: true,
    data: deletedUser,
  });
};

export { getuser, getAllUsers, updateUser, deleteUser, createUser };
