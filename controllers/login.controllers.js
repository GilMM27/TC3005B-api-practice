import User from "../models/users.model.js";
import { hash } from "../utils/hash.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ login: false, msg: "user not found" });
    }
    const saltSize = parseInt(process.env.SALT_SIZE);
    const salt = user.password.substring(0, saltSize);
    const hashed = hash(password, salt);
    if (user.password === salt + hashed) {
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            login: true,
            msg: "ok",
            user: user,
            token: token
        });
    } else {
        res.status(401).json({
            login: false,
            msg: "wrong",
            user: {}
        });
    }
}