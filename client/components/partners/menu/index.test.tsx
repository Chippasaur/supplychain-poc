import { render, act } from '@testing-library/react'
import React from 'react'

import Menu from './index'
import supplierInfo from '../../../__test__/mockData/supplierInfo'
import { EntityType } from '../../../../shared/enum/entityType'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const useCompanyDataSpy = jest.spyOn(require('../../../utils/hooks'), 'useCompanyData')

describe('Menu', () => {
  let container: HTMLElementTagNameMap['div'] | null
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/partners/6059a1dd046d511c2fcb45d9',
      query: {
        id: '6059a1dd046d511c2fcb45d9',
      },
    }))
    useCompanyDataSpy.mockImplementation(() => supplierInfo)

    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container && document.body.removeChild(container)
    container = null
  })

  it('should render menus', () => {
    let component

    act(() => {
      component = render(<Menu />, { container: container || undefined })
    })
    expect(container?.textContent).toEqual(
      'OverviewCompany infoRisk analysisShipping data2Audit & complianceCertificationsFacilitiesSustainability & ESGSurveys2Other buyersSerai profile',
    )
  })
  it('should hide Facility for entity is Facility', () => {
    let component
    useCompanyDataSpy.mockImplementation(() => ({
      ...supplierInfo,
      entity: EntityType.Facility,
    }))

    act(() => {
      component = render(<Menu />, { container: container || undefined })
    })
    expect(container?.textContent).toEqual(
      'OverviewCompany infoRisk analysisShipping data2Audit & complianceCertificationsFacilitiesSustainability & ESGSurveys2Other buyersSerai profile',
    )
  })

  it('should show active style for overview ', () => {
    let component

    act(() => {
      component = render(<Menu />, { container: container || undefined })
    })
    expect(container?.querySelector('.active')?.textContent).toEqual('Overview')
    expect(container?.querySelectorAll('.link:not(.active)')?.length).toEqual(10)
  })

  it('should show active style for companyInfo ', () => {
    let component
    useRouter.mockImplementation(() => ({
      pathname: '/partners/6059a1dd046d511c2fcb45d9/company-info',
      query: {
        id: '6059a1dd046d511c2fcb45d9',
      },
    }))

    act(() => {
      component = render(<Menu />, { container: container || undefined })
    })
    expect(container?.querySelector('.active')?.textContent).toEqual('Company info')
    expect(container?.querySelectorAll('.link:not(.active)')?.length).toEqual(10)
  })
})
