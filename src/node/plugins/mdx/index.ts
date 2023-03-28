import { Plugin } from 'vite'
import { pluginMdxRollup } from './pluginMdxRollup'

export default async function pluginMdx(): Promise<Plugin[]> {
  return [await pluginMdxRollup()]
}
