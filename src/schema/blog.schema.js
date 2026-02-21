const { z } = require("zod");

/*
  CREATE BLOG SCHEMA
*/
const createBlogSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .trim(),

    slug: z
      .string()
      .min(3, "Slug must be at least 3 characters")
      .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
      .optional(),

    excerpt: z
      .string()
      .max(300, "Excerpt cannot exceed 300 characters")
      .min(10, "Excerpt must be at least 10 characters")
      .trim(),

    content: z
      .string()
      .min(20, "Content must be at least 20 characters"),

    author: z
      .string()
      .min(2, "Author name too short")
      .trim()
      .optional(),

    coverImage: z
      .string()
      .url("Cover image must be a valid URL")
      .optional(),

    category: z
      .string()
      .min(2, "Category is required")
      .toLowerCase(),

    tags: z
      .array(
        z.string().min(2).toLowerCase().trim()
      )
      .optional(),

    isPublished: z
      .coerce
      .boolean()
      .optional(),

    publishedAt: z
      .coerce
      .date()
      .optional(),
  }),
});



module.exports = {
  createBlogSchema,
};
