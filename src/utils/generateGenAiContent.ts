import { UploadFileResponse } from '@google/generative-ai/dist/server/server';

import { model } from '../config/googleGenAi';

export const generateGenAiContent = async (prompt: string, uploadResponse: UploadFileResponse) => {
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri
      }
    },
    { text: prompt },
  ]);

  return result.response.text();
}
