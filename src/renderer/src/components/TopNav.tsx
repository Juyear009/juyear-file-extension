import styles from './TopNav.module.css'
import clipIcon from '../assets/clip.svg'
import menuIcon from '../assets/burger-menu.svg'
import { useState } from 'react'
import { Menu } from './Menu'

export const TopNav = ({ path, isSaved }: { path: string | undefined; isSaved: boolean }) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

  return (
    <>
      <div className={styles.topNav}>
        <div className={styles.pathInfo}>
          <img
            className={styles.icon}
            src={menuIcon}
            alt="menu icon"
            style={{ width: '18px', height: '18px', marginRight: '20px', marginTop: '2px' }}
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          />
          <img
            src={clipIcon}
            alt="clip icon"
            style={{ width: '14px', height: '14px', marginRight: '5px', marginTop: '2px' }}
          />
          <p>{path ? path : '경로가 지정되지 않았습니다.'}</p>
          {!isSaved && <span className={styles.unsavedIndicator}>&nbsp;*</span>}
        </div>
        <div className={styles.title}>
          <p>SECRET ON</p>
        </div>
      </div>
      <Menu isOpen={isOpenMenu} />
    </>
  )
}
