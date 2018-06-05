import { observable } from "mobx";
import { ipcRenderer } from "electron";
import * as E from "electron";
import {
  GET_ROOT_DIR,
  
  IGetRootDirReturnValue
} from "common/channel";
import { FileTree, DirNode } from "common/types";

export class Store {
  @observable fileTree: FileTree;

  constructor() {
    const msg: IGetRootDirReturnValue = ipcRenderer.sendSync(GET_ROOT_DIR);
    if (msg.err) {
      console.error(msg.err); 
      window.alert(msg.err);
      E.remote.app.quit();
    } else {
      if (msg.fileTree) this.fileTree = observable(msg.fileTree);
    }
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
