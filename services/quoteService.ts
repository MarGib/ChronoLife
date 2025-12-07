import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from "../types";

const FALLBACK_QUOTES: Quote[] = [
  { text: "Czas to pieniądz, a pieniądz to więcej niż czas.", author: "Edgar Allan Poe" },
  { text: "Wszystko płynie.", author: "Heraklit z Efezu" },
  { text: "Czas nie leczy ran, czas przyzwyczaja do bólu.", author: "Nieznany" },
  { text: "Największym złodziejem jest czas.", author: "Przysłowie" },
  { text: "Życie to nie te dni, które przeminęły, ale te, które się pamięta.", author: "Gabriel Garcia Marquez" },
  { text: "Jutro to dziś, tyle że jutro.", author: "Sławomir Mrożek" },
  { text: "Czas ucieka, wieczność czeka.", author: "Przysłowie" }
];

export const fetchPhilosophicalQuotes = async (): Promise<Quote[]> => {
  if (!process.env.API_KEY) {
    console.warn("API Key is missing, using fallback quotes.");
    return FALLBACK_QUOTES;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generuj listę 10 głębokich, filozoficznych cytatów w języku polskim dotyczących przemijania czasu, życia i śmierci. Cytaty powinny pochodzić od sławnych myślicieli, pisarzy lub filozofów.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: "Treść cytatu po polsku" },
              author: { type: Type.STRING, description: "Autor cytatu" }
            },
            required: ["text", "author"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return FALLBACK_QUOTES;
    
    const quotes = JSON.parse(jsonText) as Quote[];
    return quotes.length > 0 ? quotes : FALLBACK_QUOTES;

  } catch (error) {
    console.error("Failed to fetch quotes from Gemini:", error);
    return FALLBACK_QUOTES;
  }
};