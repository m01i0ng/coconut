import { Highlighter } from 'shiki'
import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { fromHtml } from 'hast-util-from-html'
import { Root, Text } from 'hast'

interface Options {
  highlighter: Highlighter
}

const rehypePluginShiki: Plugin<[Options], Root> = ({ highlighter }) => {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'pre' && node.children[0].type === 'element' && node.children[0].tagName === 'code') {
        const codeNode = node.children[0]
        const codeContent = (codeNode.children[0] as unknown as Text).value
        const codeClassName = codeNode.properties?.className?.toString() || ''

        const lang = codeClassName.split('-')[1]
        if (!lang) {
          return
        }
        const highlightedCode = highlighter.codeToHtml(codeContent, { lang })
        const fragmentAst = fromHtml(highlightedCode, { fragment: true })
        parent.children.splice(index, 1, ...fragmentAst.children)
      }
    })
  }
}

export default rehypePluginShiki
