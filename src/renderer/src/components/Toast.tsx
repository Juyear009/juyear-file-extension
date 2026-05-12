import styles from './Toast.module.css'

export const Toast = ({ type, visible }: { type: boolean; visible: boolean }) => {
  return (
    <div
      className={`${styles.toast} ${type ? styles.success : styles.error} ${visible ? styles.visible : ''}`}
    >
      <div className={styles.content}>
        <p>{type ? '저장되었습니다.' : '오류가 발생했습니다.'}</p>
      </div>
    </div>
  )
}
