import express from "express";
import notes from "./notes";
import user from "./user";
import * as bodyParser from "body-parser";
import { logging as httpLogger } from "../../../packages/common/src/middleware";

const app = express();
app.use(bodyParser.json());
app.use(httpLogger);
app.use("/notes", notes);
app.use("/users", user);
console.log("notes");


export default app;
