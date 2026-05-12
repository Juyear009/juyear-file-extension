import { useEffect, useState } from 'react'
import { NoteEditor } from './components/NoteEditor'
import { TitleInput } from './components/TitleInput'
import { Toast } from './components/Toast'
import { TopNav } from './components/TopNav'
import { useFileActions } from './hooks/useFileActions'

function App(): React.JSX.Element {
  const { saveFile } = useFileActions()
  const [noteData, setNoteData] = useState<{
    title: string
    content: string
    curPath: string | undefined
  }>({
    title: '',
    content: '',
    curPath: undefined
  })
  const [showToast, setShowToast] = useState<{ type: boolean; visible: boolean }>({
    type: true,
    visible: false
  })
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false)

  useEffect(() => {
    let removeListener: void | (() => void)

    try {
      removeListener = window.api.onSaveCommand(() => {
        saveFile({
          noteData,
          setNoteData,
          setIsSaved,
          setShowToast
        })
      })
    } catch (error) {
      console.error(error)
    }

    return () => {
      if (typeof removeListener === 'function') {
        removeListener()
      }
    }
  }, [noteData])

  useEffect(() => {
    if (!isInitialLoading) {
      setIsSaved(false)
    }
  }, [noteData.content, noteData.title])

  return (
    <div className="container">
      <TopNav
        path={noteData.curPath}
        isSaved={isSaved}
        noteData={noteData}
        setIsSaved={setIsSaved}
        setNoteData={setNoteData}
        setShowToast={setShowToast}
        setIsInitialLoading={setIsInitialLoading}
      />
      <div>
        <TitleInput
          title={noteData.title}
          setTitle={(title) => setNoteData((prev) => ({ ...prev, title }))}
        />
        <hr className="divider" />
        <NoteEditor
          key={noteData.curPath}
          value={noteData.content}
          onChange={(content) => setNoteData((prev) => ({ ...prev, content }))}
        ></NoteEditor>
      </div>
      <Toast type={showToast.type} visible={showToast.visible} />
    </div>
  )
}

export default App
