import { GoogleGenAI } from '@google/genai';

export async function GET() {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: `Generate five unique and interesting questions that could be used to start a conversation with someone. 
                      Each question should be different and encourage thoughtful responses. 
                      Format each question as a separate line.`,
        });

        const generatedText = response.text;

        if (generatedText) {
            const messages = processGeneratedText(generatedText);
            return Response.json({ messages: messages, success: true }, { status: 200 });
        }


    } catch (error) {
        console.error("Error generating messages:", error);
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