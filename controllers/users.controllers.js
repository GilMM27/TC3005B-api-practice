import User from "../models/users.model.js";
import { getSalt, hash } from "../utils/hash.js";

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};
export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
};
export const postUser = async (req, res) => {
    const {name, username, password} = req.body;
    const salt = getSalt();
    const hashedPassword = hash(password, salt);
    const usar = new User({name, username, password: salt + hashedPassword});
    const user = await usar.save();
    res.status(201).json(user);
};
export const putUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
};
export const delUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
};