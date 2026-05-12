import styles from './Menu.module.css'

export const Menu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className={`${styles.menu} ${isOpen ? styles.visible : ''}`}>
      <div>
        <p className={styles.menuTitle}>파일</p>
        <p className={styles.menuItem}>새 파일</p>
        <p className={styles.menuItem}>파일 열기</p>
        <p className={styles.menuItem}>파일 저장</p>
      </div>
    </div>
  )
}
