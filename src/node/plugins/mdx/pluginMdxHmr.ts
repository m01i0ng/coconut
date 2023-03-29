import assert from 'assert'
import { Plugin } from 'vite'

const MD_REGEX = new RegExp(/\.mdx$/g)

/**
 * react-refresh 插件会再代码中注入 import.meta.hot.accept 实现热更新
 * index.mdx 并不被认为是一个 React 组件，所以没有被注入此代码
 * 此插件目的是识别 .mdx 文件，在其编译代码中注入 import.meta.hot.accept
 * vite 4 关于 mdx 的 hmr 失效，暂未寻到解决方案
 */
export default function pluginMdxHmr(): Plugin {
  let viteReactPlugin: Plugin
  return {
    name: 'vite-plugin-mdx-hmr',
    apply: 'serve',
    configResolved(config) {
      viteReactPlugin = config.plugins.find((p) => p.name === 'vite:react-babel')
    },
    async transform(code, id, opts) {
      if (MD_REGEX.test(id)) {
        assert(typeof viteReactPlugin.transform === 'function')
        const result = await viteReactPlugin.transform.call(this, code, id + '?.tsx', opts)
        const selfAcceptCode = 'import.meta.hot.accept()'
        if (typeof result === 'object' && !result.code.includes(selfAcceptCode)) {
          result.code += selfAcceptCode
        }
        return result
      }
    },
  }
}
