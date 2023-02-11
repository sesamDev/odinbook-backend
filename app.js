const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

//Endpoints
const postsAPI = require("./api/posts");
const authAPI = require("./api/auth");
const userAPI = require("./api/user");
const requestAPI = require("./api/request");

require("dotenv").config();

// Authentication
require("./config/passport");

const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
// eslint-disable-next-line no-undef
const mongoDB = process.env.DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// eslint-disable-next-line no-undef
// app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.authenticate("session"));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send("Hello from Odinbooks API. :)"));
app.use("/api/v1/posts", postsAPI);
app.use("/api/v1/auth", authAPI);
app.use("/api/v1/user", userAPI);
app.use("/api/v1/request", requestAPI);

app.use("/", (req, res) => res.sendStatus(400));

module.exports = app;
