import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { get } from 'http'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      getRecentFiles: () => ipcRenderer.invoke('get-recent-files'),
      addRecentFile: (filePath: string) => ipcRenderer.invoke('add-recent-file', filePath),
      saveFile: (filePath: string, content: string) =>
        ipcRenderer.invoke('save-file', filePath, content),
      showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
      onSaveCommand: (callback) => {
        const subsciption = (_event) => callback()
        ipcRenderer.on('shortcut-save', subsciption)
        return () => {
          ipcRenderer.removeListener('shortcut-save', subsciption)
        }
      },
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
