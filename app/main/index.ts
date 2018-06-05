import { ipcMain } from "electron";
import { GET_ROOT_DIR, TEST, TEST_RETURN } from "common/channel/index";
import { getRootDir } from "./handler/index";
import { onM } from "common/kit/main";

ipcMain.on(GET_ROOT_DIR, getRootDir);

onM(TEST, TEST_RETURN, (...args: any[]) => {
  return args.map((s: string) => s.toUpperCase());
});
