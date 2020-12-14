const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const monthlyRouter = require("./api/monthly");
const dailyRouter = require("./api/daily");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routers
app.use("/monthly", monthlyRouter);
app.use("/daily", dailyRouter);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
})

module.exports = app;