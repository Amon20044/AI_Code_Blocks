import { z } from 'zod';

export const BrandGuidelines = z.object({
  brandName: z
    .string()
    .default('Nova Commerce')
    .describe('The name of the brand for which the UI will be generated. Defaults to "Nova Commerce".'),

  primaryColor: z
    .string()
    .default('#1E40AF') // Tailwind blue-800
    .describe('Primary color in HEX or RGB format, used for buttons, links, CTA. Defaults to a bold blue (#1E40AF).'),

  secondaryColor: z
    .string()
    .default('#64748B') // Tailwind slate-500
    .describe('Secondary color for accents or background sections. Defaults to slate gray (#64748B).'),

  anyMoreColors: z
    .array(z.string())
    .optional()
    .describe('Optional accent colors used for gradients, hovers, or highlights.'),

  imagesUrl: z
    .array(z.string().url())
    .default([
      'https://source.unsplash.com/featured/?product',
      'https://source.unsplash.com/featured/?ecommerce',
      'https://source.unsplash.com/featured/?shopping',
    ])
    .describe('Optional image URLs like logos, banners, product showcases. Defaults to random product visuals.'),

  font: z
    .string()
    .default('Inter')
    .describe('Web-safe font or brand font. Defaults to "Inter".'),

  wordmark: z
    .string()
    .optional()
    .describe('Wordmark version of the brand logo. Used in footer or branding.'),

  logoUrl: z
    .string()
    .url()
    .default('https://dummyimage.com/200x60/000/fff&text=Nova+Logo')
    .describe('Brand logo image URL. Defaults to a placeholder if not provided.'),

  theme: z
    .enum(['light', 'dark'])
    .default('light')
    .describe('Light or dark mode preference for the UI. Defaults to light.'),

  ReactCode: z
    .string()
    .optional()
    .describe('Optional React code to inject directly. If not provided, it will be generated.'),
});
