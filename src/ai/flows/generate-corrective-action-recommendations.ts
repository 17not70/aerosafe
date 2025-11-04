'use server';
/**
 * @fileOverview Generates corrective action recommendations for a safety report using GenAI.
 *
 * - generateCorrectiveActionRecommendations - A function that generates corrective action recommendations.
 * - GenerateCorrectiveActionRecommendationsInput - The input type for the generateCorrectiveActionRecommendations function.
 * - GenerateCorrectiveActionRecommendationsOutput - The return type for the generateCorrectiveActionRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCorrectiveActionRecommendationsInputSchema = z.object({
  reportDetails: z.string().describe('The details of the safety report.'),
});
export type GenerateCorrectiveActionRecommendationsInput = z.infer<
  typeof GenerateCorrectiveActionRecommendationsInputSchema
>;

const GenerateCorrectiveActionRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('The AI-generated recommendations for corrective actions.'),
});
export type GenerateCorrectiveActionRecommendationsOutput = z.infer<
  typeof GenerateCorrectiveActionRecommendationsOutputSchema
>;

export async function generateCorrectiveActionRecommendations(
  input: GenerateCorrectiveActionRecommendationsInput
): Promise<GenerateCorrectiveActionRecommendationsOutput> {
  return generateCorrectiveActionRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCorrectiveActionRecommendationsPrompt',
  input: {schema: GenerateCorrectiveActionRecommendationsInputSchema},
  output: {schema: GenerateCorrectiveActionRecommendationsOutputSchema},
  prompt: `You are an aviation safety expert providing recommendations for corrective actions based on safety reports.

  Based on the following safety report details, provide a list of numbered recommendations for corrective actions. Be specific, and actionable.
  Report Details: {{{reportDetails}}}`,
});

const generateCorrectiveActionRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateCorrectiveActionRecommendationsFlow',
    inputSchema: GenerateCorrectiveActionRecommendationsInputSchema,
    outputSchema: GenerateCorrectiveActionRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
