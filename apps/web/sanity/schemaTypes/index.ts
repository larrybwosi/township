import { type SchemaTypeDefinition } from 'sanity'

import { propertyType } from './propertyType'
import { townType } from './townType'
import { homeHeroType } from './homeHeroType'
import { homeAboutType } from './homeAboutType'
import { institutionType } from './institutionType'
import { placeType } from './placeType'
import { serviceType } from './serviceType'
import { studentGuideType } from './studentGuideType'
import { eventType } from './eventType'
import { productType } from './productType'
import { siteMetadataType } from './siteMetadataType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    propertyType,
    townType,
    homeHeroType,
    homeAboutType,
    institutionType,
    placeType,
    serviceType,
    studentGuideType,
    eventType,
    productType,
    siteMetadataType,
  ],
}
