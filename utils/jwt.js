import jwt from "jsonwebtoken";

export const validateJWT = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ msg: "no token" });
        return;
    }
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ msg: err.message });
        } else {
            req.user = decoded;
            next();
        }
    });
};