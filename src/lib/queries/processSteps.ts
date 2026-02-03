import { sanityClient } from '../sanity';

// Localized string type for all 5 supported languages
interface LocalizedString {
  en?: string;
  th?: string;
  ar?: string;
  hi?: string;
  zh?: string;
}

export interface SanityProcessStep {
  _id: string;
  stepNumber: number;
  title: LocalizedString;
  titleShort?: LocalizedString;
  subtitle?: LocalizedString;
  description?: LocalizedString;
  bulletPoints?: Array<LocalizedString>;
  image?: any;
}

// Get all process steps with error handling
export async function getAllProcessSteps(): Promise<SanityProcessStep[]> {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "processStep"] | order(stepNumber asc) {
        _id,
        stepNumber,
        title,
        titleShort,
        subtitle,
        description,
        bulletPoints,
        image
      }
    `);
    return result || [];
  } catch (error) {
    console.error('Failed to fetch process steps from Sanity:', error);
    return [];
  }
}

// Get single process step by number with error handling
export async function getProcessStepByNumber(
  stepNumber: number
): Promise<SanityProcessStep | null> {
  try {
    return await sanityClient.fetch(
      `
      *[_type == "processStep" && stepNumber == $stepNumber][0] {
        _id,
        stepNumber,
        title,
        titleShort,
        subtitle,
        description,
        bulletPoints,
        image
      }
    `,
      { stepNumber }
    );
  } catch (error) {
    console.error(`Failed to fetch process step ${stepNumber}:`, error);
    return null;
  }
}
