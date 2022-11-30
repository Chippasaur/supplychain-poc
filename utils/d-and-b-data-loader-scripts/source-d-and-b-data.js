const fs = require('fs')

const data = require('./dnb_group.json')

function writeToJson(path, object) {
  const data = JSON.stringify(object)
  try {
    fs.writeFileSync(path, data)
  } catch (err) {
    console.error(err)
  }
}

console.log('total rows: ', data.length)

const getItemFromString = (s, n) => {
  const items = []
  const cleanStringIt = s.matchAll(/'(.*?)'/g)
  let result = cleanStringIt.next()
  while (!result.done) {
    items.push(result.value[0].slice(1, result.value[0].length - 1))
    result = cleanStringIt.next()
  }
  return items[n]
}

const newData = []
for (const d of data) {
  const entityType = getItemFromString(d.corporateLinkage.familytreeRolesPlayed, 1)
  const telephone = getItemFromString(d.organization.telephone, 1)
  const websiteUrl = getItemFromString(d.organization.websiteAddress, 1)
  const officialEmail = getItemFromString(d.organization.email, 1)
  const registrationNumber = getItemFromString(d.organization.registrationNumbers, 1)
  const registrationType = getItemFromString(d.organization.registrationNumbers, 3)

  newData.push({
    name: d.name,
    businessType: d.organization.primaryIndustryCode.usSicV4Description,
    entityType,
    address: d.primaryAddress.streetAddress.line1,
    state: d.organization.primaryAddress.addressRegion.name,
    city: d.primaryAddress.addressLocality.name,
    region: d.primaryAddress.addressCountry.name,
    postalCode: d.primaryAddress.postalCode,
    officialEmail,
    telephone,
    websiteUrl,
    registrationName: d.organization.primaryName_y,
    registrationNumber,
    registrationType,
    companyStatus: d.dunsControlStatus.operatingStatus.description === 'Active' ? 0 : 1,
  })
}

writeToJson('./server/migrations/seeds/supplier-dnb-data-0423.json', newData)
// let record = "\"sep=;\"\n"
// record += Object.keys(newData[0]).join(';') + '\n';
// newData.forEach(function(r) {
//     record += Object.values(r).join(';') + '\n';
// })
// fs.writeFileSync('./server/migrations/seeds/supplier-data-0421.csv', record, {encoding: 'utf8'})
