import { map, isEmpty } from 'lodash'

import {
  getRandomInt,
} from './utils/utils'
import { EntityType } from '../../../shared/enum/entityType'
import { SupplierCategory } from "../../../shared/enum/category";
import { customerId, Supplier } from "./customer-supplier-data";

export interface UsedFacilityIndexMap{
  facilityIndex: number
  numberOfUse: number
}
interface Relation{
  source: string
  target: string
}
interface Customer {
  _id: string
  name: string
  logoUri: string
  relations: Relation[]
}

export const insertToCustomer = (suppliers: Supplier[]) => {
  const customer: Customer = {
    _id: customerId,
    name: 'Sustainable Stitch Group',
    logoUri: '/companies/SSG.svg',
    relations: []
  }

  const {tier1GroupIds, facilities, standAloneFacilities} = getTier1GroupIdsAndFacilities(suppliers);
  const {tier1GroupToCustomerRelations, tier2GroupToTier1GroupRelations, facilityToGroupRelations} = createRelations(suppliers, tier1GroupIds);
  const {facilitiesRelations, facilitiesGroupsRelations} =  createFacilitiesAndGroupsRelations(facilities)
  const standaloneFacilitiesToCustomerRelations = createStandaloneFacilitiesRelations(facilities, standAloneFacilities)

  customer.relations.push(...tier1GroupToCustomerRelations, ...tier2GroupToTier1GroupRelations, ...facilityToGroupRelations,
    ...facilitiesRelations, ...facilitiesGroupsRelations, ...standaloneFacilitiesToCustomerRelations
  )

  return customer
}

export const getTier1GroupIdsAndFacilities = (suppliers: Supplier[]) => {
  const tier1GroupIds: string[] = []
  const facilities: Supplier[] = []
  const standAloneFacilities: Supplier[] = []
  suppliers.forEach(supplier => {
    if (supplier.entity === EntityType.Group && supplier.category === SupplierCategory.Manufacturer) {
      tier1GroupIds.push(supplier._id);
    }

    if (supplier.entity === EntityType.Facility) {
      if (!isEmpty(supplier.groupId)) {
        facilities.push(supplier)
      } else {
        standAloneFacilities.push(supplier)
      }
    }
  });

  return { tier1GroupIds, facilities, standAloneFacilities }
}

export const createRelations = (suppliers: Supplier[], tier1GroupIds: string[]) => {
  const tier1GroupToCustomerRelations: Relation[] = [];
  const tier2GroupToTier1GroupRelations: Relation[] = [];
  const facilityToGroupRelations: Relation[] = [];

  suppliers.forEach(supplier => {
    createTier1GroupToCustomerRelations(supplier);
    createTier2GroupToTier1GroupRelations(supplier);
    createFacilityToGroupRelations(supplier);
  });

  function createTier1GroupToCustomerRelations(supplier: Supplier) {
    if (supplier.entity === EntityType.Group && supplier.category === SupplierCategory.Manufacturer) {
      tier1GroupToCustomerRelations.push({ source: supplier._id, target: customerId });
    }
  }

  function createTier2GroupToTier1GroupRelations(supplier: Supplier) {
    if (supplier.entity === EntityType.Group && supplier.category !== SupplierCategory.Manufacturer) {
      tier2GroupToTier1GroupRelations.push({
        source: supplier._id,
        target: tier1GroupIds[getRandomInt(0, tier1GroupIds.length - 1)]
      });
    }
  }

  function createFacilityToGroupRelations(supplier: Supplier) {
    if (supplier.entity === EntityType.Facility && !isEmpty(supplier.groupId)) {
      facilityToGroupRelations.push({ source: supplier._id, target: supplier.groupId! });
    }
  }

  return {tier1GroupToCustomerRelations, tier2GroupToTier1GroupRelations, facilityToGroupRelations}
}

export const createFacilitiesAndGroupsRelations = (facilities: Supplier[]) => {
  const facilitiesRelations = []
  const facilitiesGroupsRelations = []

  const usedFacilityMaps : UsedFacilityIndexMap[] = []
  const partOfTheFacilitiesNumber = Math.floor(facilities.length / 12)
  for (let i = 0; i < partOfTheFacilitiesNumber; i++) {
    let sourceFacilityIndex
    let targetFacilityIndex
    do {
      sourceFacilityIndex = getFacilityAcceptableIndexes(facilities.length, usedFacilityMaps)
      targetFacilityIndex = getFacilityAcceptableIndexes(facilities.length, usedFacilityMaps)
    } while (sourceFacilityIndex === targetFacilityIndex)

    facilitiesGroupsRelations.push({ source: facilities[sourceFacilityIndex].groupId!, target: facilities[targetFacilityIndex].groupId! })
    facilitiesRelations.push({ source: facilities[sourceFacilityIndex]._id, target: facilities[targetFacilityIndex]._id })
  }

  return {facilitiesRelations, facilitiesGroupsRelations}
}

export const getFacilityAcceptableIndexes = (facilitiesNumber: number, usedFacilityMaps: UsedFacilityIndexMap[]) : number =>  {
  const usedFacilityIndexes = map(usedFacilityMaps, usedFacilityMap => usedFacilityMap.facilityIndex)
  const facilityIndex = getRandomInt(0, facilitiesNumber - 1)
  const maxUsedNumber = 2

  const index = usedFacilityIndexes.indexOf(facilityIndex);
  if (index < 0) {
    usedFacilityMaps.push({
      facilityIndex,
      numberOfUse: 1
    })
  } else {
    if (usedFacilityMaps[index].numberOfUse === maxUsedNumber){
      return getFacilityAcceptableIndexes(facilitiesNumber, usedFacilityMaps)
    }
    usedFacilityMaps[index].numberOfUse = maxUsedNumber ;
  }

  return facilityIndex
}

const createStandaloneFacilitiesRelations = (facilities: Supplier[], standAloneFacilities: Supplier[]) => {
  const standaloneFacilitiesToCustomerRelations: { source: string; target: string; }[] = []
  const partOfTheStandALoneFacilitiesNumber = Math.floor(standAloneFacilities.length / 3)
  const usedFacilityMaps : UsedFacilityIndexMap[] = []

  const pushToFacilityRelation = (facilityIndex: number) => {
    const targetFacilityIndex = getFacilityAcceptableIndexes(facilities.length, usedFacilityMaps)
    standaloneFacilitiesToCustomerRelations.push({
      source: standAloneFacilities[facilityIndex]._id,
      target: facilities[targetFacilityIndex]._id
    })
  }
  const pushToCustomerRelation = (facilityIndex: number) => {
    standaloneFacilitiesToCustomerRelations.push({
      source: standAloneFacilities[facilityIndex]._id,
      target: customerId
    })
  }

  for (let i = 0; i < standAloneFacilities.length; i++)  {
    if (i < partOfTheStandALoneFacilitiesNumber) {
      pushToFacilityRelation(i);
    } else if ((i < 2 * partOfTheStandALoneFacilitiesNumber)) {
      pushToCustomerRelation(i);
    } else {
      pushToFacilityRelation(i);
      pushToCustomerRelation(i);
    }
  }

  return standaloneFacilitiesToCustomerRelations
}
