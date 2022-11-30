import { DateTime } from 'luxon'

import { generateMockShipment } from '../../../migrations/seeds/supplier-mockShipment-data'
import Supplier from '../../../models/supplier'

const supplierData = [
  {
    name: 'fake name',
    _id: 'fake supplier id',
  },
]

const supplierFindSpy = jest.spyOn(Supplier, 'find').mockReturnValueOnce(supplierData as any)

describe('supplier mock shipment data test', () => {
  it('should generate correct mock shipment data', async () => {
    const res = await generateMockShipment(DateTime.fromISO('2021-02-27T08:00'), DateTime.fromISO('2021-03-05T08:00'))
    expect(supplierFindSpy).toHaveBeenCalledTimes(1)
    expect(res).toHaveLength(7)
  })
})
