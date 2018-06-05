import { ipcMain } from "electron";
import { GET_ROOT_DIR } from "common/channel/index";
import { getRootDir } from "./handler/index";
// import * as electron from 'electron'

ipcMain.on(GET_ROOT_DIR, getRootDir);
