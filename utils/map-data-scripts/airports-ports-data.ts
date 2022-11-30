import { top50Ports, top50Airports } from './top-ports-list'
import { readJsonFile, writeToJson } from '../../server/migrations/seeds/utils/utils'
const ports = readJsonFile('./ports.json')
const airports = readJsonFile('./airports.json')

const top50AirportNames = new Set()
const top50AirportCodes = new Set()
for (const airport of top50Airports) {
  top50AirportCodes.add(airport.split(' - ')[0])
  top50AirportNames.add(airport.split(' - ')[1])
}

const filteredAirports: any = {
  type: 'FeatureCollection',
  features: [],
}
const filteredPorts: any = {
  type: 'FeatureCollection',
  features: [],
}

for (const airport of airports['features']) {
  if (top50AirportNames.has(airport['properties']['name']) || top50AirportCodes.has(airport['properties']['code'])) {
    filteredAirports['features'].push(airport)
  }
}
console.log(filteredAirports['features'].length)
writeToJson('./top-airports.json', filteredAirports)

for (const port of ports['features']) {
  if (top50Ports.has(port['properties']['portname']) || top50Ports.has(port['properties']['remarks'])) {
    top50Ports.delete(port['properties']['portname'])
    filteredPorts['features'].push(port)
  }
}
console.log(top50Ports)
console.log(filteredPorts['features'].length)
writeToJson('./top-ports.json', filteredPorts)
