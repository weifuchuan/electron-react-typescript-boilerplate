"use strict";
exports.__esModule = true;
var fs = require("fs");
fs.unlinkSync("app");
fs.renameSync("__init_app", "app");
