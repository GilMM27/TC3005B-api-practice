import User from "../models/users.model.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.password === password) {
        res.status(200).json({
            login: true,
            msg: "ok",
            user: user
        });
    } else {
        res.status(401).json({
            login: false,
            msg: "wrong",
            user: {}
        });
    }
}