const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require("./db");
const api = require("./api");
const app = express();
const path = require("path");
var public = path.join(__dirname, '../public/build');

db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use("/api", api);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Stock Service listening on port ${port}!`))
module.exports = app;