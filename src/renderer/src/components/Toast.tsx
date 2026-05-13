import styles from './Toast.module.css'

export const Toast = ({ type, visible }: { type: boolean; visible: boolean }) => {
  return (
    <div
      className={`${styles.toast} ${type ? styles.success : styles.error} ${visible ? styles.visible : ''}`}
    >
      <div className={styles.content}>
        <p>{type ? '저장 완료!' : '오류 발생'}</p>
      </div>
    </div>
  )
}
