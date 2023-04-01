import type { FC } from 'react'
import { useRef } from 'react'

import type { Header } from '../../../../../shared/types'

const renderHeader = (header: Header) => {
  return (
    <li key={header.id}>
      <a
        href={`#${header.id}`}
        className="block leading-7 text-text-2 hover:text-text-1"
        transition="color duration-300"
        style={{
          paddingLeft: (header.depth - 2) * 12,
        }}
      >
        {header.text}
      </a>
    </li>
  )
}

interface AsideProps {
  headers: Header[]
}

const Aside: FC<AsideProps> = ({ headers = [] }) => {
  const hasOutline = headers.length > 0

  const markerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      flex="~ col 1"
      style={{
        width: 'var(--coconut-aside-width)',
      }}
    >
      <div>
        {hasOutline && (
          <div id="aside-container" className="relative divider-left pl-4 text-13px font-medium">
            <div
              ref={markerRef}
              id="aside-marker"
              className="absolute top-33px opacity-0 w-1px h-18px bg-brand"
              style={{
                left: '-1px',
                transition: 'top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s, opacity 0.25s',
              }}
            />
            <div leading-7="~" text="13px" font="semibold">
              ON THIS PAGE
            </div>
            <nav>
              <ul relative="~">{headers.map(renderHeader)}</ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

export default Aside
