import styles from './TitleInput.module.css'

export const TitleInput = ({ setTitle }) => {
  return (
    <div>
      <input
        className={styles.titleInput}
        type="text"
        placeholder="제목을 입력하세요"
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  )
}
