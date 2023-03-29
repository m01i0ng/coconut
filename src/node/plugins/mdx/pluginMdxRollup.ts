import mdx from '@mdx-js/rollup'
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings'
import rehypePluginSlug from 'rehype-slug'
import remarkPluginFrontmatter from 'remark-frontmatter'
import remarkPluginGFM from 'remark-gfm'
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter'
import { getHighlighter } from 'shiki'
import type { Plugin } from 'vite'

import rehypePluginPreWrapper from './rehypePlugins/preWrapper'
import rehypePluginShiki from './rehypePlugins/shiki'
import remarkPluginToc from './remarkPlugins/toc'

export async function pluginMdxRollup(): Promise<Plugin> {
  return mdx({
    remarkPlugins: [
      remarkPluginGFM,
      remarkPluginFrontmatter,
      [remarkPluginMDXFrontMatter, { name: 'frontmatter' }],
      remarkPluginToc,
    ],
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
