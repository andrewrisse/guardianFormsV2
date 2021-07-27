import dotenv from "dotenv";
dotenv.config(); // Allows access to .env file variables

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { IndexRouter } from "./controllers/v1/index.router";

import authenticator from './middleware/authenticator';
import connectToDb from './dataLayer/connectToDb';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(authenticator);
app.use("/api/v1", IndexRouter);

app.locals.db =  connectToDb();

// Root URI call
app.get("/", async (req, res) => {
    res.send("/api/v1/")
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${ PORT }`);
    console.log( `press CTRL+C to stop server` );
})
