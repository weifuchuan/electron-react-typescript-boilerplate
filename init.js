"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function rmDir(filepath) {
    // Uncatch exception, if someone unaccessable, it should throw
    fs.accessSync(filepath);
    var stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
        fs.readdirSync(filepath).forEach(function (file) {
            var filepath2 = path.join(filepath, file);
            fs.accessSync(filepath);
            var stat = fs.statSync(filepath);
            if (stat.isDirectory()) {
                rmDir(filepath2);
            }
            else {
                fs.unlinkSync(filepath2);
            }
        });
        fs.rmdirSync(filepath);
    }
    else {
        return;
    }
}
rmDir("app");
fs.renameSync("__init_app", "app");
