import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      saveFile: (filePath: string, content: string) =>
        ipcRenderer.invoke('save-file', filePath, content),
      showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
      readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
      showReadDialog: () => ipcRenderer.invoke('show-read-dialog')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
