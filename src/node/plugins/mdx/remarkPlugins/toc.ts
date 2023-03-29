import { parse } from 'acorn'
import { slug } from 'github-slugger'
import type { Root } from 'mdast'
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm'
import type { Program } from 'mdast-util-mdxjs-esm/lib'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

interface ChildNode {
  type: 'link' | 'text' | 'inlineCode'
  value: string
  children?: ChildNode[]
}

interface TocItem {
  id: string
  text: string
  depth: number
}

const remarkPluginToc: Plugin<[], Root> = () => {
  return (tree) => {
    const toc: TocItem[] = []

    visit(tree, 'heading', (node) => {
      if (!node.depth || !node.children) {
        return
      }

      // h2 - h4
      if (node.depth > 1 && node.depth < 5) {
        const originText = (node.children as ChildNode[])
          .map((child) => {
            switch (child.type) {
              case 'link':
                return child.children.map((c) => c.value).join('') || ''
              default:
                return child.value
            }
          })
          .join('')

        const id = slug(originText)
        toc.push({
          id,
          text: originText,
          depth: node.depth,
        })
      }
    })

    const insertCode = `export const toc = ${JSON.stringify(toc, null, 2)}`

    tree.children.push({
      type: 'mdxjsEsm',
      value: insertCode,
      data: {
        estree: parse(insertCode, {
          ecmaVersion: 2020,
          sourceType: 'module',
        }) as unknown as Program,
      },
    } as unknown as MdxjsEsm)
  }
}

export default remarkPluginToc
