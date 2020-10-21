const express = require("express");
const compression = require('compression');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const moment = require("moment");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const router = require("./src/routers");


app.use(compression())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// console.log('.env', process.env.PORT, process.env.DBURI)
// Server Connection
const port = process.env.PORT || "8080";
app.set("port", port);
const server = http.createServer(app);
console.log("NODE TIME ===> " + moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
server.listen(port, () => console.log(`API running on localhost:${port}`));

// API Router
app.use("/api", router);