import { FileTree } from "../types";

export interface IMsg {
  id: string;
  args?: any[];
}

export const GET_ROOT_DIR = "getRootDir";
export interface IGetRootDirReturnValue {
  fileTree?: FileTree;
  err?: string;
}

export const UPDATE_DIR_NODE = "updateDirNode";
export const UPDATE_DIR_NODE_RETURN = "updateDirNodeReturn";
