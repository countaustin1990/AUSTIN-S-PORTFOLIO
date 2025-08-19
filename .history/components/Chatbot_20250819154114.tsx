import React, { useState } from "react";
import OpenAI from "openai";

// Use your actual OpenAI API key
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY! });

// Define the system prompt
const systemPrompt = `
You are Augustine's AI assistant.
- Be concise, helpful, honest, and proactive.
- Always answer clearly and stay on topic.
- Ask clarifying questions if the user's request is unclear.
`;

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...newMessages, // spread the array instead of using a string
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const aiMessage = response.choices[0]?.message?.content || "Sorry, I couldn't respond.";
      setMessages([...newMessages, { role: "assistant", content: aiMessage }]);
      setInput("");
    } catch (err) {
      console.error("OpenAI error:", err);
      setMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong." }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "user-msg" : "ai-msg"}>
            {m.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
