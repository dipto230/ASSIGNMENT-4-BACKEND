const jwt = require("jsonwebtoken")

exports.generateAccessToken = (user) => 
    jwt.sign({ id: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "7d",
    });

exports.generateRefreshToken = (user) =>
    jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    })