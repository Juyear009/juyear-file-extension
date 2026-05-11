import { useState } from 'react'

function App(): React.JSX.Element {
  const [content, setContent] = useState('')

  const saveFile = async () => {
    if (!content) {
      alert('내용을 입력해주세요.')
      return
    }

    const testPath = 'C:\\Coding\\test.juyear'
    const result = await window.api.saveFile(testPath, content)

    if (result.success) {
      alert('성공!')
    } else {
      alert('실패!')
    }
  }

  const readFile = async () => {
    const testPath = 'C:\\Coding\\test.juyear'
    const result = await window.api.readFile(testPath)

    if (result.success) {
      alert('성공!')
      setContent(result.content!)
    } else {
      alert('실패!')
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
