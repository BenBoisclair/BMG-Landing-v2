/**
 * Migration Script: Migrate BMG data from JSON/i18n to Sanity CMS
 *
 * This script migrates:
 * - Materials (85+ items) from materials.json + i18n translations
 * - Projects (16 items) from projects.json + i18n translations
 * - Testimonials from i18n translations
 * - Process Steps from i18n translations
 * - 3D Models (showcase models)
 * - Pricing Configuration
 * - Site Settings
 *
 * Usage:
 *   pnpm sanity:migrate
 *
 * Prerequisites:
 *   - Create a Sanity project at sanity.io/manage
 *   - Get your project ID and add to .env
 *   - Create a write token (Settings > API > Tokens)
 */

import 'dotenv/config';
import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ESM compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing required environment variables:');
  console.error('  PUBLIC_SANITY_PROJECT_ID - Your Sanity project ID');
  console.error('  SANITY_API_WRITE_TOKEN - Write token from Sanity dashboard');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// Load source data
const materialsPath = path.join(__dirname, '../src/data/materials.json');
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const enPath = path.join(__dirname, '../src/i18n/translations/en.json');
const thPath = path.join(__dirname, '../src/i18n/translations/th.json');
const arPath = path.join(__dirname, '../src/i18n/translations/ar.json');

const materialsData = JSON.parse(fs.readFileSync(materialsPath, 'utf-8'));
const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
const thTranslations = JSON.parse(fs.readFileSync(thPath, 'utf-8'));
const arTranslations = JSON.parse(fs.readFileSync(arPath, 'utf-8'));

// Category mapping
const categoryMap: Record<string, 'premium' | 'luxury' | 'classic'> = {
  premium: 'premium',
  luxury: 'luxury',
  classic: 'classic',
};

// Helper to create localized string
function localizedString(
  enValue?: string,
  thValue?: string,
  arValue?: string
): { en?: string; th?: string; ar?: string } {
  return {
    en: enValue || undefined,
    th: thValue || undefined,
    ar: arValue || undefined,
  };
}

// Helper to get nested value safely
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

async function migrateMaterials() {
  console.log('\n📦 Migrating Materials...');
  let count = 0;

  for (const category of materialsData.categories) {
    const sanityCategory = categoryMap[category.id];

    for (const material of category.materials) {
      const enItem = enTranslations.materials?.items?.[material.id];
      const thItem = thTranslations.materials?.items?.[material.id];
      const arItem = arTranslations.materials?.items?.[material.id];

      const doc = {
        _id: `material-${material.id}`,
        _type: 'material',
        internalId: { _type: 'slug', current: material.id },
        name: localizedString(enItem?.name, thItem?.name, arItem?.name),
        description: localizedString(
          enItem?.description,
          thItem?.description,
          arItem?.description
        ),
        category: sanityCategory,
        // Note: Images need to be uploaded separately or referenced from public folder
        // For now, we'll store the image path as a placeholder
        // mainImage will need to be handled via Sanity's asset pipeline
        order: count + 1,
      };

      try {
        await client.createOrReplace(doc);
        console.log(`  ✓ Material: ${material.id}`);
        count++;
      } catch (error) {
        console.error(`  ✗ Error migrating material ${material.id}:`, error);
      }
    }
  }

  console.log(`  Total materials migrated: ${count}`);
}

async function migrateProjects() {
  console.log('\n🏗️ Migrating Projects...');
  let count = 0;

  for (const projectType of projectsData.projectTypes) {
    for (const project of projectType.projects) {
      const enItem = enTranslations.project?.projects?.[project.id];
      const thItem = thTranslations.project?.projects?.[project.id];
      const arItem = arTranslations.project?.projects?.[project.id];

      const doc = {
        _id: `project-${project.id}`,
        _type: 'project',
        internalId: { _type: 'slug', current: project.id },
        name: localizedString(enItem?.name, thItem?.name, arItem?.name),
        artTitle: localizedString(
          enItem?.artTitle,
          thItem?.artTitle,
          arItem?.artTitle
        ),
        description: localizedString(
          enItem?.description,
          thItem?.description,
          arItem?.description
        ),
        category: projectType.id as 'religious' | 'legacy' | 'architectural',
        material: localizedString(
          enItem?.material,
          thItem?.material,
          arItem?.material
        ),
        customer: enItem?.customer,
        location: localizedString(
          enItem?.location,
          thItem?.location,
          arItem?.location
        ),
        // Images need to be uploaded separately
        order: count + 1,
      };

      try {
        await client.createOrReplace(doc);
        console.log(`  ✓ Project: ${project.id}`);
        count++;
      } catch (error) {
        console.error(`  ✗ Error migrating project ${project.id}:`, error);
      }
    }
  }

  console.log(`  Total projects migrated: ${count}`);
}

async function migrateTestimonials() {
  console.log('\n💬 Migrating Testimonials...');
  const enItems = enTranslations.testimonials?.items || [];
  const thItems = thTranslations.testimonials?.items || [];
  const arItems = arTranslations.testimonials?.items || [];

  let count = 0;

  for (let i = 0; i < enItems.length; i++) {
    const enItem = enItems[i];
    const thItem = thItems[i] || {};
    const arItem = arItems[i] || {};

    const doc = {
      _id: `testimonial-${i + 1}`,
      _type: 'testimonial',
      name: enItem.name,
      role: enItem.role,
      quote: localizedString(enItem.quote, thItem.quote, arItem.quote),
      rating: enItem.rating || 5,
      order: i + 1,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ Testimonial: ${enItem.name}`);
      count++;
    } catch (error) {
      console.error(`  ✗ Error migrating testimonial ${enItem.name}:`, error);
    }
  }

  console.log(`  Total testimonials migrated: ${count}`);
}

async function migrateProcessSteps() {
  console.log('\n📋 Migrating Process Steps...');
  const enSteps = enTranslations.processPage?.steps || {};
  const thSteps = thTranslations.processPage?.steps || {};
  const arSteps = arTranslations.processPage?.steps || {};

  let count = 0;

  for (const stepNum of Object.keys(enSteps)) {
    const enStep = enSteps[stepNum];
    const thStep = thSteps[stepNum] || {};
    const arStep = arSteps[stepNum] || {};

    // Convert bullet points to localized array
    const bulletPoints = (enStep.bulletPoints || []).map(
      (enBullet: string, idx: number) =>
        localizedString(
          enBullet,
          thStep.bulletPoints?.[idx],
          arStep.bulletPoints?.[idx]
        )
    );

    const doc = {
      _id: `processStep-${stepNum}`,
      _type: 'processStep',
      stepNumber: parseInt(stepNum),
      title: localizedString(enStep.title, thStep.title, arStep.title),
      titleShort: localizedString(
        enStep.titleShort,
        thStep.titleShort,
        arStep.titleShort
      ),
      subtitle: localizedString(
        enStep.subtitle,
        thStep.subtitle,
        arStep.subtitle
      ),
      description: localizedString(
        enStep.description,
        thStep.description,
        arStep.description
      ),
      bulletPoints,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ Process Step: ${stepNum}`);
      count++;
    } catch (error) {
      console.error(`  ✗ Error migrating process step ${stepNum}:`, error);
    }
  }

  console.log(`  Total process steps migrated: ${count}`);
}

async function migrate3DModels() {
  console.log('\n🎨 Migrating 3D Models...');
  const enModels = enTranslations.showcase?.models || {};
  const thModels = thTranslations.showcase?.models || {};
  const arModels = arTranslations.showcase?.models || {};

  let count = 0;

  for (const modelId of Object.keys(enModels)) {
    const enModel = enModels[modelId];
    const thModel = thModels[modelId] || {};
    const arModel = arModels[modelId] || {};

    const doc = {
      _id: `model3d-${modelId}`,
      _type: 'model3d',
      name: localizedString(enModel.name, thModel.name, arModel.name),
      description: localizedString(
        enModel.description,
        thModel.description,
        arModel.description
      ),
      // Note: Model files need to be uploaded separately via Sanity's asset pipeline
      order: parseInt(modelId),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ 3D Model: ${enModel.name}`);
      count++;
    } catch (error) {
      console.error(`  ✗ Error migrating 3D model ${modelId}:`, error);
    }
  }

  console.log(`  Total 3D models migrated: ${count}`);
}

async function migratePricingConfig() {
  console.log('\n💰 Migrating Pricing Configuration...');

  const enPrice = enTranslations.priceEstimation || {};
  const thPrice = thTranslations.priceEstimation || {};
  const arPrice = arTranslations.priceEstimation || {};

  const doc = {
    _id: 'pricingConfig',
    _type: 'pricingConfig',
    title: localizedString(enPrice.title, thPrice.title, arPrice.title),
    subtitle: localizedString(
      enPrice.subtitle,
      thPrice.subtitle,
      arPrice.subtitle
    ),
    sculptureTypes: [
      {
        id: 'bust',
        label: localizedString(
          enPrice.bust?.tab,
          thPrice.bust?.tab,
          arPrice.bust?.tab
        ),
      },
      {
        id: 'relief',
        label: localizedString(
          enPrice.relief?.tab,
          thPrice.relief?.tab,
          arPrice.relief?.tab
        ),
      },
    ],
    stoneGrades: [
      {
        id: 'aPlusPlus',
        label: localizedString(
          enPrice.steps?.stoneCategory?.grades?.aPlusPlus?.label,
          thPrice.steps?.stoneCategory?.grades?.aPlusPlus?.label,
          arPrice.steps?.stoneCategory?.grades?.aPlusPlus?.label
        ),
        description: localizedString(
          enPrice.steps?.stoneCategory?.grades?.aPlusPlus?.description,
          thPrice.steps?.stoneCategory?.grades?.aPlusPlus?.description,
          arPrice.steps?.stoneCategory?.grades?.aPlusPlus?.description
        ),
        pricePerMm3: 0.00015,
      },
      {
        id: 'aPlus',
        label: localizedString(
          enPrice.steps?.stoneCategory?.grades?.aPlus?.label,
          thPrice.steps?.stoneCategory?.grades?.aPlus?.label,
          arPrice.steps?.stoneCategory?.grades?.aPlus?.label
        ),
        description: localizedString(
          enPrice.steps?.stoneCategory?.grades?.aPlus?.description,
          thPrice.steps?.stoneCategory?.grades?.aPlus?.description,
          arPrice.steps?.stoneCategory?.grades?.aPlus?.description
        ),
        pricePerMm3: 0.00012,
      },
      {
        id: 'a',
        label: localizedString(
          enPrice.steps?.stoneCategory?.grades?.a?.label,
          thPrice.steps?.stoneCategory?.grades?.a?.label,
          arPrice.steps?.stoneCategory?.grades?.a?.label
        ),
        description: localizedString(
          enPrice.steps?.stoneCategory?.grades?.a?.description,
          thPrice.steps?.stoneCategory?.grades?.a?.description,
          arPrice.steps?.stoneCategory?.grades?.a?.description
        ),
        pricePerMm3: 0.0001,
      },
    ],
    detailLevels: [
      {
        id: 'minimal',
        label: localizedString(
          enPrice.steps?.detailLevel?.levels?.minimal?.label,
          thPrice.steps?.detailLevel?.levels?.minimal?.label,
          arPrice.steps?.detailLevel?.levels?.minimal?.label
        ),
        description: localizedString(
          enPrice.steps?.detailLevel?.levels?.minimal?.description,
          thPrice.steps?.detailLevel?.levels?.minimal?.description,
          arPrice.steps?.detailLevel?.levels?.minimal?.description
        ),
        additionalCost: 0,
      },
      {
        id: 'refine',
        label: localizedString(
          enPrice.steps?.detailLevel?.levels?.refine?.label,
          thPrice.steps?.detailLevel?.levels?.refine?.label,
          arPrice.steps?.detailLevel?.levels?.refine?.label
        ),
        description: localizedString(
          enPrice.steps?.detailLevel?.levels?.refine?.description,
          thPrice.steps?.detailLevel?.levels?.refine?.description,
          arPrice.steps?.detailLevel?.levels?.refine?.description
        ),
        additionalCost: 500,
      },
      {
        id: 'realistic',
        label: localizedString(
          enPrice.steps?.detailLevel?.levels?.realistic?.label,
          thPrice.steps?.detailLevel?.levels?.realistic?.label,
          arPrice.steps?.detailLevel?.levels?.realistic?.label
        ),
        description: localizedString(
          enPrice.steps?.detailLevel?.levels?.realistic?.description,
          thPrice.steps?.detailLevel?.levels?.realistic?.description,
          arPrice.steps?.detailLevel?.levels?.realistic?.description
        ),
        additionalCost: 1200,
      },
    ],
    maxDimension: 3000,
    disclaimer: localizedString(
      enPrice.priceDisclaimer,
      thPrice.priceDisclaimer,
      arPrice.priceDisclaimer
    ),
    ctaButton: localizedString(
      enPrice.getCustomQuote,
      thPrice.getCustomQuote,
      arPrice.getCustomQuote
    ),
  };

  try {
    await client.createOrReplace(doc);
    console.log('  ✓ Pricing Configuration migrated');
  } catch (error) {
    console.error('  ✗ Error migrating pricing config:', error);
  }
}

async function migrateSiteSettings() {
  console.log('\n⚙️ Migrating Site Settings...');

  const enNav = enTranslations.nav || {};
  const thNav = thTranslations.nav || {};
  const arNav = arTranslations.nav || {};

  const enFooter = enTranslations.footer || {};
  const thFooter = thTranslations.footer || {};
  const arFooter = arTranslations.footer || {};

  const enMeta = enTranslations.meta || {};
  const thMeta = thTranslations.meta || {};
  const arMeta = arTranslations.meta || {};

  const enMission = enTranslations.mission || {};
  const thMission = thTranslations.mission || {};
  const arMission = arTranslations.mission || {};

  const doc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'BMG Bangkok Modern Granite',
    siteUrl: 'https://bmg-granite.com',
    defaultSeo: {
      metaTitle: localizedString(enMeta.title, thMeta.title, arMeta.title),
      metaDescription: localizedString(
        enMeta.description,
        thMeta.description,
        arMeta.description
      ),
    },
    missionTitle: localizedString(
      enMission.title,
      thMission.title,
      arMission.title
    ),
    missionDescription: localizedString(
      enMission.description,
      thMission.description,
      arMission.description
    ),
    navigation: [
      {
        key: 'home',
        label: localizedString(enNav.home, thNav.home, arNav.home),
        href: '/',
      },
      {
        key: 'materials',
        label: localizedString(enNav.materials, thNav.materials, arNav.materials),
        href: '/materials',
      },
      {
        key: 'projects',
        label: localizedString(enNav.projects, thNav.projects, arNav.projects),
        href: '/projects',
      },
      {
        key: 'process',
        label: localizedString(enNav.process, thNav.process, arNav.process),
        href: '/process',
      },
      {
        key: 'contact',
        label: localizedString(enNav.contact, thNav.contact, arNav.contact),
        href: '/contacts',
      },
    ],
    footerLinks: [
      {
        label: localizedString(
          enFooter.privacyPolicy,
          thFooter.privacyPolicy,
          arFooter.privacyPolicy
        ),
        href: '/privacy-policy',
      },
      {
        label: localizedString(
          enFooter.termsConditions,
          thFooter.termsConditions,
          arFooter.termsConditions
        ),
        href: '/terms',
      },
    ],
    copyright: localizedString(
      `${enFooter.copyright} © ${new Date().getFullYear()} ${enFooter.companyName}. ${enFooter.allRightsReserved}`,
      `${thFooter.copyright} © ${new Date().getFullYear()} ${thFooter.companyName}. ${thFooter.allRightsReserved}`,
      `${arFooter.copyright} © ${new Date().getFullYear()} ${arFooter.companyName}. ${arFooter.allRightsReserved}`
    ),
  };

  try {
    await client.createOrReplace(doc);
    console.log('  ✓ Site Settings migrated');
  } catch (error) {
    console.error('  ✗ Error migrating site settings:', error);
  }
}

async function main() {
  console.log('🚀 Starting BMG Sanity Migration');
  console.log(`   Project: ${projectId}`);
  console.log(`   Dataset: ${dataset}`);
  console.log('');

  try {
    await migrateMaterials();
    await migrateProjects();
    await migrateTestimonials();
    await migrateProcessSteps();
    await migrate3DModels();
    await migratePricingConfig();
    await migrateSiteSettings();

    console.log('\n✅ Migration complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Visit Sanity Studio to upload images for materials and projects');
    console.log('   2. Upload 3D model files (.glb) for the showcase models');
    console.log('   3. Verify all content in Sanity Studio at /studio');
    console.log('   4. Update Astro components to fetch from Sanity');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
