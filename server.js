const express = require("express");
const compression = require('compression');
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const moment = require("moment");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const router = require("./src/routers");
const config = require('./src/config');
const { readFileSync } = require('fs')


app.use(compression())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// console.log('.env', process.env.PORT, process.env.DBURI)
// Server Connection
const port = process.env.PORT || config.port || "8080";
app.set("port", port);
const server = http.createServer(app);
console.log("NODE TIME ===> " + moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
server.listen(port, () => console.log(`API running on ${config.apiURL} \nSwagger UI running on http://localhost:${port}/api-docs`));

// API Router
app.use("/api", router);

app.get('/', function (req, res) {
    res.header('Content-Type', 'text/html; charset=UTF-8')
    const template = readFileSync(path.join(__dirname, 'public', 'index.html'))
        .toString()
        .replace(/%ROOT_URL%/g, config.apiURL)
    res.send(template)
})