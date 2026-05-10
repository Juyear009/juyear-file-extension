import { ipcMain } from 'electron'
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

  ipcMain.handle('read-file', async (_event, filePath) => {
    try {
      const body = fileService.read(filePath)
      console.log(body);
      return { success: true, content: body }
    } catch (error) {
      console.log('파일 읽기 실패 : ', error)
      return { success: false, error: error }
    }
  })
}
