import { defineCollection, z } from "astro:content";

const journal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    number: z.number().int().positive(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const reviews = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    kind: z.enum(["movie", "tv", "anime"]),
    year: z.number().int(),
    rating: z.number().int().min(1).max(5),
    watchedOn: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const watchlist = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    kind: z.enum(["movie", "tv", "anime"]),
    addedOn: z.coerce.date(),
    source: z.string().optional(),
  }),
});

const recipes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    servings: z.string().optional(),
    time: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    status: z.enum(["active", "shipped", "archived"]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    stack: z.array(z.string()).default([]),
    date: z.coerce.date(),
  }),
});

export const collections = { journal, reviews, watchlist, recipes, projects };
