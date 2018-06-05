import { FileTree } from "../types";

export const GET_ROOT_DIR = "getRootDir";
export interface IGetRootDirReturnValue  {
  fileTree?: FileTree;
  err?: string;
}

export const UPDATE_DIR_NODE = "updateDirNode";
