const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const chatRoute = require("./routes/chat-route");

app.use("/auth", authRoute);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);
app.use("/chat", passport.authenticate("jwt", { session: false }), chatRoute);

app.listen(8000, () => {
    console.log("Listening on 8000");
});
