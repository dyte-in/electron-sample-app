import fs from 'fs';
import { contextBridge, ipcRenderer } from 'electron';
import { DyteElectronRenderer } from '@dyte-in/electron-preload';
import { domReady } from './utils';
import { useLoading } from './loading';

const { appendLoading, removeLoading } = useLoading()

;(async () => {
  await domReady()

  appendLoading()
})()

contextBridge.exposeInMainWorld('removeLoading', removeLoading)

DyteElectronRenderer.init(contextBridge, ipcRenderer);