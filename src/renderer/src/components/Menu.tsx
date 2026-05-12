import styles from './Menu.module.css'
import { useFileActions } from '../hooks/useFileActions'

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

  const newFile = async () => {
    await saveFile({ noteData, setNoteData, setIsSaved, setShowToast })
    setNoteData({ title: '', content: '', curPath: undefined })
    setIsSaved(false)
  }

  return (
    <div className={`${styles.menu} ${isOpen ? styles.visible : ''}`}>
      <div>
        <p className={styles.menuTitle}>파일</p>
        <p className={styles.menuItem} onClick={newFile}>
          새 파일
        </p>
        <p
          className={styles.menuItem}
          onClick={() => readFile({ setIsInitialLoading, setIsSaved, setNoteData })}
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
        <p className={styles.menuItem}>최근에 연 파일이 없습니다.</p>
      </div>
    </div>
  )
}
