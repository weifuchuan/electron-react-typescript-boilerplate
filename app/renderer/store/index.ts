import { observable } from "mobx";
import { ipcRenderer } from "electron";
import * as E from "electron";
import {
  GET_ROOT_DIR,
  IGetRootDirReturnValue,
  UPDATE_DIR_NODE,
  UPDATE_DIR_NODE_RETURN
} from "common/channel";
import { FileTree, DirNode } from "common/types";
import { sendR } from "common/kit/renderer";

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

  async updateDir(...dirs: string[]): Promise<DirNode> {
    if (checkDirs(this.fileTree.root, dirs)) {
      const [_dirNode] = await sendR(
        UPDATE_DIR_NODE,
        UPDATE_DIR_NODE_RETURN,
        dirs
      );
      const dirNode: DirNode = _dirNode;
      let node: DirNode = this.fileTree.root;
      let nextDirs: DirNode[] = node.dirs;
      for (let i = 0; i < dirs.length - 1; i++) {
        if (dirs[i] === node.name) {
          node =
            nextDirs.find(d => d.name === dirs[i + 1])!;
          nextDirs = node.dirs;
        }
      }
      node.dirs = observable(dirNode.dirs);
      node.files = observable(dirNode.files);
      return dirNode;
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
