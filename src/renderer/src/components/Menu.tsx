import styles from './Menu.module.css'
import { useFileActions } from '../hooks/useFileActions'
import { useEffect, useState } from 'react'

export const Menu = ({
  isOpen,
  noteData,
  setIsSaved,
  setNoteData,
  setShowToast,
  setIsInitialLoading
}: {
  isOpen: boolean
  noteData: any
  setIsSaved: (isSaved: boolean) => void
  setNoteData: (noteData: any) => void
  setShowToast: (showToast: { type: boolean; visible: boolean }) => void
  setIsInitialLoading: (isInitialLoading: boolean) => void
}) => {
  const { saveFile, readFile } = useFileActions()
  const [recentFiles, setRecentFiles] = useState<string[]>([])

  const newFile = async () => {
    await saveFile({ noteData, setNoteData, setIsSaved, setShowToast })
    setNoteData({ title: '', content: '', curPath: undefined })
    setIsSaved(false)
  }

  useEffect(() => {
    const fetchRecentFiles = async () => {
      try {
        const result = await window.api.getRecentFiles()
        if (result.success) {
          setRecentFiles(result.files!)
        } else {
          console.error('최근 파일을 불러오는 데 실패했습니다:', result.error)
        }
      } catch (error) {
        console.error('최근 파일을 불러오는 중 오류 발생:', error)
      }
    }

    fetchRecentFiles()
  }, [])

  return (
    <div className={`${styles.menu} ${isOpen ? styles.visible : ''}`}>
      <div>
        <p className={styles.menuTitle}>파일</p>
        <p className={styles.menuItem} onClick={newFile}>
          새 파일
        </p>
        <p
          className={styles.menuItem}
          onClick={() =>
            readFile({
              setIsInitialLoading,
              setIsSaved,
              setNoteData,
              setRecentFiles,
              alreadyPath: undefined
            })
          }
        >
          파일 열기
        </p>
        <p
          className={styles.menuItem}
          onClick={() => saveFile({ noteData, setNoteData, setIsSaved, setShowToast })}
        >
          파일 저장
        </p>
      </div>
      <div>
        <p className={styles.menuTitle}>최근</p>
        {recentFiles.length > 0 ? (
          recentFiles.map((file, index) => (
            <p
              key={index}
              className={styles.menuItem}
              onClick={async () => {
                await saveFile({ noteData, setNoteData, setIsSaved, setShowToast })
                await readFile({
                  setIsInitialLoading,
                  setIsSaved,
                  setNoteData,
                  setRecentFiles,
                  alreadyPath: file
                })
              }}
            >
              {file}
            </p>
          ))
        ) : (
          <p className={styles.menuItem}>최근에 연 파일이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
