import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://mind-maze-i58j47eor-komal-1010s-projects.vercel.app/',
    'X-Title': 'MindMaze App',
  },
});

export const generatePuzzle = async (req, res) => {
  const { level = 'medium', category = 'logic' } = req.body;

  const systemPrompt = 'You are a puzzle master.';
  const userPrompt = `Generate a ${level}-level ${category} puzzle with 3 options and specify the correct answer in this JSON format only:

{
  "question": "...",
  "options": ["A", "B", "C"],
  "answer": "B",
  "level": "${level}",
  "category": "${category}"
}

Respond with JSON only.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const aiContent = response.choices[0].message.content;

    const match = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || aiContent.match(/{[\s\S]*}/);
    const jsonText = match ? match[1] || match[0] : null;

    if (!jsonText) throw new Error('No JSON found');

    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (error) {
    console.error('AI puzzle generation failed:', error.message);

    // 🔁 Inline fallback logic
    const fallback = puzzles.filter(
      (p) => p.level === level && p.category === category
    );
    if (fallback.length > 0) {
      const randomPuzzle = fallback[Math.floor(Math.random() * fallback.length)];
      res.json(randomPuzzle);
    } else {
      res.status(500).json({ error: 'No fallback puzzle available' });
    }
  }
};

