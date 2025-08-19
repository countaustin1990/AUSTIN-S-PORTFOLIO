// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build the conversation with system message and history
    const messages: Message[] = [
      {
        role: "system",
        content: `You are Augustine's helpful AI assistant. You are knowledgeable, friendly, and professional. 

Key traits:
- Be conversational and personable
- Provide helpful and accurate information
- Keep responses concise but thorough
- Show empathy when appropriate
- If you don't know something, admit it honestly
- Be proactive in offering additional help or related information

Always maintain a helpful and positive tone while being authentic and genuine.`
      },
      ...history,
      {
        role: "user",
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-5", // or "gpt-4" for better responses
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const aiMessage = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    // Log usage for monitoring (optional)
    console.log(`OpenAI API call - Tokens used: ${completion.usage?.total_tokens || 'unknown'}`);

    return NextResponse.json({ 
      message: aiMessage,
      usage: completion.usage 
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Handle different types of errors
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API key. Please check your configuration.' },
          { status: 401 }
        );
      }
      
      if (error.status === 429) {
        return NextResponse.json(
          { error: 'OpenAI API rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }

      if (error.status === 402) {
        return NextResponse.json(
          { error: 'OpenAI API quota exceeded. Please check your billing.' },
          { status: 402 }
        );
      }

      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}

// Health check endpoint (optional)
export async function GET() {
  try {
    // Simple check to see if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { status: 'error', message: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      status: 'ok', 
      message: 'Chat API is ready',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'API health check failed' },
      { status: 500 }
    );
  }
}