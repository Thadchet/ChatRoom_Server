// import lib
const Sequelize = require("sequelize");
const express = require("express");
const db = require("../util/db.config");
// define variable
const sequelize = db.sequelize;
const Users = db.Users;
const ChatRooms = db.ChatRooms;
const route = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// get chatRoom all
route.get("/chat-room", async (req, res, next) => {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[1], keys.secretOrKey);
    const chatUser = await ChatRooms.findAll({
        where: { Member: decoded.id },
    });
    res.json(chatUser);
});

// CreateChatRoom
route.post("/create-chat", async (req, res, next) => {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[1], keys.secretOrKey);

    const user = await ChatRooms.create({
        Member: req.body.memberID,
        RoomName: decoded.name
    })
        .then((users) => {
            ChatRooms.findAll({
                attributes: [
                    [sequelize.fn("max", sequelize.col("RoomID")), "maxID"],
                ],
                raw: true,
            }).then((response) => {
                const user = ChatRooms.create({
                    RoomID: response[0].maxID,
                    Member: decoded.id,
                    RoomName: req.body.memberName,
                })
                    .then((users) => {
                        res.status(201);

                        res.json({ message: "Successful" });
                    })
                    .catch((err) => {
                        res.status(500);
                        res.json(err.errors[0]);
                    });
            });
        })
        .catch((err) => {
            res.status(500);
            res.json(err.errors[0]);
        });
});

module.exports = route;
