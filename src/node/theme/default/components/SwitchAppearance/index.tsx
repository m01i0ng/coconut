import type { FC } from 'react'
import React from 'react'

import useDarkMode from '../../hooks/useDarkMode'
import styles from './index.module.scss'

interface SwitchProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  id?: string
}

const Switch: FC<SwitchProps> = ({ children, className, id, onClick }) => {
  return (
    <button
      className={`${styles.switch} ${className}`}
      id={id ?? ''}
      type="button"
      role="switch"
      {...(onClick ? { onClick: onClick } : {})}
    >
      <span className={styles.check}>
        <span className={styles.icon}>{children}</span>
      </span>
    </button>
  )
}

export default function SwitchAppearance() {
  const { toggleDarkMode } = useDarkMode()

  return (
    <Switch onClick={toggleDarkMode}>
      <div className={styles.sun}>
        <div className="i-carbon-sun" w="full" h="full" />
      </div>
      <div className={styles.moon}>
        <div className="i-carbon-moon" w="full" h="full" />
      </div>
    </Switch>
  )
}
