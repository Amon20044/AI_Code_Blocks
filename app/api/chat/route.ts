import { geminiModel } from '@/lib/genai';
import { streamText } from 'ai';
import { outputSchema } from '@/schemas/output.schema';
import { Output } from 'ai';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try{
  const { messages } = await req.json();

  const result = streamText({
    model: geminiModel,
    system:'you are best UI UX designer in the world ' +
    `you have to generate one code for React using GSAP`,
  
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