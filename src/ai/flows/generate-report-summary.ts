'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a summary of a safety report.
 *
 * It takes a report description as input and returns a concise summary highlighting key issues and risks.
 *
 * @exports {generateReportSummary} - The main function to generate the report summary.
 * @exports {ReportSummaryInput} - The input type for the generateReportSummary function.
 * @exports {ReportSummaryOutput} - The output type for the generateReportSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the report summary generation.
const ReportSummaryInputSchema = z.object({
  reportDescription: z
    .string()
    .describe('The detailed description of the safety report.'),
});
export type ReportSummaryInput = z.infer<typeof ReportSummaryInputSchema>;

// Define the output schema for the report summary.
const ReportSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the safety report.'),
});
export type ReportSummaryOutput = z.infer<typeof ReportSummaryOutputSchema>;

/**
 * Generates a summary of a safety report given its description.
 * @param input - The input object containing the report description.
 * @returns A promise that resolves to the generated report summary.
 */
export async function generateReportSummary(input: ReportSummaryInput): Promise<ReportSummaryOutput> {
  return generateReportSummaryFlow(input);
}

// Define the prompt for generating the report summary.
const reportSummaryPrompt = ai.definePrompt({
  name: 'reportSummaryPrompt',
  input: {schema: ReportSummaryInputSchema},
  output: {schema: ReportSummaryOutputSchema},
  prompt: `You are an expert safety officer. Please provide a concise summary of the following safety report description, highlighting key issues and potential risks:\n\n{{{reportDescription}}}\n\nSummary:`,
});

// Define the Genkit flow for generating the report summary.
const generateReportSummaryFlow = ai.defineFlow(
  {
    name: 'generateReportSummaryFlow',
    inputSchema: ReportSummaryInputSchema,
    outputSchema: ReportSummaryOutputSchema,
  },
  async input => {
    const {output} = await reportSummaryPrompt(input);
    return output!;
  }
);
