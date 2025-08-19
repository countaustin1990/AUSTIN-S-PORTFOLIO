import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are an AI assistant for Augustine Akpokonyan's portfolio website. 
Your role is to help visitors learn more about Augustine's work, skills, and experience.

Key information about Augustine:
- Experienced web developer with over 5 years of experience
- Specializes in React, Next.js, TypeScript, and modern web technologies
- Creates exceptional digital experiences and solves real problems
- Open to collaboration and new opportunities

Be helpful, professional, and concise in your responses. If you don't know something specific about Augustine, be honest and suggest contacting him directly through the contact form.`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return NextResponse.json({
      message: completion.choices[0].message?.content ?? "No response received.",
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
