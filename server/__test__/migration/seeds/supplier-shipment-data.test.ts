import { generateBaseShipment, matchSupplier, Shipment } from '../../../migrations/seeds/supplier-shipment-data'
import Supplier from '../../../models/supplier'

const testData = [
  {
    name: 'fake name',
    buyerName: 'fake buyer',
    shipmentDate: '2018/10/20',
    hsCode: '618050',
    hsDescription: 'description',
    value: '5000',
  },
]

const supplierData = [
  {
    name: 'fake name',
    _id: 'fake supplier id',
  },
]

const readJsonFileSpy = jest.spyOn(require('../../../migrations/seeds/utils/utils'), 'readJsonFile')
const shipmentFindSpy = jest.spyOn(Supplier, 'find').mockReturnValueOnce(supplierData as any)

describe('test insert shipment', () => {
  let baseShipment: Shipment[]
  beforeEach(() => {
    readJsonFileSpy.mockImplementation(() => testData)
    baseShipment = generateBaseShipment()
  })

  it('should get one shipment data', () => {
    expect(baseShipment).toHaveLength(1)
  })

  it('should match one supplier data', async () => {
    await matchSupplier(baseShipment)
    expect(shipmentFindSpy).toHaveBeenCalledTimes(1)
    expect(baseShipment[0].sellerId).toEqual('fake supplier id')
  })
})
