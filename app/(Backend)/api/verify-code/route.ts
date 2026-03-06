import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { QUESTIONS } from "@/lib/questions";

// Initialize the Google Gen AI client. 
// Note: You must make sure GEMINI_API_KEY is defined in your environment

export async function POST(req: NextRequest) {
    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json(
            { error: "GEMINI_API_KEY is not defined in the environment.", isCorrect: false, feedback: "Missing API Key configuration." },
            { status: 500 }
        );
    }
    const ai = new GoogleGenAI({});

    try {
        const { code, questionId, language } = await req.json();

        if (!code || !questionId) {
            return NextResponse.json(
                { error: "Code and questionId are required" },
                { status: 400 }
            );
        }

        const question = QUESTIONS.find((q) => q.id === questionId);
        if (!question) {
            return NextResponse.json(
                { error: "Invalid question ID" },
                { status: 400 }
            );
        }

        const prompt = `You are a senior code reviewer. Evaluate the provided code against the problem statement.
Problem Statement: ${question.description}

Here is the student's submitted code:
\`\`\`${language}
${code}
\`\`\`

Evaluate the code for functional correctness. If the logic works (even if it uses a different approach like a while loop instead of a for loop), it should get a 100%.
Return a STRICT JSON response (do not include markdown wrappers like \`\`\`json) with the following structure:
{
  "score": number, // 0 to 100 based on functional correctness
  "feedback": "string" // brief explanation of why
}
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.1,
                responseMimeType: 'application/json',
            }
        });

        const output = response.text || "{}";

        let result;
        try {
            result = JSON.parse(output);
        } catch (parseError) {
            console.error("Failed to parse Gemini response as JSON:", output);
            // Fallback response if the model didn't return valid JSON
            return NextResponse.json(
                { error: "AI failed to evaluate code properly", fallback: true },
                { status: 500 }
            );
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Error verifying code with AI:", error);
        return NextResponse.json(
            { error: error?.message || String(error) },
            { status: 500 }
        );
    }
}
