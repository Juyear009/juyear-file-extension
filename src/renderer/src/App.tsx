import { useState } from 'react'
import { NoteEditor } from './components/NoteEditor'
import { TitleInput } from './components/TitleInput'

function App(): React.JSX.Element {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [curPath, setCurPath] = useState('')

  const saveFile = async () => {
    if (!content) {
      alert('내용을 입력해주세요.')
      return
    }

    const isSetPath = await window.api.showSaveDialog()
    if (!isSetPath.success) return

    const result = await window.api.saveFile(isSetPath.filePath!, content)

    if (result.success) {
      alert('파일이 저장되었습니다.')
      setCurPath(isSetPath.filePath!)
    } else {
      alert(`저장 실패: ${result.erorr}`)
    }
  }

  const readFile = async () => {
    const isSetPath = await window.api.showReadDialog()
    if (!isSetPath.success) return

    const result = await window.api.readFile(isSetPath.filePath!)

    if (result.success) {
      alert('파일을 읽어왔습니다.')
      setContent(result.content!)
      setCurPath(isSetPath.filePath!)
    } else {
      alert(`읽기 실패: ${result.erorr}`)
    }
  }

  return (
    <div className="container">
      <div>
        <h1 className="text">JUYEAR FILE EXTENSION</h1>
        <TitleInput setTitle={setTitle} />
        <hr />
        <NoteEditor key={curPath} value={content} onChange={(val) => setContent(val)}></NoteEditor>
      </div>
      <div className="action">
        <button onClick={saveFile}>.juyear 파일로 저장</button>
        <button onClick={readFile}>.juyear 파일 읽기</button>
      </div>
    </div>
  )
}

export default App
