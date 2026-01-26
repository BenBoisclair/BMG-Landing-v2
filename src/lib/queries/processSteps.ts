import { sanityClient } from '../sanity';

export interface SanityProcessStep {
  _id: string;
  stepNumber: number;
  title: { en?: string; th?: string; ar?: string };
  titleShort?: { en?: string; th?: string; ar?: string };
  subtitle?: { en?: string; th?: string; ar?: string };
  description?: { en?: string; th?: string; ar?: string };
  bulletPoints?: Array<{ en?: string; th?: string; ar?: string }>;
  image?: any;
}

// Get all process steps
export async function getAllProcessSteps(): Promise<SanityProcessStep[]> {
  return sanityClient.fetch(`
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
}

// Get single process step by number
export async function getProcessStepByNumber(
  stepNumber: number
): Promise<SanityProcessStep | null> {
  return sanityClient.fetch(
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
}
