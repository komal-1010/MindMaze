import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1', 
  apiKey: process.env.OPENROUTER_API_KEY, 
  defaultHeaders: {
    'HTTP-Referer': 'https://curly-succotash-5574r5q5vpqc75x7-3000.app.github.dev/', 
    'X-Title': 'MindMaze App',
  },
});

export const generatePuzzle = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'openai/gpt-4o', 
      messages: [
        { role: 'system', content: 'You are a puzzle master.' },
        {
          role: 'user',
          content:
            'Generate a medium-level logic puzzle with 4 options and specify the correct answer in JSON format. Example format: {"puzzle": "...", "options": ["A", "B", "C", "D"], "answer": "B"}',
        },
      ],
    });

    const puzzleJSON = response.choices[0].message.content;

    try {
      const parsed = JSON.parse(puzzleJSON); // Validate correct JSON
      res.json(parsed);
    } catch (err) {
      console.warn('Invalid JSON from AI:', puzzleJSON);
      res.json({ puzzle: puzzleJSON }); 
    }
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'AI puzzle generation failed' });
  }
};