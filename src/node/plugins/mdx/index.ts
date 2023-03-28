import { Plugin } from 'vite'
import { pluginMdxRollup } from './pluginMdxRollup'

export default function pluginMdx(): Plugin[] {
  return [pluginMdxRollup()]
}
