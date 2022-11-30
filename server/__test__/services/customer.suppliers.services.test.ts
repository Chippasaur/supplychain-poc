import { getSupplierTier } from '../../../server/services/customer.suppliers.service'
import { SupplierCategory } from '../../../shared/enum/category'
import { SupplierTierLevel } from '../../../shared/enum/supplierTierLevel'

describe('CustomerSuppliersHandlerService', () => {
  const suppliers: any = [
    {
      tier: 1,
      suppliers: [
        { supplierId: '603f43ea84ff3ee7cc1a5bd2' },
        { supplierId: '603f43ea84ff3ee7cc1a5bd3' },
        { supplierId: '603f43ea84ff3ee7cc1a5bd4' },
      ],
    },
    {
      tier: 2,
      suppliers: [
        { supplierId: '603f43ea84ff3ee7cc1a5bd5' },
        { supplierId: '603f43ea84ff3ee7cc1a5bd6' },
        { supplierId: '603f43ea84ff3ee7cc1a5bd7' },
      ],
    },
    {
      tier: 3,
      suppliers: [
        { supplierId: '603f43ea84ff3ee7cc1a5bd8' },
        { supplierId: '603f43ea84ff3ee7cc1a5bd9' },
        { supplierId: '603f43ea84ff3ee7cc1a5bda' },
      ],
    },
  ]

  it('should return tier one when supplier category is Manufacturer', () => {
    const tier = getSupplierTier(SupplierCategory.Manufacturer)

    expect(tier).toBe(SupplierTierLevel.TierOne)
  })

  it('should return tier two when supplier category is not Manufacturer', () => {
    const tier = getSupplierTier(SupplierCategory.FabricSupplier)

    expect(tier).toBe(SupplierTierLevel.TierTwo)
  })
})
