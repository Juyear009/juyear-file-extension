/// <reference types="vite/client" />

interface Window {
  api: {
    getRecentFiles: () => Promise<{ success: boolean; files?: string[]; error?: string }>
    addRecentFile: (
      filePath: string
    ) => Promise<{ success: boolean; files?: string[]; error?: string }>
    saveFile: (filePath: string, content: string) => Promise<{ success: boolean; error?: string }>
    showSaveDialog: () => Promise<{ success: boolean; filePath?: string }>
    onSaveCommand: (callback: () => void) => void
    readFile: (filePath: string) => Promise<{ success: boolean; content?: string; error?: string }>
    showReadDialog: () => Promise<{ success: boolean; filePath?: string }>
  }
}
