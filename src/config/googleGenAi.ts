import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const modelName = 'gemini-1.5-flash';

export const model = genAI.getGenerativeModel({ model: modelName });
