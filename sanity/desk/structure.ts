import type { StructureBuilder } from 'sanity/structure';

// Singleton document IDs
const PRICING_CONFIG_ID = 'pricingConfig';
const SITE_SETTINGS_ID = 'siteSettings';

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Materials Section
      S.listItem()
        .title('Materials')
        .child(
          S.list()
            .title('Materials')
            .items([
              S.listItem()
                .title('Premium (A++) - Jewellery Stone')
                .child(
                  S.documentList()
                    .title('Premium Materials')
                    .filter('_type == "material" && category == "premium"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('Luxury (A+) - Luxury Stone')
                .child(
                  S.documentList()
                    .title('Luxury Materials')
                    .filter('_type == "material" && category == "luxury"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('Classic (A) - Natural Stone')
                .child(
                  S.documentList()
                    .title('Classic Materials')
                    .filter('_type == "material" && category == "classic"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('All Materials')
                .child(
                  S.documentList()
                    .title('All Materials')
                    .filter('_type == "material"')
                    .defaultOrdering([
                      { field: 'category', direction: 'asc' },
                      { field: 'order', direction: 'asc' },
                    ])
                ),
            ])
        ),

      // Projects Section
      S.listItem()
        .title('Projects')
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .title('Religious')
                .child(
                  S.documentList()
                    .title('Religious Projects')
                    .filter('_type == "project" && category == "religious"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('Legacy & Memorial')
                .child(
                  S.documentList()
                    .title('Legacy Projects')
                    .filter('_type == "project" && category == "legacy"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('Architectural')
                .child(
                  S.documentList()
                    .title('Architectural Projects')
                    .filter('_type == "project" && category == "architectural"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('All Projects')
                .child(
                  S.documentList()
                    .title('All Projects')
                    .filter('_type == "project"')
                    .defaultOrdering([
                      { field: 'category', direction: 'asc' },
                      { field: 'order', direction: 'asc' },
                    ])
                ),
            ])
        ),

      // 3D Models
      S.listItem()
        .title('3D Models')
        .child(
          S.documentList()
            .title('3D Models')
            .filter('_type == "model3d"')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // Testimonials
      S.listItem()
        .title('Testimonials')
        .child(
          S.documentList()
            .title('Testimonials')
            .filter('_type == "testimonial"')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // Process Steps
      S.listItem()
        .title('Process Steps')
        .child(
          S.documentList()
            .title('Process Steps')
            .filter('_type == "processStep"')
            .defaultOrdering([{ field: 'stepNumber', direction: 'asc' }])
        ),

      S.divider(),

      // Singletons
      S.listItem()
        .title('Pricing Calculator')
        .child(
          S.document()
            .schemaType('pricingConfig')
            .documentId(PRICING_CONFIG_ID)
        ),

      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId(SITE_SETTINGS_ID)
        ),
    ]);
