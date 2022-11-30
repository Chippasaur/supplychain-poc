print('Start #################################################################')

db = db.getSiblingDB('serai_poc_local')

db.createUser({
  user: 'serai_poc_local',
  pwd: '7urdsQSwi4z44A',
  roles: [{ role: 'readWrite', db: 'serai_poc_local' }],
})

print('END #################################################################')
