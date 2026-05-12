import { useEffect, useState } from 'react'
import { NoteEditor } from './components/NoteEditor'
import { TitleInput } from './components/TitleInput'
import { Toast } from './components/Toast'
import { TopNav } from './components/TopNav'

function App(): React.JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [curPath, setCurPath] = useState<string | undefined>(undefined)
  const [showToast, setShowToast] = useState<{ type: boolean; visible: boolean }>({
    type: true,
    visible: false
  })
  const [isSaved, setIsSaved] = useState<boolean>(true)

  useEffect(() => {
    let removeListener: void | (() => void)

    try {
      removeListener = window.api.onSaveCommand(() => {
        saveFile()
      })
    } catch (error) {
      console.error(error)
    }

    return () => {
      if (typeof removeListener === 'function') {
        removeListener()
      }
    }
  }, [title, content, curPath])

  useEffect(() => {
    setIsSaved(false)
  }, [title, content])

  const saveFile = async () => {
    if (!content || !title) {
      alert('내용과 제목을 입력해주세요.')
      return
    }

    let path = curPath

    if (!path) {
      const isSetPath = await window.api.showSaveDialog()
      if (!isSetPath.success) return

      setCurPath(isSetPath.filePath!)
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

  const readFile = async () => {
    const isSetPath = await window.api.showReadDialog()
    if (!isSetPath.success) return

    const result = await window.api.readFile(isSetPath.filePath!)

    if (result.success) {
      console.log('파일을 읽어왔습니다 : ')
      const noteData = JSON.parse(result.content!)
      setTitle(noteData.title)
      setContent(noteData.content)
      setCurPath(isSetPath.filePath!)
      setIsSaved(true)
    } else {
      alert(`읽기 실패: ${result.erorr}`)
    }
  }

  return (
    <div className="container">
      <TopNav path={curPath} isSaved={isSaved} />
      <div>
        <TitleInput title={title} setTitle={setTitle} />
        <hr className="divider" />
        <NoteEditor key={curPath} value={content} onChange={(val) => setContent(val)}></NoteEditor>
      </div>
      <div className="action">
        <button onClick={readFile}>.juyear 파일 읽기</button>
      </div>
      <Toast type={showToast.type} visible={showToast.visible} />
    </div>
  )
}

export default App
