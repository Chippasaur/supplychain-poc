import { render } from '@testing-library/react'
import React from 'react'

import CompanyInfo from '../../../../pages/partners/[id]/company-info'
import { SupplierPreView } from '../../../utils/hooks'

const useCompanyDataSpy = jest.spyOn(require('../../../utils/hooks'), 'useCompanyData')
jest.mock('../../../components/partners/menu', () => () => 'Menu')
jest.mock('../../../components/partners/layout/header', () => () => 'Header')

const expectItems = [
  { k: 'Business type', v: 'dummy type' },
  { k: 'Entity type', v: 'dummy type' },
  { k: 'Address', v: 'address' },
  { k: 'Postal code', v: 'postalCode' },
  { k: 'State/Province', v: 'state' },
  { k: 'City', v: 'city' },
  { k: 'Country/Region', v: 'country' },
  { k: 'Telephone', v: 'Telephone' },
  { k: 'Email address', v: 'officialEmail' },
  { k: 'Website URL', v: 'websiteUrl' },
  { k: 'Registered Name', v: `dummy` },
  { k: 'Registered Number', v: `321` },
  { k: 'Registered Type', v: `dummy type` },
  { k: 'Company status', v: ' View more Active' },
  { k: 'Sanctions check', v: ` Passed` },
  { k: 'Ultmate Owner(s)', v: `ultimateOwners` },
  { k: 'Beneficial Owner(s)', v: `` },
  { k: 'Revenue (USD)', v: '99,999,999' },
  { k: 'Number of employees', v: `10,101` },
]
describe('CompanyInfo', () => {
  describe('should has items', () => {
    useCompanyDataSpy.mockImplementationOnce(() => ({
      ...SupplierPreView,
      business: {
        businessType: 'dummy type',
        entityType: 'dummy type',
      },
      location: {
        address: 'address',
        postalCode: 'postalCode',
        state: 'state',
        city: 'city',
        region: 'country',
      },
      officialContact: {
        telephone: 'Telephone',
        officialEmail: 'officialEmail',
        websiteUrl: 'websiteUrl',
      },
      overallStatus: {
        companyStatus: 0,
        sanction: 0,
        ultimateOwners: 'ultimateOwners',
        beneficialOwners: '',
        revenue: 99999999,
        employeeNum: 10101,
      },
      registration: {
        registrationName: 'dummy',
        registrationNumber: '321',
        registrationType: 'dummy type',
      },
    }))
    const { container } = render(<CompanyInfo />)
    const itemTitles = container.querySelectorAll('p.itemTitle') || []
    for (let i = 0; i < itemTitles.length; i++) {
      const item = itemTitles[i]
      const expectItem = expectItems[i]
      it(`should has titles of ${expectItem.k}`, () => {
        expect(item?.parentElement).toHaveTextContent(`${expectItem.k}${expectItem.v}`)
      })
    }
  })
})
