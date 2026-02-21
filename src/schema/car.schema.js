const { z } = require("zod");
//zod validation

const createCarSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .trim(),

    price: z
      .number({ invalid_type_error: "Price must be a number" })
      .positive("Price must be greater than 0"),

    color: z
      .string()
      .min(2, "Color must be at least 2 characters")
      .trim(),

    image: z
      .string()
      .url("Image must be a valid URL"),

    brand: z
      .string()
      .min(2, "Brand is required")
      .trim(),
  }),
});

module.exports = {
  createCarSchema,
};
