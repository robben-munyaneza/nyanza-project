const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    UserName: { type: String, required: true, unique: true },
    Password: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);