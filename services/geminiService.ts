
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Analyze ingredients using gemini-3-flash-preview for efficiency
export const analyzeIngredients = async (text: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `分析以下食材的养生价值：${text}。请以 JSON 格式返回，包含食材性质（温寒凉热平）、主要功效、适用人群和禁忌。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          nature: { type: Type.STRING },
          benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: { type: Type.STRING },
          cautions: { type: Type.STRING }
        },
        required: ["nature", "benefits", "recommendations", "cautions"]
      }
    }
  });
  // Extract text using the property directly
  return JSON.parse(response.text);
};

// Use generateContent with full history for context-aware conversation
export const getWellnessChatResponse = async (history: {role: string, parts: {text: string}[]}[]) => {
  const ai = getAIClient();
  
  // Gemini requires the contents array to start with a 'user' turn.
  // We filter out any initial model greeting from the history list.
  const validHistory = history.filter((msg, idx) => !(idx === 0 && msg.role === 'model'));

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: validHistory,
    config: {
      systemInstruction: '你是一位融合中医智慧与现代营养学的世界级植食养生专家。你奉行“天人合一”的养生观，说话温润优雅，如沐春风。',
    },
  });
  return response.text;
};

// Generate full plant-based recipes with structured output
export const generateRecipe = async (goal: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `请根据以下养生目标生成一个全植（Vegan）养生食谱：${goal}。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
          healthFocus: { type: Type.STRING }
        },
        required: ["title", "description", "ingredients", "steps"]
      }
    }
  });
  return JSON.parse(response.text);
};
