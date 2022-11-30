import columns from './columnDefine'

describe('Column Define', () => {
  it('should define right column', () => {
    const fields = columns.map(column => column.field)

    expect(fields.length).toBe(7)
    expect(fields).toEqual(['companyName', 'location', 'entity', 'tier', 'category', 'riskLevel', 'rating'])
  })

  it('should define companyName column', () => {
    expect(columns[0].headerName).toEqual('Company Name')
    expect(columns[1].headerName).toEqual('Country')
    expect(columns[2].headerName).toEqual('Entity Type')
    expect(columns[3].headerName).toEqual('Tier')
    expect(columns[4].headerName).toEqual('Category')
    expect(columns[5].headerName).toEqual('Business Risk')
    expect(columns[6].headerName).toEqual('Rating')
  })
})
