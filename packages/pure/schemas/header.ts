import { z } from 'astro/zod'

export const HeaderMenuSchema = () =>
  z
    .array(
      z.object({
        title: z.string(),
        link: z.string()
      })
    )
    .default([
      { title: 'Blog', link: '/blog' },
      { title: 'Handbook', link: '/handbook' },
      { title: 'Weekly', link: '/weekly' },
      { title: 'Archives', link: '/archives' },
      { title: 'Links', link: '/links' },
      { title: 'About', link: '/about' }
    ])
    .describe('The header menu items for your site.')
