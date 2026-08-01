import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Site Content Manager')
    .items([
      // Rental App Section
      S.listItem()
        .title('Rental App')
        .child(
          S.list()
            .title('Rental Content')
            .items([
              S.documentTypeListItem('property').title('Properties'),
              S.documentTypeListItem('town').title('Towns'),
            ])
        ),
      S.divider(),
      // Web App Sections
      S.listItem()
        .title('Web Portal Sections')
        .child(
          S.list()
            .title('Portal Sections')
            .items([
              S.documentTypeListItem('homeHero').title('Home Hero Section'),
              S.documentTypeListItem('homeAbout').title('Home About Section'),
              S.documentTypeListItem('studentGuide').title('Student Starter Guide'),
            ])
        ),
      S.divider(),
      // Web App Directories
      S.listItem()
        .title('Web Portal Directory')
        .child(
          S.list()
            .title('Directory Content')
            .items([
              S.documentTypeListItem('institution').title('Institutions'),
              S.documentTypeListItem('place').title('Places to Explore'),
              S.documentTypeListItem('service').title('City Services'),
              S.documentTypeListItem('event').title('Events'),
            ])
        ),
      S.divider(),
      // All other types
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'property',
            'town',
            'homeHero',
            'homeAbout',
            'studentGuide',
            'institution',
            'place',
            'service',
            'event',
          ].includes(item.getId()!)
      ),
    ])
