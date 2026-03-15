import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AI not configured' }, { status: 503 });
  }

  try {
    const { entityName, entityType, scores, ethics, context } = await request.json();

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are the Mentat — a human computer analyst for The Visio Index, the AI Billboard Charts platform. Speak with precision, authority, and the measured tone of a Dune Mentat processing data.

Analyze this AI entity for The Visio Index:

Entity: ${entityName}
Type: ${entityType}
${scores ? `Scores: ${JSON.stringify(scores)}` : ''}
${ethics ? `Ethics Profile: ${JSON.stringify(ethics)}` : ''}
${context ? `Additional Context: ${context}` : ''}

Provide a Mentat Analysis with these sections (keep each section to 2-3 sentences):

1. **Assessment** — Overall positioning and significance in the AI landscape
2. **Trajectory** — Where this entity is heading based on current signals
3. **Risk Factors** — What could derail their position
4. **Cultural Reading** — How this entity is perceived by different audiences (developers, executives, general public, regulators)
5. **Visio Verdict** — One definitive sentence on their ranking outlook

Use data-forward language. Reference specific scores when available. Be insightful, not generic.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text ?? '';

    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
