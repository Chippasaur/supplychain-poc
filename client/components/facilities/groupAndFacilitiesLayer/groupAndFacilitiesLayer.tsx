import { find, get } from 'lodash'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import React, { useContext, useEffect, useState } from 'react'

import Select from '../../select'
import { MapContext } from '../../../utils/map/shareData'
import styles from './groupAndFacilitiesLayer.module.scss'
import { BuyerResponse } from '../../../../shared/response'
import OtherBuyerList from '../otherBuyerList/otherBuyerList'
import { EntityType } from '../../../../shared/enum/entityType'
import { assembleLocation } from '../../../utils/format'
import { mapboxExpressions } from '../../../utils/map/mapboxExpressions'
import FacilitiesOverview from '../facilitiesOverview/facilitiesOverview'
import { BuyersDataSource } from '../../../../shared/enum/buyersDataSource'
import { useGroupAndFacilities, GroupAndFacilitiesData, useBuyers } from '../../../utils/hooks'
import Icon from '../../icon'

export interface BuyerList {
  buyers: string[]
  location: string
  companyName: string
}

export const buildData = (groupAndFacilitiesData: GroupAndFacilitiesData, buyers: BuyerResponse[]) => {
  const { group, facilities } = groupAndFacilitiesData
  const facilitiesFeatures = facilities.map(facility => ({
    type: 'Feature',
    properties: {
      name: facility.name,
      entity: EntityType.Facility,
      id: facility.id,
      location: assembleLocation(facility.location),
      buyers: get(find(buyers, { id: facility.id }), 'buyers', []),
    },
    geometry: {
      type: 'Point',
      coordinates: [facility.coordinate.longitude, facility.coordinate.latitude],
    },
  }))

  if (!group) {
    return {
      type: 'FeatureCollection',
      features: facilitiesFeatures,
    }
  }
  const groupFeature = {
    type: 'Feature',
    properties: {
      firstCharacter: group.name.charAt(0),
      name: group.name,
      entity: group.entity,
      id: group.id,
      location: assembleLocation(group.location),
      buyers: get(find(buyers, { id: group.id }), 'buyers', []),
    },
    geometry: {
      type: 'Point',
      coordinates: [group.coordinate.longitude, group.coordinate.latitude],
    },
  }

  return {
    type: 'FeatureCollection',
    features: [groupFeature, ...facilitiesFeatures],
  }
}

const GroupAndFacilitiesLayer = () => {
  const { mapRef } = useContext(MapContext)
  const { map } = mapRef.current.state

  const [searchValue, setSearchValue] = useState<string | string[] | null>(null)

  const groupAndFacilities = useGroupAndFacilities()
  const buyers = useBuyers(BuyersDataSource.SHIPMENTS)
  const [showBuyers, setShowBuyers] = useState(false)
  const [facilityBuyer, setFacilityBuyer] = useState<BuyerList>({
    buyers: [],
    companyName: '',
    location: '',
  })
  const { group, facilities } = groupAndFacilities
  const data = buildData(groupAndFacilities, buyers)
  const searchTargets = group ? [group, ...facilities] : facilities

  const setAndShowBuyers = (e: any) => {
    const companyName = e.features[0].properties.name
    const geoCoder = find(map._controls, control => control instanceof MapboxGeocoder)
    if (geoCoder) {
      geoCoder.setInput(companyName)
      geoCoder.on('clear', function (e: any) {
        setShowBuyers(false)
      })
    }
    setFacilityBuyer({
      buyers: JSON.parse(e.features[0].properties.buyers),
      companyName,
      location: e.features[0].properties.location,
    })
    setSearchValue(companyName)
    setShowBuyers(true)
  }

  useEffect(() => {
    map.addSource('group-and-facilities', {
      type: 'geojson',
      data,
    })

    map.addLayer({
      id: 'group',
      type: 'circle',
      source: 'group-and-facilities',
      filter: mapboxExpressions.facilities.isGroup,
      paint: {
        'circle-color': '#FF9D1A',
        'circle-radius': 11,
        'circle-stroke-width': 7,
        'circle-stroke-color': '#FF9D1A',
        'circle-stroke-opacity': 0.2,
      },
    })

    map.addLayer({
      id: 'facilities',
      type: 'circle',
      source: 'group-and-facilities',
      filter: mapboxExpressions.facilities.isFacility,
      paint: {
        'circle-color': 'red',
        'circle-radius': 5,
      },
    })

    map.addLayer({
      id: 'company-name',
      type: 'symbol',
      source: 'group-and-facilities',
      paint: {
        'text-color': 'black',
        'text-halo-color': 'white',
        'text-halo-width': 1.5,
      },
      layout: {
        'text-field': '{name}',
        'text-font': [
          'case',
          mapboxExpressions.facilities.isGroup,
          ['literal', ['Arial Unicode MS Bold']],
          ['literal', ['Arial Unicode MS Regular']],
        ],
        'text-offset': ['case', mapboxExpressions.facilities.isGroup, ['literal', [1, 0]], ['literal', [0.6, 0]]],
        'text-anchor': 'left',
        'text-size': ['case', mapboxExpressions.facilities.isGroup, 20, 16],
      },
    })

    map.addLayer({
      id: 'company-first-character',
      type: 'symbol',
      source: 'group-and-facilities',
      paint: {
        'text-color': 'white',
      },
      layout: {
        'text-field': '{firstCharacter}',
        'text-font': ['Arial Unicode MS Bold'],
        'text-anchor': 'center',
        'text-size': 14,
      },
    })

    map.on('click', 'group', function (e: any) {
      setAndShowBuyers(e)
    })

    map.on('click', 'facilities', function (e: any) {
      setAndShowBuyers(e)
    })

    map.on('click', 'company-name', function (e: any) {
      setAndShowBuyers(e)
    })

    return () => {
      const isMapStyleAvailable = map.style !== undefined
      if (isMapStyleAvailable) {
        map.removeLayer('group')
        map.removeLayer('facilities')
        map.removeLayer('company-name')
        map.removeLayer('company-first-character')
        map.removeSource('group-and-facilities')
      }
    }
  })

  const flyToCompany = (companyName: string | string[] | null) => {
    setSearchValue(companyName)
    const targetCompany = find(searchTargets, { name: companyName })
    if (typeof targetCompany === 'object') {
      mapRef.current.state.map.flyTo({
        center: [targetCompany.coordinate.longitude, targetCompany.coordinate.latitude],
        essential: true,
        zoom: 7,
      })
    } else {
      setShowBuyers(false)
    }
  }

  return (
    <>
      <div className={styles.selectBoxWrapper}>
        <Select
          size="large"
          value={searchValue}
          options={searchTargets.map(({ name }) => name)}
          onChange={(event, value) => flyToCompany(value)}
          classnames={styles.selectBox}
          icon={<Icon type={'search'} size={20} />}
          popupIcon={null}
          textFieldVariant="outlined"
          placeholder="Search by name"
          displayClearIcon
        />
      </div>
      {showBuyers && <OtherBuyerList buyerList={facilityBuyer} />}
      <FacilitiesOverview facilities={facilities} />
    </>
  )
}

export default GroupAndFacilitiesLayer
