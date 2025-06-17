import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generatePuzzle = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a puzzle master.' },
        { role: 'user', content: 'Generate a medium-level logic puzzle with 4 options and specify the correct answer in JSON format.' }
      ],
    });

    const puzzleText = response.choices[0].message.content;
    res.json({ puzzle: puzzleText });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'AI puzzle generation failed' });
  }
};
