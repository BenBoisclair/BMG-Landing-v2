/**
 * Fix Script: Add missing _key properties to all Sanity array items
 *
 * Sanity requires array items to have unique _key properties.
 * This script patches existing documents to add the missing keys.
 *
 * Fixes:
 * - processStep.bulletPoints
 * - pricingConfig.sculptureTypes, stoneGrades, detailLevels
 * - siteSettings.navigation, footerLinks
 *
 * Usage: npx tsx scripts/fix-missing-keys.ts
 */

import 'dotenv/config';
import { createClient } from '@sanity/client';
import crypto from 'crypto';

// Generate a random key
function generateKey(): string {
  return crypto.randomBytes(6).toString('hex');
}

// Add _key to array items if missing
function addKeysToArray(arr: any[]): any[] {
  if (!arr || !Array.isArray(arr)) return arr;
  return arr.map((item) => ({
    ...item,
    _key: item._key || generateKey(),
  }));
}

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing required environment variables:');
  console.error('  PUBLIC_SANITY_PROJECT_ID');
  console.error('  SANITY_API_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function fixProcessSteps() {
  console.log('📋 Fixing Process Steps...');

  const processSteps = await client.fetch(`*[_type == "processStep"]`);

  for (const step of processSteps) {
    if (!step.bulletPoints || step.bulletPoints.length === 0) continue;

    const needsFix = step.bulletPoints.some((bp: any) => !bp._key);
    if (!needsFix) {
      console.log(`  Step ${step.stepNumber}: OK`);
      continue;
    }

    const fixedBulletPoints = addKeysToArray(step.bulletPoints);

    await client.patch(step._id).set({ bulletPoints: fixedBulletPoints }).commit();
    console.log(`  ✓ Step ${step.stepNumber}: Fixed ${fixedBulletPoints.length} bullet points`);
  }
}

async function fixPricingConfig() {
  console.log('\n💰 Fixing Pricing Configuration...');

  const config = await client.fetch(`*[_type == "pricingConfig"][0]`);
  if (!config) {
    console.log('  No pricing config found');
    return;
  }

  const updates: Record<string, any> = {};

  // Fix sculptureTypes
  if (config.sculptureTypes?.some((item: any) => !item._key)) {
    updates.sculptureTypes = addKeysToArray(config.sculptureTypes);
    console.log(`  ✓ Fixed sculptureTypes (${updates.sculptureTypes.length} items)`);
  } else {
    console.log('  sculptureTypes: OK');
  }

  // Fix stoneGrades
  if (config.stoneGrades?.some((item: any) => !item._key)) {
    updates.stoneGrades = addKeysToArray(config.stoneGrades);
    console.log(`  ✓ Fixed stoneGrades (${updates.stoneGrades.length} items)`);
  } else {
    console.log('  stoneGrades: OK');
  }

  // Fix detailLevels
  if (config.detailLevels?.some((item: any) => !item._key)) {
    updates.detailLevels = addKeysToArray(config.detailLevels);
    console.log(`  ✓ Fixed detailLevels (${updates.detailLevels.length} items)`);
  } else {
    console.log('  detailLevels: OK');
  }

  if (Object.keys(updates).length > 0) {
    await client.patch(config._id).set(updates).commit();
  }
}

async function fixSiteSettings() {
  console.log('\n⚙️ Fixing Site Settings...');

  const settings = await client.fetch(`*[_type == "siteSettings"][0]`);
  if (!settings) {
    console.log('  No site settings found');
    return;
  }

  const updates: Record<string, any> = {};

  // Fix navigation
  if (settings.navigation?.some((item: any) => !item._key)) {
    updates.navigation = addKeysToArray(settings.navigation);
    console.log(`  ✓ Fixed navigation (${updates.navigation.length} items)`);
  } else {
    console.log('  navigation: OK');
  }

  // Fix footerLinks
  if (settings.footerLinks?.some((item: any) => !item._key)) {
    updates.footerLinks = addKeysToArray(settings.footerLinks);
    console.log(`  ✓ Fixed footerLinks (${updates.footerLinks.length} items)`);
  } else {
    console.log('  footerLinks: OK');
  }

  if (Object.keys(updates).length > 0) {
    await client.patch(settings._id).set(updates).commit();
  }
}

async function main() {
  console.log('🔧 Fixing missing _key properties in Sanity documents\n');
  console.log(`   Project: ${projectId}`);
  console.log(`   Dataset: ${dataset}\n`);

  try {
    await fixProcessSteps();
    await fixPricingConfig();
    await fixSiteSettings();
    console.log('\n✅ All fixes complete!');
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

main();
