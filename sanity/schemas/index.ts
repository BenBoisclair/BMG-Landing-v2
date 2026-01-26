// Object types
import { localizedString } from './objects/localizedString';
import { localizedText } from './objects/localizedText';
import { seoFields } from './objects/seoFields';

// Document types
import { material } from './documents/material';
import { project } from './documents/project';
import { model3d } from './documents/model3d';
import { testimonial } from './documents/testimonial';
import { processStep } from './documents/processStep';
import { pricingConfig } from './documents/pricingConfig';
import { siteSettings } from './documents/siteSettings';

export const schemaTypes = [
  // Objects (must be defined before documents that use them)
  localizedString,
  localizedText,
  seoFields,

  // Documents
  material,
  project,
  model3d,
  testimonial,
  processStep,
  pricingConfig,
  siteSettings,
];
