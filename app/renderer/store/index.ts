import { observable } from "mobx";
import { ipcRenderer } from "electron";
import * as electron from "electron";
import {
  GET_ROOT_DIR,
  GET_ROOT_DIR_RETURN,
  IGetRootDirReturnMsg
} from "common/channel";
import { FileTree, DirNode, Node } from "common/types";

export class Store {
  @observable fileTree: FileTree;

  constructor() {
    ipcRenderer.once(
      GET_ROOT_DIR_RETURN,
      (event: electron.IpcMessageEvent, ft: IGetRootDirReturnMsg) => {
        this.fileTree = observable(ft);
      }
    );
    ipcRenderer.send(GET_ROOT_DIR);
  }

  async update(...dirs: string[]) {
    if (checkDirs(this.fileTree.root, dirs)) {
      
    } else {
      throw "dirs is illlegal";
    }
  }
}

function checkDirs(dir: DirNode, dirs: string[]): boolean {
  let node: DirNode = dir;
  for (let i = 0; i < dirs.length; i++) {
    if (dirs[i] === node.name) {
      if (i < dirs.length - 1) {
        const next = node.dirs.find(d => d.name === dirs[i + 1]);
        if (next) {
          node = next;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
  return true;
}

export default new Store();
