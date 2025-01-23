import express from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import userRouter from "./routes/dados.routes.js"
const app = express();
app.use(express.static(__dirname + "/../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/", userRouter);

export default app;