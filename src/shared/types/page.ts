import { UserConfig } from './index'
import { ComponentType } from 'react'

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
  frontMatter?: FrontMatter

  [key: string]: unknown
}
