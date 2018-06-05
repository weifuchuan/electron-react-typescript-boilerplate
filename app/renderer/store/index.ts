import { observable } from "mobx";
import { ipcRenderer } from "electron";
import * as E from "electron";
import { GET_ROOT_DIR, IGetRootDirReturnValue,  } from "common/channel";
import { FileTree, DirNode } from "common/types";
// import EventEmitter = require("wolfy87-eventemitter");
// const md5: (v: string) => string = require("js-md5");

// const bus = new EventEmitter();

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

  async updateDir(...dirs: string[]) {
    if (checkDirs(this.fileTree.root, dirs)) {
      // await sendMsg();
    } else {
      throw "dirs is illlegal";
    }
  }
}

// const idGenerator = (eventName: string) => {
//   return `${eventName}:${md5(Math.random().toString())}`;
// };

// const listennerRecord = new Set<string>();

// function sendMsg(channel: string, returnChannel: string, ...args: any[]) {
//   if (!listennerRecord.has(returnChannel)) {
//     ipcRenderer.on(returnChannel, (event: E.IpcMessageEvent, msg: IMsg) => {
//       bus.emit(msg.id, msg);
//     });
//     listennerRecord.add(returnChannel);
//   }
//   return new Promise((resolve, reject) => {
//     const id = idGenerator(returnChannel);
//     bus.once(id, resolve);
//     ipcRenderer.send(channel, { id, args } as IMsg);
//   });
// }

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
