import useSWR from 'swr'
import { ConfigInterface, keyInterface, responseInterface } from 'swr/dist/types'

import { UsersResponse } from '../../../shared/response'

interface UsersStructure {
  name: null
  email: null
  customerId: null
}

export let savedUserInfo: UsersResponse | UsersStructure = {
  name: null,
  email: null,
  customerId: null,
}
const setSavedUserInfo = (info: UsersResponse) => {
  savedUserInfo = info
}

export const useFetchUserInfo = () => {
  const { data } = useSWR(savedUserInfo.customerId ? null : '/api/v1/users/me')
  data && setSavedUserInfo(data)
  return data
}

export const fetcher = (url: string, config?: RequestInit) => fetch(url, config).then(res => res.json())

interface Options {
  relyCustomId?: boolean
}

const isPaused = (relyCustomId: boolean) => {
  return relyCustomId && !savedUserInfo.customerId
}

export const fetchData = (
  key: keyInterface,
  options: Options = { relyCustomId: true },
  config: ConfigInterface<any, any> = {},
): responseInterface<any, any> => {
  const { relyCustomId } = options
  useFetchUserInfo()
  return useSWR(key, { ...config, isPaused: () => isPaused(!!relyCustomId) })
}

export const fetchCommonData = (key: keyInterface, config?: ConfigInterface<any, any>): responseInterface<any, any> => {
  return useSWR(key, config)
}
