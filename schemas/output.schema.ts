import { z } from "zod";

export const outputSchema = z.object({
  companyName: z
    .string()
    .describe("Name of the eCommerce brand to be used across the website."),

  companyLogo: z
    .object({
      type: z.literal("image"),
      value: z.string().url(),
    })
    .nullable()
    .describe(
      "Public URL of the company logo. Should be a high-resolution image (PNG, SVG, etc.)."
    ),

  brandPalette: z
    .object({
      type: z.literal("color-scheme"),
      primary: z
        .string()
        .describe("Primary brand color (Hex format e.g., #1A73E8)."),
      secondary: z
        .string()
        .describe("Secondary brand color used for accents and contrast."),
      additional: z
        .array(z.string())
        .optional()
        .describe("Optional additional color values for highlights or categories."),
    })
    .describe("Defines the brand’s color theme."),

  typography: z
    .object({
      type: z.literal("font-style"),
      headingFont: z
        .string()
        .describe("Font used for headings (e.g., Inter, Poppins)."),
      bodyFont: z.string().describe("Font used for paragraph/body text."),
    })
    .describe("Typography preferences for the brand UI."),

  imageGallery: z
    .object({
      type: z.literal("images"),
      values: z
        .array(z.string().url())
        .describe("URLs of brand/product images for visual design and landing sections."),
    })
    .optional()
    .describe("Collection of images for visual storytelling in the UI."),

  layoutPreferences: z
    .object({
      type: z.literal("layout"),
      fullWidth: z
        .boolean()
        .default(false)
        .describe("Should layout span full width or stay boxed."),
      cardStyle: z
        .enum(["elevated", "outlined", "flat"])
        .describe("Preferred style for cards used in UI."),
    })
    .describe("Controls structural layout and components."),

  animationStyle: z
    .object({
      type: z.literal("motion"),
      level: z
        .enum(["none", "subtle", "interactive"])
        .default("subtle")
        .describe("Level of animation across the website."),
    })
    .describe("Brand preference for UI animations."),

  accessibility: z
    .object({
      type: z.literal("accessibility"),
      highContrast: z
        .boolean()
        .default(false)
        .describe("Enable high contrast for better readability."),
      dyslexiaFriendlyFonts: z
        .boolean()
        .default(false)
        .describe("Enable special font handling for dyslexic users."),
    })
    .describe("Accessibility features and user experience customization."),

  reactCode: z
    .object({
      type: z.literal("code"),
      framework: z.literal("react"),
      cssFramework: z.literal("tailwind"),
      animationLibs: z
        .array(z.enum(["gsap", "framer-motion", "anime.js"]))
        .describe("Animation libraries used in the code."),
      router: z.literal("react-router"),
      code: z
        .string()
        .describe(`Complete React code with:
- Landing page layout including:
  - Hero section
  - Collection showcase
  - Featured product highlights
  - Best seller grid/list
  - Testimonials section
  - Footer
- Navigation:
  - Desktop: Top navbar
  - Mobile: Bottom app-like navbar
- Routing:
  - Implemented using React Router DOM (e.g., '/', '/featured', '/bestsellers', '/collections', '/testimonials')
- All components styled using Tailwind CSS.
- Animations handled using GSAP, Framer Motion, and Anime.js where appropriate.
- All pages in one code file for sandbox usage.
        `),
    })
    .describe("The compiled React code for preview with animations, styles, and layout."),
});
