import { ipcMain, dialog } from 'electron'
import { fileService } from './fileService'

export function registerIpcHandlers(): void {
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
