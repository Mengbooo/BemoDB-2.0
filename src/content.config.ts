import { defineCollection, z } from 'astro:content'
import { file, glob } from 'astro/loaders'
import yaml from 'js-yaml'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

function createExcerpt(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text
}

type RawMoment = {
  date: string
  content?: string
  draft?: boolean
}

function parseMomentDate(date: string) {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})$/)
  if (!match) return date

  const [, year, month, day, hour, minute] = match
  return `${year}-${month}-${day}T${hour}:${minute}:00+08:00`
}

// Define blog collection
const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Required
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().max(160),
      publishDate: z.coerce.date(),
      // Optional
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional(),

          color: z.string().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional(),
      draft: z.boolean().default(false),
      // Special fields
      comment: z.boolean().default(true)
    })
})

// Define moments collection
const moments = defineCollection({
  // Keep short-form updates in one structured file instead of scattered Markdown files.
  loader: file('./src/data/moments.yaml', {
    parser: (text) => {
      const moments = yaml.load(text) as unknown
      if (!Array.isArray(moments)) return []

      return moments.map((moment: RawMoment) => {
        const date = String(moment.date)

        return {
          ...moment,
          id: `moment-${date}`,
          date: parseMomentDate(date)
        }
      })
    }
  }),
  schema: z
    .object({
      date: z.coerce.date(),
      content: z.string().min(1),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false)
    })
    .transform((moment) => {
      const title = createExcerpt(moment.content, 60)

      return {
        ...moment,
        title,
        description: createExcerpt(moment.content, 160),
        publishDate: moment.date,
        updatedDate: moment.date,
        comment: false
      }
    })
})

// Define handbook collection
const handbook = defineCollection({
  // Load Markdown and MDX files in the `src/content/handbook/` directory.
  loader: glob({ base: './src/content/handbook', pattern: '**/*.{md,mdx}' }),
  // Required
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().max(160),
      publishDate: z.coerce.date(),
      // Optional
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional(),

          color: z.string().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional(),
      draft: z.boolean().default(false),
      // Special fields
      comment: z.boolean().default(true)
    })
})

export const collections = { blog, handbook, moments }
