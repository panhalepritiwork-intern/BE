import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
const MODEL_NAME = "models/gemini-2.5-flash";
const BASE_PROMPT = process.env.TASK_PROMPT as string;

export async function generateTaskDescription(title: string): Promise<string> {
  try {
    console.log("Generating improved description for:", title);

    const prompt = BASE_PROMPT.replace("{title}", title);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return "Error generating description.";
    }

    const description =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No description generated.";

    const shortDesc = description.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
    console.log("Final refined description:", shortDesc);

    return shortDesc;
  } catch (error) {
    console.error("Gemini API Error (catch):", error);
    return "Error generating description.";
  }
}
