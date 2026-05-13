import styles from './Menu.module.css'
import { useFileActions } from '../hooks/useFileActions'
import { useEffect, useRef, useState } from 'react'

export const Menu = ({
  isOpen,
  noteData,
  setIsOpen,
  setIsSaved,
  setNoteData,
  setShowToast
}: {
  isOpen: boolean
  noteData: any
  setIsOpen: (isOpen: boolean) => void
  setIsSaved: (isSaved: boolean) => void
  setNoteData: (noteData: any) => void
  setShowToast: (showToast: { type: boolean; visible: boolean }) => void
}) => {
  const { saveFile, readFile } = useFileActions()
  const [recentFiles, setRecentFiles] = useState<string[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const newFile = async () => {
    await saveFile({ noteData, setNoteData, setIsSaved, setShowToast, setRecentFiles })
    setNoteData({ title: '', content: '', curPath: undefined })
    setIsSaved(false)
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

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

  useEffect(() => {
    let removeListener: void | (() => void)

    try {
      removeListener = window.api.onSaveCommand(() => {
        saveFile({
          noteData,
          setNoteData,
          setIsSaved,
          setShowToast,
          setRecentFiles
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
    <div className={`${styles.menu} ${isOpen ? styles.visible : ''}`} ref={menuRef}>
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
          onClick={() =>
            saveFile({ noteData, setNoteData, setIsSaved, setShowToast, setRecentFiles })
          }
        >
          파일 저장
        </p>
        <p
          className={styles.menuItem}
          onClick={() =>
            saveFile({
              noteData: { title: noteData.title, content: noteData.content, curPath: undefined },
              setNoteData,
              setIsSaved,
              setShowToast,
              setRecentFiles
            })
          }
        >
          다른 이름으로 저장
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
                await saveFile({ noteData, setNoteData, setIsSaved, setShowToast, setRecentFiles })
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
