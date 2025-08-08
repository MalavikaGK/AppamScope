
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import type { HoroscopeResult } from '../types';



if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        isAppam: {
            type: Type.BOOLEAN,
            description: "Is the image an appam, or a similar pancake like a dosa or crepe?"
        },
        zodiacName: {
            type: Type.STRING,
            description: "The zodiac sign (e.g., 'Aries', 'Taurus') determined from the appam's patterns. Should be one of the 12 standard western zodiac signs, lowercase."
        },
        horoscope: {
            type: Type.STRING,
            description: "A whimsical, positive, and creative horoscope of 2-3 sentences. It should be full of food-related puns and relate to the determined zodiac sign."
        },
        rejectionReason: {
            type: Type.STRING,
            description: "If isAppam is false, provide a short, funny, and kind reason why the image isn't suitable for a horoscope reading."
        }
    },
    required: ["isAppam", "zodiacName", "horoscope", "rejectionReason"],
};

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
    return {
        inlineData: {
            data: base64Data,
            mimeType
        },
    };
};

export const getHoroscopeFromAppam = async (imageBase64: string, mimeType: string): Promise<HoroscopeResult> => {
    const imagePart = fileToGenerativePart(imageBase64, mimeType);

    const systemInstruction = "You are AppamScopus, a mystical and playful astrologer who reads the future from South Indian Appam pancakes. Your tone is whimsical, encouraging, and full of food-related puns. You determine a person's daily horoscope by interpreting the patterns of holes, the crispiness of the edges, and the overall shape of their Appam. You must always respond in the requested JSON format.";

    const contents = {
        parts: [
            imagePart,
            { text: "Behold, my morning meal! Peer into its cosmic craters and divine my fate for today. What zodiac sign does its pattern represent, and what does the universe have in store for me? If this is not an Appam or similar food, please tell me in a funny way." }
        ]
    };

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.9,
            }
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        return result as HoroscopeResult;
    } catch (error) {
        console.error("Error generating horoscope:", error);
        throw new Error("The cosmic energies are fuzzy right now. Please try again later.");
    }
};
