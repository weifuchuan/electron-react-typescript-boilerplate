"use strict";
exports.__esModule = true;
var fs = require("fs");
fs.rmdirSync("app");
fs.renameSync("__init_app", "app");
