import mdx from '@mdx-js/rollup'
import type { Plugin } from 'vite'
import remarkPluginGFM from 'remark-gfm'
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings'
import rehypePluginSlug from 'rehype-slug'
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter'
import remarkPluginFrontmatter from 'remark-frontmatter'
import rehypePluginPreWrapper from './rehypePlugins/preWrapper'

export function pluginMdxRollup(): Plugin {
  return mdx({
    remarkPlugins: [remarkPluginGFM, remarkPluginFrontmatter, [remarkPluginMDXFrontMatter, { name: 'frontmatter' }]],
    rehypePlugins: [
      rehypePluginPreWrapper,
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
    ],
  }) as unknown as Plugin
}
