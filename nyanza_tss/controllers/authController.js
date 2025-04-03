const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
    const { UserName, Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);
    
    try {
        const newUser = await User.create({ UserName, Password: hashedPassword });
        res.status(201).json({ message: "✅ User registered", userId: newUser._id });
    } catch (err) {
        res.status(400).json({ error: "❌ User already exists" });
    }
};

exports.login = async (req, res) => {
    const { UserName, Password } = req.body;
    const user = await User.findOne({ UserName });

    if (!user || !(await bcrypt.compare(Password, user.Password)))
        return res.status(400).json({ error: "❌ Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userId: user._id });
};
