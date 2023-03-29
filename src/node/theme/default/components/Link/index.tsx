import React, { FC } from 'react'
import styles from './index.module.scss'

interface LinkProps {
  href?: string
  children?: React.ReactNode
  className?: string
}

const Link: FC<LinkProps> = ({ href = '/', children, className = '' }) => {
  const isExternal = /^https?/.test(href)
  const target = isExternal ? '_blank' : ''
  const rel = isExternal ? 'noopener noreferrer' : undefined

  return (
    <a href={href} target={target} rel={rel} className={`${styles.link} ${className}`}>
      {children}
    </a>
  )
}

export default Link
