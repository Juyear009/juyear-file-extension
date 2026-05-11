import { ipcMain, dialog, globalShortcut, BrowserWindow } from 'electron'
import { fileService } from './fileService'

export function registerIpcHandlers(mainWindow: BrowserWindow): void {
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if ((input.control || input.meta) && input.key.toLowerCase() === 's') {
      if (input.type === 'keyDown') {
        console.log('앱 내부 Ctrl+S 감지')
        mainWindow.webContents.send('shortcut-save')
        event.preventDefault()
      }
    }
  })

  ipcMain.handle('save-file', async (_event, filePath, content) => {
    try {
      fileService.save(filePath, content)
      return { success: true }
    } catch (error) {
      console.error('파일 저장 실패 : ', error)
      return { success: false, error: error }
    }
  })

  ipcMain.handle('show-save-dialog', async (_event) => {
    const { filePath, canceled } = await dialog.showSaveDialog({
      title: '새 파일 저장',
      defaultPath: 'Untitled.juyear',
      buttonLabel: '저장',
      filters: [
        { name: 'Juyear File', extensions: ['juyear'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    })

    if (canceled) return { success: false }
    return { success: true, filePath: filePath }
  })

  ipcMain.handle('read-file', async (_event, filePath) => {
    try {
      const body = fileService.read(filePath)
      console.log(body)
      return { success: true, content: body }
    } catch (error) {
      console.log('파일 읽기 실패 : ', error)
      return { success: false, error: error }
    }
  })

  ipcMain.handle('show-read-dialog', async (_event) => {
    const { filePaths, canceled } = await dialog.showOpenDialog({
      title: '파일 열기',
      buttonLabel: '열기',
      filters: [
        { name: 'Juyear File', extensions: ['juyear'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    })

    if (canceled || filePaths.length === 0) return { success: false }
    return { success: true, filePath: filePaths[0] }
  })
}
