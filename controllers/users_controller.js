
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users_model.js";

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "This is is not found" });
        const isCorrectPass = await bcrypt.compare(password, user.password);
        if (!isCorrectPass) return res.status(400).json({ message: "password not correct" })
        const token = jwt.sign({ email: user.email, id: user._id }, "test", { expiresIn: "7d" })
        res.status(200).json({ userInfo: user, token })
    } catch (error) {
        res.status(500).json({ message: "Some thing went wrong" })
    }
}


export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const findUser = await User.findOne({ email });
        if (findUser) return res.status(400).json({ message: "This user is already exist" });
        if (password !== confirmPassword) return res.status(400).json({ message: "password not correct" })
        const cryptPass = await bcrypt.hash(password, 12);
        const user = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: cryptPass
        })
        const token = jwt.sign({email: user.email, id: user._id }, "test", { expiresIn: "7d" })
        res.status(200).json({ userInfo: user, token })
    } catch (error) {
        res.status(500).json({ message: "Some thing went wrong" })
    }
}