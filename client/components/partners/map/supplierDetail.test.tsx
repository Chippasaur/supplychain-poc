import { render, screen } from '@testing-library/react'

import SupplierDetail from './supplierDetail'

describe('SupplierDetail', () => {
  it('should be able to show necessary information', () => {
    const props = {
      id: 'id',
      tier: 1,
      name: 'NingBo Bell Garment Industrial CO. LTD',
      category: 6,
      location: {
        address: 'NO 422, JiangHu Road',
        postalCode: undefined,
        state: undefined,
        city: undefined,
        region: undefined,
      },
      riskLevel: 6,
      financialHealth: 4,
    }

    render(<SupplierDetail {...props} />)

    expect(screen.getByText('Tier 1')).toBeInTheDocument()
    expect(screen.getByText('Unknown')).toBeInTheDocument()
    expect(screen.getByText('Unavailable')).toBeInTheDocument()
    expect(screen.getByText('Data Unavailable')).toBeInTheDocument()
    expect(screen.getByText('NO 422, JiangHu Road')).toBeInTheDocument()
    expect(screen.getByText('NingBo Bell Garment Industrial CO. LTD')).toBeInTheDocument()
  })

  it('should render nothing if critical data field is absent', () => {
    const props = {
      id: 'id',
      tier: 1,
      category: 6,
      location: {
        address: 'NO 422, JiangHu Road',
        postalCode: undefined,
        state: undefined,
        city: undefined,
        region: undefined,
      },
      riskLevel: 6,
      financialHealth: 4,
    }

    render(<SupplierDetail {...props} />)

    expect(screen.queryByText('Tier 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Unknown')).not.toBeInTheDocument()
    expect(screen.queryByText('Unavailable')).not.toBeInTheDocument()
    expect(screen.queryByText('Data Unavailable')).not.toBeInTheDocument()
    expect(screen.queryByText('NO 422, JiangHu Road')).not.toBeInTheDocument()
  })
})
