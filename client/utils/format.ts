import moment from 'moment'
import numeral from 'numeral'
import { isEmpty, isFinite, compact } from 'lodash'

import { Location } from '../../shared/types'

export function calDiffTimeFromNow(time: Date, now = new Date()) {
  const diffDays = moment(now).diff(time, 'd')
  if (diffDays > 0) {
    return `${diffDays}d`
  }

  const diffHours = moment(now).diff(time, 'h')
  if (diffHours > 0) {
    return `${diffHours}h`
  }

  const diffMinutes = moment(now).diff(time, 'm')
  return `${diffMinutes || 1}m`
}

export const dateTimeFormatter = (time: Date) => moment(time).format('D MMM YYYY')

export const formatNumber = (number: number | string | undefined, fallback = '--') => {
  return isFinite(number) || !isEmpty(number) ? Number(number).toLocaleString() : fallback
}

export const formatNumberWithUnit = (num: number, formatting = '0.[00]') => {
  let unit = '',
    numberFormatted = numeral(num).format(formatting)

  if (Number(numberFormatted) >= 1000) {
    unit = 'k'
    numberFormatted = numeral(num / 1000).format(formatting)
  }
  if (Number(numberFormatted) >= 1000) {
    unit = 'mil'
    numberFormatted = numeral(num / 1000000).format(formatting)
  }

  return `${numberFormatted} ${unit}`
}

export const assembleLocation = (location: Location) => {
  const locationArray = [location.address, location.city, location.state, location.region]
  return compact(locationArray).join(', ')
}
