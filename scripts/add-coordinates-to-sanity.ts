import { createClient } from '@sanity/client';
import 'dotenv/config';

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

interface CoordinateData {
  lat: number;
  lng: number;
  region: string;
  country: string;
  city: string;
}

const coordinateData: Record<string, CoordinateData> = {
  'religious-1': { lat: 41.9001, lng: -71.0898, region: 'americas', country: 'United States', city: 'Taunton, Massachusetts' },
  'religious-2': { lat: 14.9799, lng: 102.0978, region: 'asia', country: 'Thailand', city: 'Nakhon Ratchasima' },
  'religious-3': { lat: 13.7563, lng: 100.5018, region: 'asia', country: 'Thailand', city: 'Bangkok' },
  'religious-4': { lat: 13.7563, lng: 100.5018, region: 'asia', country: 'Thailand', city: 'Bangkok' },
  'religious-5': { lat: 17.4138, lng: 102.7872, region: 'asia', country: 'Thailand', city: 'Udon Thani' },
  'religious-6': { lat: 13.7563, lng: 100.5018, region: 'asia', country: 'Thailand', city: 'Bangkok' },
  'religious-7': { lat: 45.5152, lng: -122.6784, region: 'americas', country: 'United States', city: 'Oregon' },
  'religious-8': { lat: 13.7563, lng: 100.5018, region: 'asia', country: 'Thailand', city: 'Bangkok' },
  'religious-9': { lat: 13.7563, lng: 100.5018, region: 'asia', country: 'Thailand', city: 'Bangkok' },
  'legacy-1': { lat: 13.7563, lng: 100.5018, region: 'asia', country: 'Thailand', city: 'Bangkok' },
  'legacy-2': { lat: 13.7563, lng: 100.5018, region: 'asia', country: 'Thailand', city: 'Bangkok' },
  'legacy-3': { lat: 13.7563, lng: 100.5018, region: 'asia', country: 'Thailand', city: 'Bangkok' },
  'architectural-1': { lat: 13.7563, lng: 100.5018, region: 'asia', country: 'Thailand', city: 'Bangkok' },
  'architectural-2': { lat: 13.6820, lng: 101.0779, region: 'asia', country: 'Thailand', city: 'Chachoengsao' },
  'architectural-3': { lat: 13.7437, lng: 100.4888, region: 'asia', country: 'Thailand', city: 'Bangkok' },
  'architectural-4': { lat: 14.9799, lng: 102.0978, region: 'asia', country: 'Thailand', city: 'Nakhon Ratchasima' },
};

async function migrate() {
  console.log('Starting coordinate migration...\n');

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('ERROR: SANITY_API_WRITE_TOKEN environment variable is not set');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (const [internalId, data] of Object.entries(coordinateData)) {
    try {
      // Find project by internalId
      const query = `*[_type == "project" && internalId.current == $internalId][0]`;
      const project = await client.fetch(query, { internalId });

      if (!project) {
        console.log(`⚠️  Project not found: ${internalId}`);
        failCount++;
        continue;
      }

      // Patch the project with coordinate data
      await client
        .patch(project._id)
        .set({
          coordinates: {
            lat: data.lat,
            lng: data.lng,
          },
          region: data.region,
          country: data.country,
          city: data.city,
        })
        .commit();

      console.log(`✅ Updated: ${internalId} (${data.city}, ${data.country})`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to update ${internalId}:`, error);
      failCount++;
    }
  }

  console.log(`\n--- Migration Complete ---`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

migrate();
