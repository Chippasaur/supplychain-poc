import { buildDbConnectionUri } from '../../infrastructure/dbConnection'

describe('mongodb', () => {
  it('should be able to build connection url for local env', () => {
    const params = { host: 'localhost', port: 27017, dbName: 'serai_poc_local', user: '', password: '' }
    expect(buildDbConnectionUri(params)).toBe('mongodb://:@localhost:27017/serai_poc_local')
  })

  it('should use mongodb default port 27017 if absent', () => {
    const params = { host: 'localhost', port: 27017, dbName: 'serai_poc_local', user: '', password: '' }
    expect(buildDbConnectionUri(params)).toBe('mongodb://:@localhost:27017/serai_poc_local')
  })

  it('should be able to build connection url for preview env', () => {
    const params = {
      host: '34.92.118.222',
      port: 27017,
      dbName: 'serai_poc_preview',
      user: 'serai_poc_preview',
      password: 'sEra1Pr2vI2W',
    }
    expect(buildDbConnectionUri(params)).toBe(
      'mongodb://serai_poc_preview:sEra1Pr2vI2W@34.92.118.222:27017/serai_poc_preview',
    )
  })
})
