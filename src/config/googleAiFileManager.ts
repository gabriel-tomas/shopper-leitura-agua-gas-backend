import { GoogleAIFileManager } from "@google/generative-ai/server";

export const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

export const uploadFileToGoogleAi = async (imagePath: string, displayName: string) => {
  const uploadResponse = await fileManager.uploadFile(imagePath, {
    mimeType: "image/png",
    displayName,
  });
  return uploadResponse;
};