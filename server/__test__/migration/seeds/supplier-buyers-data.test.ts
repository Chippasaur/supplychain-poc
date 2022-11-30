import { generateTradeDocs, parseBuyers, tradeDoc } from '../../../migrations/seeds/supplier-buyers-data'

const testData = [
  {
    name: 'A & K DESIGNS, INC.',
    contributors:
      '[{"id": 833, "name": "ETAM GROUP (Maison123 (Jan 2021 Active Supplier List))", "is_verified": false}, {"id": 1107, "name": "Maison 123 (Maison 123 - Tier 1 Supplier List)", "is_verified": false}]',
  },
]

describe('supplier buyes data test', () => {
  let tradeDocs: tradeDoc[]
  beforeEach(() => {
    tradeDocs = generateTradeDocs(testData)
  })

  it('should parse contributors correctly', () => {
    const res = parseBuyers(testData[0].contributors)
    expect(res).toHaveLength(2)
    expect(res[0]).toEqual('ETAM GROUP (Maison123 (Jan 2021 Active Supplier List))')
    expect(res[1]).toEqual('Maison 123 (Maison 123 - Tier 1 Supplier List)')
  })

  it('should get correct tradeDocs', () => {
    expect(tradeDocs).toHaveLength(1)
    expect(tradeDocs[0].seller).toEqual('A & K DESIGNS, INC.')
    expect(tradeDocs[0].buyers).toEqual([
      'ETAM GROUP (Maison123 (Jan 2021 Active Supplier List))',
      'Maison 123 (Maison 123 - Tier 1 Supplier List)',
    ])
  })
})
