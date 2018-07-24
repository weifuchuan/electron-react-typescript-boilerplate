"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function rmDir(dir) {
    // Uncatch exception, if someone unaccessable, it should throw
    fs.accessSync(dir);
    var stat = fs.statSync(dir);
    if (stat.isDirectory()) {
        fs.readdirSync(dir).forEach(function (file) {
            var filepath2 = path.join(dir, file);
            fs.accessSync(filepath2);
            var stat = fs.statSync(filepath2);
            if (stat.isDirectory()) {
                rmDir(filepath2);
            }
            else {
                fs.unlinkSync(filepath2);
            }
        });
        fs.rmdirSync(dir);
    }
    else {
        return;
    }
}
rmDir("app");
fs.renameSync("__init_app", "app");
fs.unlinkSync("./init.ts");
fs.unlinkSync("./init.js");
