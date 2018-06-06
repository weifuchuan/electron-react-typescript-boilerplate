import { ipcMain } from "electron";
import {
  GET_ROOT_DIR,
  UPDATE_DIR_NODE,
  UPDATE_DIR_NODE_RETURN
} from "common/channel/index";
import { getRootDir, updateDir } from "./handler/index";
import { onM } from "common/kit/main";

ipcMain.on(GET_ROOT_DIR, getRootDir);

onM(UPDATE_DIR_NODE, UPDATE_DIR_NODE_RETURN, (...args: any[]) => {
  return [updateDir(args[0])];
});
