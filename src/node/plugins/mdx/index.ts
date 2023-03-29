import type { Plugin } from 'vite'

import { pluginMdxRollup } from './pluginMdxRollup'
// import pluginMdxHmr from './pluginMdxHmr'

export default async function pluginMdx(): Promise<Plugin[]> {
  return [await pluginMdxRollup()]
}
