import { describe, expect, test } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

describe('markdown compile cases', () => {
  const processor = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify)

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
      "<pre><code class=\\"language-js\\">console.log(123);\`\`\`
      </code></pre>"
    `)
  })
})
