/// <reference types="vite/client" />

interface Window {
  api: {
    saveFile: (filePath: string, content: string) => Promise<{ success: boolean; erorr?: string }>
    showSaveDialog: () => Promise<{ success: boolean; filePath?: string }>
    readFile: (filePath: string) => Promise<{ success: boolean; content?: string; erorr?: string }>
  }
}
