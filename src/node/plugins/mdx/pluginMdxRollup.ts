import mdx from '@mdx-js/rollup'
import type { Plugin } from 'vite'
import remarkPluginGFM from 'remark-gfm'
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings'
import rehypePluginSlug from 'rehype-slug'
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter'
import remarkPluginFrontmatter from 'remark-frontmatter'
import rehypePluginPreWrapper from './rehypePlugins/preWrapper'
import rehypePluginShiki from './rehypePlugins/shiki'
import { getHighlighter } from 'shiki'

export async function pluginMdxRollup(): Promise<Plugin> {
  return mdx({
    remarkPlugins: [remarkPluginGFM, remarkPluginFrontmatter, [remarkPluginMDXFrontMatter, { name: 'frontmatter' }]],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePluginAutolinkHeadings,
        {
          properties: {
            class: 'header-anchor',
          },
          content: {
            type: 'text',
            value: '#',
          },
        },
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginShiki,
        {
          highlighter: await getHighlighter({ theme: 'nord' }),
        },
      ],
    ],
  }) as unknown as Plugin
}
