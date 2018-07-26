import * as React from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { Store } from "./store";
import { Tree, Button, Affix } from "antd";
import { sendR } from "common/kit/renderer";
import { DirNode } from "common/types";
import { AntTreeNode } from "antd/lib/tree";
import { dirname } from "path";

const Test: React.ReactType = require("./Test.jsx");

const TreeNode = Tree.TreeNode;

export interface IAppProps {
  store?: Store;
}

interface ISelfState {
  loading: boolean;
}

interface IApp {
  selfState: ISelfState;
}

@inject("store")
@observer
export default class App extends React.Component<IAppProps> implements IApp {
  selfState: ISelfState = observable({
    loading: false
  });

  render() {
    const store = this.props.store!;
    const fileTree = store.fileTree;
    return (
      <div className="full">
        <Tree
          showLine
          defaultExpandAll={true}
          onExpand={this.onExpand}
          loadData={un =>
            new Promise<void>(reject => {
              reject();
            })
          }
        >
          {this.makeTreeNode(fileTree.root, "")}
        </Tree>
        <Affix
          style={
            {
              position: "absolute",
              top: 0,
              right: 0,
              visibility: this.selfState.loading ? "visible" : "hidden"
            } as any
          }
        >
          <Button
            type="primary"
            shape="circle"
            loading={this.selfState.loading}
          />
        </Affix>
        <Test />
      </div>
    );
  }

  onExpand = async (expandedKeys: any, e: any) => {
    if (e.expanded as boolean) {
      const store =
        this.props.store!;
      const node: AntTreeNode = e.node;
      if ((node.props as any).eventKey) {
        const dirs: string[] = (node.props as any).eventKey.split("|");
        let dirNode: DirNode = (node.props as any).nodeRef;
        if (dirNode.dirs.length === 0 && dirNode.files.length === 0) {
          this.selfState.loading = true;
          await store.updateDir(...dirs);
          this.selfState.loading = false;
        }
      }
    }
  };

  makeTreeNode(dirNode: DirNode, prekey: string): React.ReactNode {
    return (
      <TreeNode
        title={dirNode.name}
        key={`${prekey}${prekey !== "" ? "|" : ""}${dirNode.name}`}
        nodeRef={dirNode}
      >
        {dirNode.dirs.map(dir => {
          return this.makeTreeNode(
            dir,
            `${prekey}${prekey !== "" ? "|" : ""}${dirNode.name}`
          );
        })}
        {dirNode.files.map(file => (
          <TreeNode
            isLeaf={true}
            title={file.name}
            key={`${prekey}${prekey !== "" ? "|" : ""}${file.name}:FILE`}
          />
        ))}
      </TreeNode>
    );
  }
}
