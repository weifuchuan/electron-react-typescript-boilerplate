import { FileTree } from "../types";

export const GET_ROOT_DIR = "getRootDir";
export const GET_ROOT_DIR_RETURN = "getRootDirReturn";
export interface IGetRootDirReturnMsg extends FileTree {}

export const UPDATE_DIR_NODE = "updateDirNode"; 