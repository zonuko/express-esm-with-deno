import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
// import { fileURLToPath } from "url";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const app = express();

// const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
// const __filename = fileURLToPath(import.meta.url);
//
// const __dirname = path.dirname(__filename);
const __dirname = new URL(".", import.meta.url).pathname;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
