const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { environment } = require("./config");
const isProduction = environment === "production";

const routes = require("./routes");

//Initialize the Express application:
const app = express();
//Connect the morgan middleware for logging information about requests and responses:
app.use(morgan("dev"));
//Cookie Parse middleware for parsing cookies
app.use(cookieParser());
app.use(express.json());
//routes

//Security middleware
if (!isProduction) {
  app.use(cors());
}
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);
// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(routes);

module.exports = app;
