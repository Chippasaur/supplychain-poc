import { isEmpty } from 'lodash'
import { Popup } from 'react-mapbox-gl'
import React, { useContext, useState, useEffect } from 'react'

import SupplierDetail from './supplierDetail'
import { CustomerSuppliersResponse } from '../../../../shared/response'
import { MapContext } from '../../../utils/map/shareData'
import { mapboxExpressions } from '../../../utils/map/mapboxExpressions'

interface PartnersProps {
  suppliers: CustomerSuppliersResponse[]
  containPopUp: boolean
}

export const buildGeoData: any = (suppliers: CustomerSuppliersResponse[]) => {
  const features = suppliers.map(supplier => ({
    type: 'Feature',
    properties: {
      id: supplier.id,
      tier: supplier.tier,
      name: supplier.companyName,
      location: supplier.location,
      category: supplier.category,
      riskLevel: supplier.riskLevel,
      financialHealth: supplier.financialHealth,
    },
    geometry: {
      type: 'Point',
      coordinates: [supplier.coordinate.longitude, supplier.coordinate.latitude],
    },
  }))

  return {
    type: 'FeatureCollection',
    features: features,
  }
}

const CustomGroupLayer = ({ suppliers, containPopUp }: PartnersProps) => {
  const data = buildGeoData(suppliers)
  const initActivePoint = {
    tier: undefined,
    name: undefined,
    category: undefined,
    location: undefined,
    riskLevel: undefined,
    financialHealth: undefined,
    coordinates: [] as [],
  }

  const { mapRef } = useContext(MapContext)
  const { map } = mapRef.current.state
  const [activePoint, setActivePoint] = useState(initActivePoint)

  useEffect(() => {
    map.addSource('suppliers', {
      type: 'geojson',
      data,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 40, // Radius of each cluster when clustering points (defaults to 50)
      clusterProperties: {
        highRiskSupplierNumber: mapboxExpressions.suppliers.supplierWithHighRiskInCluster,
      },
    })

    map.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: 'suppliers',
      filter: mapboxExpressions.suppliers.isNotCluster,
      paint: {
        'text-color': 'black',
        'text-halo-color': 'white',
        'text-halo-width': 1.5,
      },
      layout: {
        'text-field': '{name}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [1.7, 0],
        'text-anchor': 'left',
        'text-size': 10,
        'icon-image': mapboxExpressions.suppliers.supplierIconImage,
        'icon-size': 0.7,
        'text-allow-overlap': true,
        'icon-allow-overlap': true,
      },
    })

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'suppliers',
      filter: mapboxExpressions.suppliers.isCluster,
      paint: {
        'circle-color': mapboxExpressions.suppliers.clusterColor,
        'circle-stroke-width': 6,
        'circle-stroke-color': mapboxExpressions.suppliers.clusterColor,
        'circle-stroke-opacity': 0.2,
        'circle-radius': 18,
      },
    })

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'suppliers',
      filter: mapboxExpressions.suppliers.isCluster,
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 13,
        'text-allow-overlap': true,
      },
      paint: {
        'text-color': '#ffffff',
      },
    })

    map.addLayer({
      id: 'high-risk-icon',
      type: 'symbol',
      source: 'suppliers',
      filter: mapboxExpressions.suppliers.riskySingleSupplierOrCluster,
      layout: {
        'icon-image': 'high-risk-or-above-icon',
        'icon-size': 1.3,
        'icon-anchor': 'bottom-left',
        'icon-offset': mapboxExpressions.suppliers.riskIconOffSet,
      },
    })

    return () => {
      const isMapStyleAvailable = map.style !== undefined
      if (isMapStyleAvailable) {
        map.removeLayer('unclustered-point')
        map.removeLayer('clusters')
        map.removeLayer('cluster-count')
        map.removeLayer('high-risk-icon')
        map.removeSource('suppliers')
      }
    }
  }, [data.features.length])

  useEffect(() => {
    map.on('click', 'clusters', function (e: any) {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      })
      const clusterId = features[0].properties.cluster_id
      map.getSource('suppliers').getClusterExpansionZoom(clusterId, function (err: any, zoom: any) {
        if (err) {
          return
        }

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom + 2,
        })
      })
    })

    map.on('click', 'unclustered-point', function (e: any) {
      const coordinates = e.features[0].geometry.coordinates.slice()
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }
      const location = (e.features[0].properties.location && JSON.parse(e.features[0].properties.location)) || undefined
      setActivePoint({ coordinates, ...e.features[0].properties, location })
    })

    map.on('click', function (e: any) {
      const features = map.queryRenderedFeatures(e.point, { layers: ['clusters', 'unclustered-point'] })
      if (isEmpty(features)) {
        setActivePoint(initActivePoint)
      }
    })

    map.on('mouseenter', 'clusters', function () {
      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'clusters', function () {
      map.getCanvas().style.cursor = ''
    })

    map.on('move', function () {
      setActivePoint(initActivePoint)
    })

    map.on('zoom', function () {
      map.setLayoutProperty('high-risk-icon', 'visibility', 'none')
    })

    map.on('zoomend', function () {
      map.setLayoutProperty('high-risk-icon', 'visibility', 'visible')
    })
  }, [])

  const { coordinates } = activePoint

  return isEmpty(coordinates) ? null : (
    <>
      {containPopUp && (
        <Popup coordinates={coordinates} offset={25}>
          <SupplierDetail {...activePoint} />
        </Popup>
      )}
    </>
  )
}

export default CustomGroupLayer
