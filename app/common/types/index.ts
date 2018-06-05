export class Node {
  name: string;
}

export class DirNode extends Node {
  dirs: Array<DirNode> = new Array<DirNode>();
  files: Array<FileNode> = new Array<FileNode>();
  get size(): number {
    let s = 0;
    for (let fn of this.files) {
      s += fn.size;
    }
    for (let dir of this.dirs) {
      s += dir.size;
    }
    return s;
  }
}

export class FileNode extends Node {
  size: number;
}

export class FileTree {
  root: DirNode;
}
