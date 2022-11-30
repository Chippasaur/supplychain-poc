import moment from 'moment'

import { calDiffTimeFromNow, dateTimeFormatter, formatNumber, formatNumberWithUnit, assembleLocation } from './format'

describe('test format utils', () => {
  describe('test calDiffTimeFromNow', () => {
    it('should get 2d from now', () => {
      expect(calDiffTimeFromNow(new Date('2021-2-21 12:00:00'), new Date('2021-2-23 16:00:00'))).toBe('2d')
    })

    it('should get 4h from now', () => {
      expect(calDiffTimeFromNow(new Date('2021-2-23 12:00:00'), new Date('2021-2-23 16:00:00'))).toBe('4h')
    })

    it('should get 12m from now', () => {
      expect(calDiffTimeFromNow(new Date('2021-2-23 16:00:00'), new Date('2021-2-23 16:12:50'))).toBe('12m')
    })

    it('should get 1m when diffTime less than 1m', () => {
      expect(calDiffTimeFromNow(new Date('2021-2-23 12:00:00'), new Date('2021-2-23 12:00:50'))).toBe('1m')
    })
  })

  describe('test dateTimeFormatter', () => {
    it('should get correct date time string when date parse right', () => {
      expect(dateTimeFormatter(new Date('2020-11-18 16:00:00'))).toBe('18 Nov 2020')
    })

    it('should get correct token string', () => {
      const date = new Date('2021-02-14T19:00:00.000Z')
      expect(moment(dateTimeFormatter(date), 'D MMM YYYY', true).isValid()).toBe(true)
    })

    it('should get invalid date string when date parse wrong', () => {
      expect(dateTimeFormatter(new Date('2020-10-39 16:00:00'))).toBe('Invalid date')
    })
  })

  describe('formatNumberWithUnit', () => {
    it('should return formatted number', () => {
      expect(formatNumberWithUnit(0)).toEqual('0 ')
      expect(formatNumberWithUnit(999)).toEqual('999 ')
      expect(formatNumberWithUnit(1001)).toEqual('1 k')
      expect(formatNumberWithUnit(1091)).toEqual('1.09 k')
      expect(formatNumberWithUnit(1091, '0.[0]')).toEqual('1.1 k')
      expect(formatNumberWithUnit(999999)).toEqual('1 mil')
      expect(formatNumberWithUnit(9000000)).toEqual('9 mil')
      expect(formatNumberWithUnit(1090000, '0.[0]')).toEqual('1.1 mil')
    })
  })

  describe('formatNumber', () => {
    it('should return formatted number and by default with double dashes', () => {
      expect(formatNumber(0)).toEqual('0')
      expect(formatNumber(NaN)).toEqual('--')
      expect(formatNumber(300)).toEqual('300')
    })
  })

  describe('format location', () => {
    it('should return formatted location', () => {
      const location = {
        address: 'a',
        city: 'b',
        state: 'c',
        region: 'd',
        postalCode: '123',
      }
      expect(assembleLocation(location)).toEqual('a, b, c, d')
    })

    it('should return formatted location', () => {
      const incompleteLocation = {
        address: 'a',
        city: undefined,
        state: 'c',
        region: 'd',
        postalCode: '123',
      }
      expect(assembleLocation(incompleteLocation)).toEqual('a, c, d')
    })

    it('should return empty location', () => {
      const emptyLocation = {
        address: undefined,
        city: undefined,
        state: undefined,
        region: undefined,
        postalCode: '123',
      }
      expect(assembleLocation(emptyLocation)).toEqual('')
    })
  })
})
