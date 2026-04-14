import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    source: z.string().url().optional(),
    scraped_at: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { pages };
