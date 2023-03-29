import type { UserConfig as ViteConfig } from 'vite'

export interface NavItemWithLink {
  text: string
  link: string
}

export type SidebarItem = { text: string; link: string } | { text: string; link?: string; items: SidebarItem[] }

export interface SidebarGroup {
  text?: string
  items: SidebarItem[]
}

export interface Sidebar {
  [path: string]: SidebarGroup[]
}

interface Footer {
  message?: string
  copyright?: string
}

export interface ThemeConfig {
  nav?: NavItemWithLink[]
  sidebar?: Sidebar
  footer?: Footer
}

export interface UserConfig {
  title?: string
  description?: string
  themeConfig?: ThemeConfig
  vite?: ViteConfig
}

export interface SiteConfig {
  root: string
  configPath: string
  siteData: UserConfig
}
