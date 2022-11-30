/**
 * In the Mapbox Style Specification, the value for any layout property, paint property, or filter may be specified as an expression. Expressions define how one or more feature property value and/or the current zoom level are combined using logical, mathematical, string, or color operations to produce the appropriate style property value or filter decision.
 *
 * A property expression is any expression defined using a reference to feature property data. Property expressions allow the appearance of a feature to change with its properties. They can be used to visually differentiate types of features within the same layer or create data visualizations.
 *
 * here is the example https://docs.mapbox.com/help/tutorials/mapbox-gl-js-expressions/
 *
 * here is the document https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/
 */

import { DAndBLevel } from '../../../shared/enum/dAndBLevel'
import { SupplierCategory } from '../../../shared/enum/category'
import { EntityType } from '../../../shared/enum/entityType'

const supplierCategoryIsManufacturer = ['==', ['get', 'category'], SupplierCategory.Manufacturer]
const supplierCategoryIsFabricSupplier = ['==', ['get', 'category'], SupplierCategory.FabricSupplier]
const supplierCategoryIsRawMaterialSupplier = ['==', ['get', 'category'], SupplierCategory.RawMaterialSupplier]
const supplierCategoryIsTrimsAndAccessoriesSupplier = [
  '==',
  ['get', 'category'],
  SupplierCategory.TrimsAndAccessoriesSupplier,
]
const supplierCategoryIsPrintAndWashOrDyeHouse = ['==', ['get', 'category'], SupplierCategory.PrintAndWashOrDyeHouse]
const supplierCategoryIsOther = ['==', ['get', 'category'], SupplierCategory.Other]

const supplierWithHighRiskCondition = [
  'all',
  ['>=', ['get', 'riskLevel'], DAndBLevel.High],
  ['<=', ['get', 'riskLevel'], DAndBLevel.Severe],
]

export const mapboxExpressions = {
  suppliers: {
    isCluster: ['has', 'cluster'],
    isNotCluster: ['!', ['has', 'cluster']],
    supplierWithHighRiskInCluster: ['+', ['case', supplierWithHighRiskCondition, 1, 0]],
    supplierIconImage: [
      'case',
      supplierCategoryIsManufacturer,
      'manufacturer',
      supplierCategoryIsFabricSupplier,
      'fabric-supplier',
      supplierCategoryIsRawMaterialSupplier,
      'raw-material-supplier',
      supplierCategoryIsTrimsAndAccessoriesSupplier,
      'trims-and-accessories-supplier',
      supplierCategoryIsPrintAndWashOrDyeHouse,
      'print-wash-or-dye-house',
      supplierCategoryIsOther,
      'other',
      'unknown',
    ],
    clusterColor: ['case', ['>=', ['get', 'highRiskSupplierNumber'], 1], '#EB5F2C', '#4BBCCE'],
    riskySingleSupplierOrCluster: [
      'any',
      [
        'all',
        ['!', ['has', 'cluster']],
        ['>=', ['get', 'riskLevel'], DAndBLevel.High],
        ['<=', ['get', 'riskLevel'], DAndBLevel.Severe],
      ],
      ['all', ['has', 'cluster'], ['>=', ['get', 'highRiskSupplierNumber'], 1]],
    ],
    riskIconOffSet: ['case', ['has', 'cluster'], ['literal', [4, -4]], ['literal', [1, -1]]],
  },

  facilities: {
    isGroup: ['==', ['get', 'entity'], EntityType.Group],
    isFacility: ['==', ['get', 'entity'], EntityType.Facility],
  },
}
