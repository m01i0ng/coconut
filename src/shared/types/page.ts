import type { ComponentType } from 'react'

import type { UserConfig } from './index'

export type PageType = 'home' | 'doc' | 'custom' | '404'

export interface Header {
  id: string
  text: string
  depth: number
}

export interface FrontMatter {
  title?: string
  description?: string
  pageType?: PageType
  sidebar?: boolean
  outline?: boolean
  features?: Feature[]
  hero?: Hero
}

export interface PageData {
  siteData: UserConfig
  pagePath: string
  frontMatter: FrontMatter
  pageType: PageType
  toc?: Header[]
}

export interface PageModule {
  default: ComponentType
  frontmatter?: FrontMatter
  toc?: Header[]

  [key: string]: unknown
}

export interface Feature {
  icon: string
  title: string
  details: string
}

export interface Hero {
  name: string
  text: string
  tagLine: string
  image?: {
    src: string
    alt: string
  }
  actions: {
    text: string
    link: string
    theme: 'brand' | 'alt'
  }[]
}
