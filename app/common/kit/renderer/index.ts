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

function send(
  sender: (channel: string, ...args: any[]) => void,
  on: (
    channel: string,
    listener: (event: E.IpcMessageEvent, msg: IMsg) => void
  ) => void,
  channel: string,
  returnChannel: string,
  ...args: any[]
): Promise<any[]> {
  if (!returnChannelRecord.has(returnChannel)) {
    on(returnChannel, (event, msg) => {
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
    sender(channel, msg);
  });
}

export function sendR(
  channel: string,
  returnChannel: string,
  ...args: any[]
): Promise<any[]> {
  return send(
    E.ipcRenderer.send,
    E.ipcRenderer.on,
    channel,
    returnChannel,
    ...args
  );
}
