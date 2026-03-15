import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { candidateId, currentImageBase64, masterImageBase64 } = await request.json();

        if (!currentImageBase64 || !masterImageBase64) {
            return NextResponse.json({ match: false, confidence: 0, error: 'Missing images' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Strip the data URI prefix if present
        const stripPrefix = (b64: string) => b64.replace(/^data:image\/\w+;base64,/, '');

        const masterPart = {
            inlineData: {
                data: stripPrefix(masterImageBase64),
                mimeType: 'image/jpeg'
            }
        };

        const currentPart = {
            inlineData: {
                data: stripPrefix(currentImageBase64),
                mimeType: 'image/jpeg'
            }
        };

        const result = await model.generateContent([
            masterPart,
            currentPart,
            `You are an advanced proctoring AI for a technical assessment. Analyze these two images for security and integrity.
Image 1: Master Reference (Selfie taken at start).
Image 2: Periodic Webcam Snapshot.

Tasks:
1. Face Counting: Count the exact number of human faces visible in Image 2.
2. Face Presence: Is there at least one human face visible in Image 2?
3. Face Visibility: Is the face in Image 2 clearly visible and NOT covered?
4. Cheat Material Detection: Are there any mobile phones, books, or notes visible in Image 2?
5. Identity Match: Does the person in Image 2 match the individual in Image 1?

CRITICAL PRIORITY RULES FOR CLASSIFICATION:
You MUST follow this exact priority order when determining the "issue" field:
Priority 1 (HIGHEST): If you count 2 OR MORE human faces in Image 2, IMMEDIATELY set "issue" to "multiple_people" and "match" to false. Stop evaluating other rules.
Priority 2: If NO face is found in Image 2, set "issue" to "no_face" and "match" to false.
Priority 3: If a face is found but it is covered/obstructed, set "issue" to "face_covered" and "match" to false.
Priority 4: If any cheating material (phone, book, notes) is detected, set "issue" to "cheat_material" and "match" to false.
Priority 5: If the person in Image 2 clearly DOES NOT match the person in Image 1, set "issue" to "identity_mismatch", "match" to false, and set "confidence" to evaluate mismatch certainty (0 = match, 100 = definitely different).
Priority 6 (LOWEST): If exactly one secure face is found that matches Image 1, set "issue" to "none" and "match" to true.

Respond ONLY with JSON:
{
  "match": boolean, 
  "confidence": 0-100,
  "faceVisible": boolean,
  "multiplePeople": boolean,
  "issue": "none" | "multiple_people" | "face_covered" | "identity_mismatch" | "no_face" | "cheat_material",
  "reason": "short explanation of the issue based on Priority rules"
}`
        ]);

        const text = result.response.text().trim();
        const jsonMatch = text.match(/\{[\s\S]*?\}/);

        if (!jsonMatch) {
            return NextResponse.json({ match: true, confidence: 50, candidateId });
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return NextResponse.json({
            match: parsed.match ?? true,
            confidence: parsed.confidence ?? 80,
            faceVisible: parsed.faceVisible ?? true,
            multiplePeople: parsed.multiplePeople ?? false,
            detectedIssue: parsed.issue ?? "none",
            reason: parsed.reason || "",
            candidateId,
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('Identity verification error:', error);
        // Default to true on error to prevent false positive flags
        return NextResponse.json({ match: true, confidence: 0, error: error.message });
    }
}
