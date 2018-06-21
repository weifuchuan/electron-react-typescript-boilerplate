import fs = require("fs");
import path = require("path");

function rmDir(filepath: string) {
  // Uncatch exception, if someone unaccessable, it should throw
  fs.accessSync(filepath);
  const stat = fs.statSync(filepath);
  if (stat.isDirectory()) {
    fs.readdirSync(filepath).forEach(file => {
      const filepath2 = path.join(filepath, file);
      fs.accessSync(filepath);
      const stat = fs.statSync(filepath);
      if (stat.isDirectory()) {
        rmDir(filepath2);
      } else {
        fs.unlinkSync(filepath2);
      }
    });
    fs.rmdirSync(filepath);
  } else {
    return;
  }
}

rmDir("app");
fs.renameSync("__init_app", "app");
