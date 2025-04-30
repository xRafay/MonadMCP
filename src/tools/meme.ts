import axios from 'axios';
import { z } from 'zod';

// Define type for request
type GenerateMemeRequest = {
  params: {
    template: string;
    text: string;
  };
};

// Define type for response
type GenerateMemeResponse = {
  url?: string;
  error?: string;
};

// Tool: Make a meme
export const generateMeme = async (request: GenerateMemeRequest): Promise<GenerateMemeResponse> => {
  // Validate the request params
  const schema = z.object({ template: z.string(), text: z.string() });
  const { template, text } = schema.parse(request.params);

  // Ensure MEMEGEN_API_URL is defined
  const memeGenApiUrl = process.env.MEMEGEN_API_URL;
  if (!memeGenApiUrl) {
    throw new Error(
      'MEMEGEN_API_URL is not defined in .env. Please set it to a valid meme generation API URL (e.g., https://api.memegen.link).'
    );
  }

  try {
    // Construct the URL for the Memegen API (or similar API)
    // Example: https://api.memegen.link/images/success-kid/Great_Job.jpg
    const encodedText = encodeURIComponent(text.replace(/\s+/g, '_')); // Replace spaces with underscores and encode
    const url = `${memeGenApiUrl}/images/${template}/${encodedText}.jpg`;

    // Send a GET request to the API
    const response = await axios.get(url);

    // Since this is an image URL, we don't need to parse the response as JSON
    // The URL itself is the result, assuming the GET request succeeds
    return { url };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred while generating meme';
    return { error: `Failed to generate meme: ${errorMessage}` };
  }
};