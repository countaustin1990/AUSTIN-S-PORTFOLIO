// app/api/chat/route.ts - GPT-5 Optimized
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Model configuration - easily switch between models
const MODEL_CONFIG = {
  // GPT-5 - Latest and most capable
  default: {
    model: "gpt-5",
    maxTokens: 2000,
    temperature: 0.7,
    topP: 0.9,
    frequencyPenalty: 0.1,
    presencePenalty: 0.1,
  },
  // Fallback options if GPT-5 isn't available yet
  fallback: [
    {
      model: "gpt-4-turbo",
      maxTokens: 1500,
      temperature: 0.7,
    },
    {
      model: "gpt-4",
      maxTokens: 1000,
      temperature: 0.7,
    },
    {
      model: "gpt-3.5-turbo",
      maxTokens: 800,
      temperature: 0.7,
    }
  ]
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [], model = 'default' } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Enhanced system prompt optimized for GPT-5
    const systemPrompt = `You are Augustine's advanced AI assistant, powered by GPT-5. You are highly knowledgeable, creative, and capable of nuanced understanding.

Key characteristics:
- Be conversational, intelligent, and genuinely helpful
- Demonstrate advanced reasoning and problem-solving
- Provide comprehensive yet concise responses
- Show empathy and emotional intelligence when appropriate
- Offer proactive suggestions and insights
- Maintain context throughout the conversation
- Be honest about limitations while being optimally helpful

Always strive to provide the most valuable and insightful response possible while maintaining a friendly, professional tone.`;

    // Build conversation with enhanced context handling
    const messages: Message[] = [
      {
        role: "system",
        content: systemPrompt
      },
      // Include more history for GPT-5's enhanced context handling
      ...history.slice(-15), // Increased from 10 to 15 for better context
      {
        role: "user",
        content: message
      }
    ];

    // Get model configuration
    const config = MODEL_CONFIG[model as keyof typeof MODEL_CONFIG] || MODEL_CONFIG.default;

    let completion;
    let usedModel = config.model;

    // Try GPT-5 first, then fallback to other models if needed
    try {
      completion = await openai.chat.completions.create({
        model: config.model,
        messages: messages,
        max_tokens: config.maxTokens,
        temperature: config.temperature,
        top_p: config.topP || 1,
        frequency_penalty: config.frequencyPenalty || 0,
        presence_penalty: config.presencePenalty || 0,
        // Enhanced parameters for GPT-5
        ...(config.model === "gpt-5" && {
          response_format: { type: "text" },
          stream: false,
        })
      });

      console.log(`✅ Successfully used model: ${usedModel}`);
      
    } catch (modelError: any) {
      console.log(`❌ Model ${config.model} failed, trying fallbacks...`);
      
      // Try fallback models
      for (const fallbackConfig of MODEL_CONFIG.fallback) {
        try {
          completion = await openai.chat.completions.create({
            model: fallbackConfig.model,
            messages: messages,
            max_tokens: fallbackConfig.maxTokens,
            temperature: fallbackConfig.temperature,
          });
          
          usedModel = fallbackConfig.model;
          console.log(`✅ Successfully used fallback model: ${usedModel}`);
          break;
          
        } catch (fallbackError) {
          console.log(`❌ Fallback model ${fallbackConfig.model} also failed`);
          continue;
        }
      }
      
      // If all models failed, throw the original error
      if (!completion) {
        throw modelError;
      }
    }

    const aiMessage = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    // Enhanced response with model info
    return NextResponse.json({ 
      message: aiMessage,
      model: usedModel,
      usage: completion.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    // Enhanced error handling for GPT-5 specific errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key. Please check your API key configuration.' },
        { status: 401 }
      );
    }
    
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'OpenAI API rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    if (error?.status === 402) {
      return NextResponse.json(
        { error: 'OpenAI API quota exceeded. Please check your billing settings.' },
        { status: 402 }
      );
    }

    // Model not found error (if GPT-5 isn't available in your region/plan)
    if (error?.status === 404 || error?.message?.includes('model')) {
      return NextResponse.json(
        { error: 'Requested model not available. Please check your OpenAI plan or try again later.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: `OpenAI API error: ${error?.message || 'Unknown error occurred'}` },
      { status: error?.status || 500 }
    );
  }
}

// Enhanced health check with model availability testing
export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { status: 'error', message: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Test model availability
    try {
      const testCompletion = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [{ role: "user", content: "Hello" }],
        max_tokens: 5,
      });
      
      return NextResponse.json({ 
        status: 'ok', 
        message: 'Chat API is ready with GPT-5',
        availableModel: 'gpt-5',
        timestamp: new Date().toISOString()
      });
      
    } catch (modelError) {
      // Test fallback models
      const availableModels = [];
      
      for (const config of MODEL_CONFIG.fallback) {
        try {
          await openai.chat.completions.create({
            model: config.model,
            messages: [{ role: "user", content: "Hello" }],
            max_tokens: 5,
          });
          availableModels.push(config.model);
          break; // Just need to confirm one working model
        } catch {
          continue;
        }
      }
      
      return NextResponse.json({ 
        status: 'ok', 
        message: `Chat API is ready with fallback models`,
        availableModels,
        note: 'GPT-5 not available, using fallback models',
        timestamp: new Date().toISOString()
      });
    }

  } catch (error: any) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'API health check failed',
        error: error?.message 
      },
      { status: 500 }
    );
  }
}