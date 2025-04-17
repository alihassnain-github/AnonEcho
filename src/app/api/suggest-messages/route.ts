import { GoogleGenAI } from '@google/genai';
const randomSeed = Math.random().toString(36).slice(2);

export async function GET() {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: `Generate five **new**, creative, and unique questions to start a conversation. 
Avoid repeating questions you've seen before. Be imaginative and thoughtful.
Each question should be different in tone and topic, and encourage meaningful responses.
Add variety in subject matter: emotional, hypothetical, light-hearted, deep, or quirky.
Seed: ${randomSeed}
Format each question on a new line.`,
        });

        const generatedText = response.text;

        if (generatedText) {
            const messages = processGeneratedText(generatedText);
            return Response.json({ messages: messages, success: true }, { status: 200 });
        }


    } catch (error) {
        console.error("Error generating messages :", error);
        return Response.json(
            { error: "Failed to generate messages", success: false },
            { status: 500 }
        );
    }
}

function processGeneratedText(text: string) {
    const lines = text.split('\n');
    const messages = lines.filter(line => line.trim() !== '').map(line => line.trim());
    return messages.slice(0, 5);
}