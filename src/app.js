import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "./auth/passport.js";

import routes from "./routes/index.js";

export const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", routes);
