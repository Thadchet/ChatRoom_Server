// import lib
const express = require("express");
const db = require("../util/db.config");
// define variable
const sequelize = db.sequelize;
const Users = db.Users;
const route = express.Router();

const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

// get blog with id
route.post("/login", async (req, res, next) => {
    console.log("body::==", req.body);
    console.log("params::==", req.params);
    const usernameReq = req.body.username;
    const passwordReq = req.body.password;

    const user = await Users.findOne({
        attributes: ["ID", "Username", "Password"],
        where: { Username: usernameReq },
    })
        .then((users) => {
            if (!users) {
                res.status(500);
                res.json({ message: "User not found" });
            }
            if (users.Password === passwordReq) {
                const payload = {
                    id: users.ID,
                    name: users.Username,
                };
                jwt.sign(
                    payload,
                    "chat-room",
                    {
                        // expiresIn: 31556926, // 1 year in seconds
                        expiresIn: 31556926,
                    },
                    (err, token) => {
                        res.json({
                            token: "Bearer " + token,
                        });
                    }
                );
            } else {
                res.status(500);
                res.json({ message: "Password incorrect" });
            }
        })
        .catch((err) => {
            res.status(500);
            res.json(err.errors);
        });
});

// Register
route.post("/register", async (req, res, next) => {
    console.log("body::==", req.body);
    console.log("params::==", req.params);
    const usernameReq = req.body.username;
    const passwordReq = req.body.password;
    const user = await Users.create({
        Username: usernameReq,
        Password: passwordReq,
        Status: "",
        Profile: "",
    })
        .then((users) => {
            console.log(users);
            res.json({ message: "Successful" });
        })
        .catch((err) => {
            res.status(500);
            res.json(err.errors[0]);
        });
});

module.exports = route;
