import * as E from "electron";
import EventEmitter = require("wolfy87-eventemitter");
const md5: (v: string) => string = require("js-md5");

export interface IMsg {
  id: string;
  args: any[];
}

const bus = new EventEmitter();
const returnChannelRecord = new Set<string>();

function idGenerator(name: string): string {
  return `${name}:${md5(Math.random().toString())}`;
}

export function sendR(
  channel: string,
  returnChannel: string,
  ...args: any[]
): Promise<any[]> {
  if (!returnChannelRecord.has(returnChannel)) {
    E.ipcRenderer.on(returnChannel, (event: E.IpcMessageEvent, msg: IMsg) => {
      bus.emit(msg.id, msg.args);
    });
    returnChannelRecord.add(returnChannel);
  }
  const msg: IMsg = {
    id: idGenerator(channel),
    args: args
  };
  return new Promise(resolve => {
    bus.once(msg.id, resolve);
    E.ipcRenderer.send(channel, msg);
  });
}
