import * as React from "react";
import {} from "mobx";
import { observer, inject } from "mobx-react";
import { Store } from "./store";
import { Tree, Button } from "antd";
import { sendR } from "common/kit/renderer";
import { TEST, TEST_RETURN } from "common/channel";
const TreeNode = Tree.TreeNode;

export interface IAppProps {
  store?: Store;
}

@inject("store")
@observer
export default class App extends React.Component<IAppProps> {
  render() {
    const fileTree = this.props.store
      ? this.props.store.fileTree
      : /* Impossible -> */ new Store().fileTree /* <- */;
    return (
      <div className="full">
        <Tree showLine defaultExpandAll={true}>
          <TreeNode title={fileTree.root.name} key={fileTree.root.name}>
            {fileTree.root.dirs.map(dir => {
              return (
                <TreeNode
                  title={dir.name}
                  key={`${fileTree.root.name}-${dir.name}`}
                />
              );
            })}
            {fileTree.root.files.map(file => {
              return (
                <TreeNode
                  isLeaf={true}
                  title={file.name}
                  key={`${fileTree.root.name}-${file.name}`}
                />
              );
            })}
          </TreeNode>
        </Tree>
        <Button
          onClick={async () => {
            const result = await sendR(
              TEST,
              TEST_RETURN,
              "aaaa",
              "bbbb",
              "eeeee"
            );
            console.log(JSON.stringify(result));
          }}
        >
          send
        </Button>
      </div>
    );
  }
}
