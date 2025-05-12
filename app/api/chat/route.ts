import { togetherModel } from '@/libs/genai';
import { streamText } from 'ai';
import { Output } from 'ai';
import systemPrompt from '@/constants/prompt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try{
  const { messages } = await req.json();

  const result = streamText({
    model: togetherModel,
    system:systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
} 
catch(error){
  console.error('Error in chat route:', error);
  return NextResponse.json(
    {
      error:'an error occured while processing your request'
    },
    {
      status : 500
    }
  )
}
}