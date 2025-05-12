import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createTogetherAI } from '@ai-sdk/togetherai';

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_API_KEY!,
});

const openai = createOpenAI({
  apiKey: process.env.OPEN_AI_KEY!,
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
  headers:{
    'Content-Type': 'application/json',
  }
});
const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY!,
});
console.log(process.env.TOGETHER_AI_API_KEY);
export const openaiModel = openai('gpt-4o-mini')
export const geminiModel = google('gemini-2.0-flash-001', { structuredOutputs: true }); 
export const togetherModel = togetherai('deepseek-ai/DeepSeek-R1');; 
