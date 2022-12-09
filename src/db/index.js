const dbConfig = require('./config');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.User = require("./users.model")(mongoose);
db.Collection = require("./collections.model")(mongoose);

module.exports = db;
