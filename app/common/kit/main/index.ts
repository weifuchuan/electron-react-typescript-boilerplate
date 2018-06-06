
import * as E from "electron";

export interface IMsg {
  id: string;
  args: any[];
}

export function onM(
  channel: string,
  returnChannel: string,
  listener: (...args: any[]) => any[]
): void {
  E.ipcMain.on(channel, (event: E.IpcMessageEvent, msg: IMsg) => {
    event.sender.send(returnChannel, <IMsg>{
      id: msg.id,
      args: listener(...msg.args)
    });
  });
}