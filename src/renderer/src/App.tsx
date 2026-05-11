import { useState } from 'react'

function App(): React.JSX.Element {
  const [content, setContent] = useState('')

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
    } else {
      alert(`읽기 실패: ${result.erorr}`)
    }
  }

  return (
    <>
      <div className="actions">
        <div className="action">
          <h1 className="text">.juyear 에디터</h1>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="여기에 내용을 입력하세요"
            rows={10}
            cols={30}
          ></textarea>
          <br />
          <button onClick={saveFile}>.juyear 파일로 저장</button>
        </div>
        <div className="action">
          <button onClick={readFile}>.juyear 파일 읽기</button>
        </div>
      </div>
    </>
  )
}

export default App
