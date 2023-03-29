import fse from 'fs-extra'
import { resolve } from 'path'
import { loadConfigFromFile } from 'vite'

import type { SiteConfig, UserConfig } from '../shared/types'

type RawConfig = UserConfig | Promise<UserConfig> | (() => UserConfig | Promise<UserConfig>)

function getUserConfigPath(root: string) {
  try {
    const supportConfigFiles = ['config.ts', 'config.js']
    return supportConfigFiles.map((f) => resolve(root, f)).find(fse.pathExistsSync)
  } catch (e) {
    console.error(`Failed to load user config: ${e}`)
    throw e
  }
}

type Command = 'serve' | 'build'
type Mode = 'development' | 'production'

export async function resolveUserConfig(root: string, command: Command, mode: Mode) {
  const configPath = getUserConfigPath(root)
  const result = await loadConfigFromFile({ command, mode }, configPath, root)
  if (result) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const { config: rawConfig = {} as RawConfig } = result
    const userConfig = await (typeof rawConfig === 'function' ? rawConfig() : rawConfig)
    return [configPath, userConfig] as const
  } else {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return [configPath, {} as UserConfig] as const
  }
}

export function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || 'Coconut',
    description: userConfig.description || 'ssg',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {},
  }
}

export async function resolveConfig(root: string, command: Command, mode: Mode): Promise<SiteConfig> {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode)
  return {
    root,
    configPath,
    siteData: resolveSiteData(userConfig as UserConfig),
  }
}

export function defineConfig(config: UserConfig) {
  return config
}
