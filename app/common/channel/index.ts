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

export const UPDATE_DIR_NODE = "updateDirNode"; // args:
export const UPDATE_DIR_NODE_RETURN = "updateDirNodeReturn";

export const TEST = "test";
export const TEST_RETURN = "testReturn";
