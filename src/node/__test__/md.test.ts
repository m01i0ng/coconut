import { describe, expect, test } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePluginPreWrapper from '../plugins/mdx/rehypePlugins/preWrapper'
import rehypePluginShiki from '../plugins/mdx/rehypePlugins/shiki'
import { getHighlighter } from 'shiki'
import rehypeStringify from 'rehype-stringify'

describe('markdown compile cases', async () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePluginPreWrapper)
    .use(rehypePluginShiki, {
      highlighter: await getHighlighter({ theme: 'nord' }),
    })
    .use(rehypeStringify)

  test('compile title', async () => {
    const mdContent = '# aaa'
    const result = processor.processSync(mdContent)
    expect(result.value).toMatchInlineSnapshot('"<h1>aaa</h1>"')
  })

  test('compile code', async () => {
    const mdContent = 'I am using `coconut.js`'
    const result = processor.processSync(mdContent)
    expect(result.value).toMatchInlineSnapshot('"<p>I am using <code>coconut.js</code></p>"')
  })

  test('compile code block', async () => {
    const mdContent = '```js\nconsole.log(123);```\n'
    const result = processor.processSync(mdContent)
    expect(result.value).toMatchInlineSnapshot(`
      "<div class=\\"language-js\\"><span class=\\"lang\\">js</span><pre class=\\"shiki nord\\" style=\\"background-color: #2e3440ff\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color: #D8DEE9\\">console</span><span style=\\"color: #ECEFF4\\">.</span><span style=\\"color: #88C0D0\\">log</span><span style=\\"color: #D8DEE9FF\\">(</span><span style=\\"color: #B48EAD\\">123</span><span style=\\"color: #D8DEE9FF\\">)</span><span style=\\"color: #81A1C1\\">;</span><span style=\\"color: #ECEFF4\\">\`\`\`</span></span>
      <span class=\\"line\\"></span></code></pre></div>"
    `)
  })
})
