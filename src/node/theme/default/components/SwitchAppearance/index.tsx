import type { FC } from 'react'
import React from 'react'

import { toggle } from '../../logic/toggleAppearance'
import styles from './index.module.scss'

interface SwitchProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  id?: string
}

const Switch: FC<SwitchProps> = (props) => {
  return (
    <button
      className={`${styles.switch} ${props.className}`}
      id={props.id ?? ''}
      type="button"
      role="switch"
      {...(props.onClick ? { onClick: props.onClick } : {})}
    >
      <span className={styles.check}>
        <span className={styles.icon}>{props.children}</span>
      </span>
    </button>
  )
}

export default function SwitchAppearance() {
  return (
    <Switch onClick={toggle}>
      <div className={styles.sun}>
        <div className="i-carbon-sun" w="full" h="full" />
      </div>
      <div className={styles.moon}>
        <div className="i-carbon-moon" w="full" h="full" />
      </div>
    </Switch>
  )
}
