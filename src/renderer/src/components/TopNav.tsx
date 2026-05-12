import styles from './TopNav.module.css'
import clipIcon from '../assets/clip.svg'

export const TopNav = ({ path, isSaved }: { path: string | undefined; isSaved: boolean }) => {
  return (
    <div className={styles.topNav}>
      <div className={styles.pathInfo}>
        <img
          src={clipIcon}
          alt="clip icon"
          style={{ width: '16px', height: '16px', marginRight: '5px' }}
        />
        <p>{path ? path : '경로가 지정되지 않았습니다.'}</p>
        {!isSaved && <span className={styles.unsavedIndicator}>&nbsp;*</span>}
      </div>
      <div className={styles.title}>
        <p>SECRET ON</p>
      </div>
    </div>
  )
}
