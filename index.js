const express = require("express");
const uploadRouter = require("./controllers/upload-file.controller");
const employeeRouter = require("./controllers/crud.controller");
const cityRouter = require("./controllers/cities-crud.controller");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.send("Firebase demo App of nodejs-db-demo Project.");
});

app.use("/upload", uploadRouter);
app.use("/employee", employeeRouter);
app.use("/city", cityRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
