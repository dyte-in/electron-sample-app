import type { IpcRenderer } from "electron";
import type fs from "fs";
export { }

declare global {
  interface Window {
    // Expose some Api through preload script
    fs: typeof import('fs');
    ipcRenderer: import('electron').IpcRenderer;
    removeLoading: () => void;
    DyteClient: DyteClient;
    meeting: DyteClient | undefined;
    dyteElectronStoreGet: (key: string) => string;
    dyteElectronStoreSet: (key: string, value: string) => void;
  }
}
