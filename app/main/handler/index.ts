import * as E from "electron";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { FileTree, DirNode, FileNode } from "common/types/index";
import { IGetRootDirReturnValue } from "common/channel/index";

let isWin = false;
const rootDir = "/";
const fileTree = new FileTree();
let gotFileTree = false;
fileTree.root = new DirNode();
fileTree.root.name = rootDir;
fileTree.root.dirs = new Array<DirNode>();
fileTree.root.files = new Array<FileNode>();
const winDrivers: string[] = [];
if (
  os
    .type()
    .toLowerCase()
    .startsWith("windows")
) {
  isWin = true;
  for (let i = "C".charCodeAt(0); ; i++) {
    try {
      fs.accessSync(`${String.fromCharCode(i)}:/`);
      winDrivers.push(`${String.fromCharCode(i)}:/`);
    } catch (e) {
      break;
    }
  }
}

export function getRootDir(event: E.IpcMessageEvent) {
  if (gotFileTree) {
    event.returnValue = { fileTree };
    return;
  }
  gotFileTree = true;
  if (isWin) {
    for (let driver of winDrivers) {
      const dir = new DirNode();
      dir.name = driver;
      try {
        const files = fs.readdirSync(driver);
        for (let file of files) {
          try {
            const stat = fs.statSync(path.join(driver, file));
            if (stat.isDirectory()) {
              const subdir = new DirNode();
              subdir.name = file;
              dir.dirs.push(subdir);
            } else if (stat.isFile()) {
              const f = new FileNode();
              f.name = file;
              f.size = stat.size;
              dir.files.push(f);
            }
          } catch (e) {
            console.error(e);
          }
        }
        fileTree.root.dirs.push(dir);
      } catch (e) {
        console.error(e);
      }
    }
    event.returnValue = { fileTree } as IGetRootDirReturnValue;
  } else {
    fs.readdir(rootDir, (err: NodeJS.ErrnoException, files: string[]) => {
      if (err) {
        event.returnValue = {
          err: (err as any).toString() as string
        } as IGetRootDirReturnValue;
      } else {
        for (let file of files) {
          try {
            const stat = fs.statSync(path.join(rootDir, file));
            if (stat.isDirectory()) {
              const dir = new DirNode();
              dir.name = file;
              fileTree.root.dirs.push(dir);
            } else if (stat.isFile()) {
              const f = new FileNode();
              f.name = file;
              fileTree.root.files.push(f);
            }
          } catch (e) {
            console.error(e);
          }
        }
        event.returnValue = { fileTree } as IGetRootDirReturnValue;
      }
    });
  }
}

export function updateDir(dirs: string[]): DirNode {
  let node: DirNode = fileTree.root;
  let nextDirs: DirNode[] = node.dirs;
  for (let i = 0; i < dirs.length-1; i++) {
    if (dirs[i] === node.name) {
      node =
        nextDirs.find(d => d.name === dirs[i+1]) ||
        /* impossible -> */ node /* <- */;
      nextDirs = node.dirs;
    }
  }
  try{
    const thePath = isWin?path.join(...dirs.slice(1)):path.join(...dirs);
    const files = fs.readdirSync(thePath);
    for (let file of files) {
      try {
        const stat = fs.statSync(path.join(thePath, file));
        if (stat.isDirectory()) {
          const subdir = new DirNode();
          subdir.name = file;
          node.dirs.push(subdir);
        } else if (stat.isFile()) {
          const f = new FileNode();
          f.name = file;
          f.size = stat.size;
          node.files.push(f);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return node;
  }catch(err){
    throw err;
  }
}
