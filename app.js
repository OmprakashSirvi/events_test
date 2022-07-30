const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/errorController");

const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.get("/api/v3/app/events/:id", async (req, res, next) => {});

app.use("/api/v3/app/events", eventRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
