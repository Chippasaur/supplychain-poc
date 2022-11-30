import Image from 'next/image'

import { SupplierCategory } from '../../../../shared/enum/category'
import Icon from '../../icon'

export const LEGENDS = {
  [SupplierCategory.Manufacturer]: { name: 'Manufacturer', color: '#066184' },
  [SupplierCategory.FabricSupplier]: { name: 'Fabric supplier', color: '#4BBCCE' },
  [SupplierCategory.RawMaterialSupplier]: { name: 'Raw material supplier', color: '#85c56f' },
  [SupplierCategory.TrimsAndAccessoriesSupplier]: { name: 'Trims & accessories supplier', color: '#ff8400' },
  [SupplierCategory.PrintAndWashOrDyeHouse]: { name: 'Print, wash or dye house', color: '#e96ec3' },
  [SupplierCategory.Other]: { name: 'Other', color: '#9055a8' },
  [SupplierCategory.UnknownEntity]: { name: 'Unknown entity', color: '#909090' },
}

export const MAP_EXTRA_LEGENDS = {
  highRiskOrAbove: { name: 'High risk or above', icon: <Image src="/images/risk.svg" width={14} height={14} /> },
  port: { name: 'Port', icon: <Icon type={'port'} size={14} color={'#2070FF'} /> },
  airport: { name: 'Airport', icon: <Icon type={'airport'} size={14} color={'#EB5F2C'} /> },
}
