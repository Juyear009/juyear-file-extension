export const useFileActions = () => {
  const saveFile = async ({
    setIsSaved,
    setShowToast,
    setNoteData,
    noteData: { title, content, curPath }
  }: any) => {
    if (!content || !title) {
      alert('내용과 제목을 입력해주세요.')
      return
    }

    let path = curPath

    if (!path) {
      const isSetPath = await window.api.showSaveDialog()
      if (!isSetPath.success) return

      setNoteData((prev) => ({ ...prev, curPath: isSetPath.filePath! }))
      path = isSetPath.filePath!
    }

    const noteData = {
      title,
      content,
      lastModified: Date.now()
    }
    const stringifiedData = JSON.stringify(noteData)

    const result = await window.api.saveFile(path, stringifiedData)

    if (result.success) {
      setIsSaved(true)
      setShowToast({ type: true, visible: true })
      setTimeout(() => setShowToast({ type: true, visible: false }), 3000)
    } else {
      setShowToast({ type: false, visible: true })
      setTimeout(() => setShowToast({ type: false, visible: false }), 3000)
    }
  }

  const readFile = async ({ setIsInitialLoading, setIsSaved, setNoteData }: any) => {
    const isSetPath = await window.api.showReadDialog()
    if (!isSetPath.success) return

    const result = await window.api.readFile(isSetPath.filePath!)

    if (result.success) {
      setIsInitialLoading(true)

      const noteData = JSON.parse(result.content!)
      setNoteData((prev) => ({
        ...prev,
        title: noteData.title,
        content: noteData.content,
        curPath: isSetPath.filePath!
      }))
      setIsSaved(true)

      setTimeout(() => setIsInitialLoading(false), 100)
    } else {
      alert(`읽기 실패: ${result.erorr}`)
    }
  }

  return { saveFile, readFile }
}
