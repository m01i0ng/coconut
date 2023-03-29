import type { FC } from 'react'
import { createElement } from 'react'

import Link from '../Link'
import styles from './index.module.scss'

interface ButtonProps {
  type?: string
  size?: 'medium' | 'big'
  theme?: 'brand' | 'alt'
  text: string
  href?: string
  external?: boolean
  className?: string
}

const Button: FC<ButtonProps> = ({
  theme = 'brand',
  size = 'big',
  href = '/',
  external = false,
  className = '',
  type: rawType,
  text,
}) => {
  let type: string | typeof Link | null

  if (rawType === 'button') {
    type = 'button'
  } else if (rawType === 'a') {
    type = external ? 'a' : Link
  }

  return createElement(
    type ?? 'a',
    {
      className: `${styles.button} ${styles[theme]} ${styles[size]} ${className}`,
      href,
    },
    text,
  )
}

export default Button
