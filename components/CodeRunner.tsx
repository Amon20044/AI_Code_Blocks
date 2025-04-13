'use server';

import { generateText } from 'ai';
import { geminiModel } from '@/lib/genai';
import { PromptData } from '@/types/types';

const system = `You are a helpful assistant that writes React (TSX) code for an eCommerce UI based on provided JSON input. Return only clean, formatted code, no markdown.`;

export async function generateUIFromPrompt(data: PromptData) {
  const prompt = `Create a TSX-based modern responsive React UI using Tailwind CSS. Data: ${JSON.stringify(data)}`;
  const { text } = await generateText({
    model: geminiModel,
    system,
    prompt,
  });
  return text;
}
