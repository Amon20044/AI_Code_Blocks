import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_API_KEY!,
});

export const geminiModel = google('gemini-2.0-flash-001', { structuredOutputs: true }); // or 2.0-flash
