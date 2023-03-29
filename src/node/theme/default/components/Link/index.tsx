import type { FC } from 'react'
import React from 'react'

import styles from './index.module.scss'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link: FC<LinkProps> = ({ href = '/', children, className = '', ...other }) => {
  const isExternal = /^https?:\/\//i.test(href)
  const target = isExternal ? '_blank' : undefined
  const rel = isExternal ? 'noopener noreferrer' : undefined

  return (
    <a href={href} target={target} rel={rel} className={`${styles.link} ${className}`} {...other}>
      {children}
    </a>
  )
}

export default Link
