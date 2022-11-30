import { ceil, divide, find, isUndefined, map, sumBy, uniq } from 'lodash'

import { SupplierCategory } from '../../shared/enum/category'
import { SupplierTierLevel } from '../../shared/enum/supplierTierLevel'
import Supplier from '../models/supplier'
import { EntityType } from '../../shared/enum/entityType'

interface SupplierGroupType {
  suppliers: []
  tier: number
}

const extractSupplierIds = (relations: Array<{ source: string; target: string }>) => {
  return uniq(map(relations, 'source'))
}

const getSupplierTier = (category: SupplierCategory) => {
  return category === SupplierCategory.Manufacturer ? SupplierTierLevel.TierOne : SupplierTierLevel.TierTwo
}

const getAverageByFieldAndPrecision = (data: any[], field: string, precision: number) => {
  return ceil(divide(sumBy(data, field), data.length), precision)
}

const getFacilityIds = async (supplierId: string) => {
  const supplier = await Supplier.findById(supplierId)
  if (!supplier) {
    return []
  }

  if (supplier.entity === EntityType.Facility) {
    return [supplierId]
  }

  const facilities = await Supplier.find({ groupId: supplierId, entity: EntityType.Facility }, { _id: 1 })
  return map(facilities, facility => facility._id)
}

export { getFacilityIds, getSupplierTier, getAverageByFieldAndPrecision, extractSupplierIds }
