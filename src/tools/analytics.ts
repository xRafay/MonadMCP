import axios from 'axios';
import { z } from 'zod';

// Define type for request
type GetAnalyticsRequest = {
  params: {
    query: string;
  };
};

// Define type for response
type GetAnalyticsResponse = {
  data?: any;
  error?: string;
};

// Define the schema for the API response (adjust based on actual Flipside API response)
const analyticsResponseSchema = z.object({
  // Example: adjust this based on the actual response structure
  data: z.any(), // You can make this more specific if you know the structure
});

// Tool: Get blockchain analytics
export const getAnalytics = async (request: GetAnalyticsRequest): Promise<GetAnalyticsResponse> => {
  // Validate the request params
  const schema = z.object({ query: z.string() });
  const { query } = schema.parse(request.params);

  // Ensure FLIPSIDE_API_KEY is defined
  const flipsideApiKey = process.env.FLIPSIDE_API_KEY;
  if (!flipsideApiKey) {
    throw new Error(
      'FLIPSIDE_API_KEY is not defined in .env. Please sign up at https://flipsidecrypto.xyz to get an API key.'
    );
  }

  // Use FLIPSIDE_API_URL from .env, with a fallback
  const flipsideApiUrl =
    process.env.FLIPSIDE_API_URL || 'https://api.flipsidecrypto.xyz/query';

  try {
    const response = await axios.get(flipsideApiUrl, {
      headers: { Authorization: `Bearer ${flipsideApiKey}` },
      params: { query },
    });

    // Validate the API response
    const validatedResponse = analyticsResponseSchema.parse(response.data);
    return { data: validatedResponse.data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred while fetching analytics';
    return { error: `Failed to fetch analytics: ${errorMessage}` };
  }
};