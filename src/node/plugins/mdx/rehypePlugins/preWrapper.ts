import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const rehypePluginPreWrapper: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // <pre><code>...</code></pre>
      // 1. 找到 pre 元素
      if (
        node.tagName === 'pre' &&
        node.children[0]?.type === 'element' &&
        node.children[0].tagName === 'code' &&
        !node.data?.isVisited
      ) {
        const codeNode = node.children[0]
        const codeClassName = codeNode.properties?.className?.toString() || ''
        // 2. 解析出代码的语言名称 language-xxx
        const lang = codeClassName.split('-')[1]

        // 3. 变换 Html AST
        const clonedNode: Element = {
          type: 'element',
          tagName: 'pre',
          children: node.children,
          data: {
            isVisited: true,
          },
        }

        node.tagName = 'div'
        node.properties = node.properties || {}
        node.properties.className = codeClassName

        node.children = [
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'lang',
            },
            children: [
              {
                type: 'text',
                value: lang,
              },
            ],
          },
          clonedNode,
        ]
      }
    })
  }
}

export default rehypePluginPreWrapper
