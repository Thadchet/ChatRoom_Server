// import lib
const express = require("express");
const db = require("../util/db.config");
// define variable
const sequelize = db.sequelize;
const Users = db.Users;
const Friends = db.Friends;
const route = express.Router();

const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

const _ = require("lodash");

// get blog with id
route.get("/ping", async (req, res, next) => {
    console.log("body::==", req.body);
    console.log("params::==", req.params);

    res.json({ message: "Ping" });
});

// GetMyUser
route.get("/get-user", async (req, res, next) => {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[1], keys.secretOrKey);
    const user = await Users.findOne({
        attributes: ["ID", "Username", "Password", "Status", "Profile"],
        where: { ID: decoded.id },
    })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500);
            res.json(err.errors[0]);
        });
});

// FindUser
route.post("/find-user", async (req, res, next) => {
    console.log("body::==", req.body);
    const user = await Users.findOne({
        attributes: ["ID", "Username", "Password", "Status", "Profile"],
        where: { Username: req.body.username },
    })
        .then((users) => {
            if (users) {
                res.json(users);
            } else {
                res.json({ message: "Not Found" });
            }
        })
        .catch((err) => {
            res.status(500);
            res.json(err.errors[0]);
        });
});

// GetFriend
route.get("/get-friend", async (req, res, next) => {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[1], keys.secretOrKey);
    const friend = await Friends.findAll({
        where: { ID: decoded.id },
        include: {
            model: Users,
            required: true,
            attributes: ["ID", "Username", "Status", "Profile"],
        },
    });
    const ress = _.map(_.map(friend, _.partialRight(_.pick, "User")), "User");
    res.json(ress);
});

module.exports = route;
