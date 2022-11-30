import { determineMode } from './modeCondition'

describe('mode conditions', () => {
  describe('search mode', () => {
    it('should be search mode if company name field is not empty', () => {
      const filters = {
        companyName: 'fake name',
        tier: [],
        relationship: [],
        rating: [],
        category: [],
        entity: [],
        overAllBusinessRisk: [],
        trafficLightRating: [],
        higgFemScore: [],
      }

      const mode = determineMode(filters)

      expect(mode).toEqual('search')
    })
  })

  describe('filter mode', () => {
    it('should be filter mode if company name field is empty but there is at least one filter', () => {
      const filters = {
        companyName: null,
        tier: [],
        relationship: [],
        rating: [],
        category: [],
        entity: ['facility'],
        overAllBusinessRisk: [],
        trafficLightRating: [],
        higgFemScore: [0, 100],
      }

      const mode = determineMode(filters)

      expect(mode).toEqual('filter')
    })
  })

  describe('free mode', () => {
    it('should be free mode if there is no search or filter applied', () => {
      const filters = {
        companyName: null,
        tier: [],
        relationship: [],
        rating: [],
        category: [],
        entity: [],
        overAllBusinessRisk: [],
        trafficLightRating: [],
        higgFemScore: [0, 100],
      }

      const mode = determineMode(filters)

      expect(mode).toEqual('free')
    })
  })
})
