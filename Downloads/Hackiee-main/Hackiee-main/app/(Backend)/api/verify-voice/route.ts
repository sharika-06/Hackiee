import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { transcript, code, questionId } = await request.json();

        if (!transcript || transcript.trim().length < 5) {
            return NextResponse.json({
                isAI: false,
                confidence: 0,
                reason: 'No transcript provided'
            });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are an expert in detecting AI-generated vs human-spoken explanations.

A student was asked to verbally explain their code solution via voice recording. The speech-to-text transcript is below.

TRANSCRIPT:
"${transcript}"

CODE THEY SUBMITTED:
${code || '(no code provided)'}

QUESTION CONTEXT:
${questionId || 'general coding question'}

Analyze ONLY the transcript for these signs of AI-generation or text-to-speech:
1. Overly formal, structured language with perfect grammar (humans stumble, use fillers like "um", "so", "basically", "like")
2. Suspiciously complete and verbose explanations that cover all edge cases perfectly
3. Robotic sentence structure with no natural speech patterns
4. Perfect technical terminology without any colloquial simplification
5. No personal references ("I wrote", "I thought", "I decided to")
6. Sounds like it was read from documentation

Respond ONLY in this exact JSON format:
{
  "isAI": true or false,
  "confidence": 0-100,
  "reason": "brief one-line reason"
}

If the transcript sounds like natural human speech (with imperfections, personal voice, informal words), set isAI to false.
If it sounds like AI-generated or text-to-speech, set isAI to true.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            // Default to human if we can't parse
            return NextResponse.json({ isAI: false, confidence: 0, reason: 'Could not analyze' });
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return NextResponse.json({
            isAI: parsed.isAI ?? false,
            confidence: parsed.confidence ?? 50,
            reason: parsed.reason ?? ''
        });

    } catch (error: any) {
        console.error('Voice verification error:', error);
        // On error, don't block the student — default to not AI
        return NextResponse.json({
            isAI: false,
            confidence: 0,
            reason: 'Verification service unavailable'
        });
    }
}
