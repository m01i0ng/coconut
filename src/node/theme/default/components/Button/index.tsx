import type { FC } from 'react'
import { createElement } from 'react'

import Link from '../Link'
import styles from './index.module.scss'

interface ButtonProps {
  type?: 'button' | 'a'
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
  type = 'a',
  text,
}) => {
  const classNames = [styles.button, styles[theme], styles[size], className].join(' ')
  const props =
    type === 'a'
      ? {
          className: classNames,
          href: external ? href : undefined,
        }
      : {
          className: classNames,
          type: 'button',
        }

  const children = type === 'a' ? text : undefined
  const Component = type === 'a' ? (external ? 'a' : Link) : 'button'

  return createElement(Component, { ...props }, children)
}

export default Button
