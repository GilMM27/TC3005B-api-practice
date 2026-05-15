import crypto from "crypto";

export const getSalt = () => {
    const size = process.env.SALT_SIZE;
    return crypto.randomBytes(5 * size).toString("base64url").substring(0, size);
};

export const hash = (password, salt) => {
    const pepper = process.env.PEPPER;
    return crypto.createHash("sha256").update(password + salt + pepper).digest("hex");
};