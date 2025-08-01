import dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

const referer =
  typeof window !== 'undefined' && window.location.hostname.includes('github.dev')
    ? 'https://curly-succotash-5574r5q5vpqc75x7-3000.app.github.dev/'
    : 'https://mind-maze-i58j47eor-komal-1010s-projects.vercel.app/';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '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',
  defaultHeaders: {
    'HTTP-Referer': referer,
    'X-Title': 'MindMaze App',
  },
});


export const generatePuzzle = async (req, res) => {
  const { level = 'medium', category = 'logic' } = req.body;

  const systemPrompt = 'You are a puzzle master.';
  const userPrompt = `Generate a ${level}-level ${category} puzzle in the following strict JSON format only:

{
  "question": "...",
  "options": ["A", "B", "C"],
  "answer": "B",
  "level": "${level}",
  "category": "${category}"
}

DO NOT include any explanation, markdown, or text. Respond with **JSON only** — nothing else.`;



  const referer =
    typeof window !== 'undefined' && window.location.hostname.includes('github.dev')
      ? 'https://curly-succotash-5574r5q5vpqc75x7-3000.app.github.dev/'
      : 'https://mind-maze-i58j47eor-komal-1010s-projects.vercel.app/';

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': referer,
        'X-Title': 'MindMaze App',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct', // or another model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      })
    });

    const data = await response.json();

    const aiContent = data.choices?.[0]?.message?.content || '';
    const match = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || aiContent.match(/{[\s\S]*}/);
    const jsonText = match ? match[1] || match[0] : null;

    if (!jsonText) throw new Error('No JSON found in response');

    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (error) {
    console.error('AI puzzle generation failed:', error.message);
    res.status(500).json({ error: 'Puzzle generation failed. Please try again later.' });
  }
};

