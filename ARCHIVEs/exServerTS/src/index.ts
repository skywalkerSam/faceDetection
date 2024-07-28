import express from "express";
import cors from "cors";
import knex from "knex";
import { handleSignIn } from "./controllers/signIn.ts";
import { handleSignUp } from "./controllers/signUp.ts";
import { getProfile } from "./controllers/profile.ts";
import { detectFace, handleImage } from "./controllers/faceDetection.ts";
import { getAnimals } from "./controllers/animals.ts";

const PORT = process.env.PORT || 8080;

const db = knex({
  client: "pg",
  connection: {
    database: process.env.DB,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER,
    password: process.env.DB_USER,
  },
});

// initialize server
const app = express();
app.use(cors());
app.use(express.json()); // json body parser

app.get("/", (req, res) => {
  res.json("Welcome to the Face Detection API...");
});

app.post("/signin", (req, res) => {
  handleSignIn(req, res, db);
});
app.post("/signup", (req, res) => {
  handleSignUp(req, res, db);
});
app.get("/profile/:userId", (req, res) => {
  getProfile(req, res, db);
});
app.put("/image", (req, res) => {
  handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  detectFace(req, res);
});
app.get("/animals", (req, res) => {
  getAnimals(req, res);
});

// start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/animals/`)
);


// Error with the grpc module

// node_modules/@grpc/grpc-js/node_modules/long/umd/index.d.ts:1:18 - error TS1479: The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("../index.js")' call instead.

// 1 import Long from "../index.js";
//                    ~~~~~~~~~~~~~


// Found 1 error in node_modules/@grpc/grpc-js/node_modules/long/umd/index.d.ts:1
