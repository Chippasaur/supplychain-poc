import React from 'react'
import { render } from '@testing-library/react'

import { mapboxExpressions } from '../../../utils/map/mapboxExpressions'
import { MapContext } from '../../../utils/map/shareData'
import CustomGroupLayer, { buildGeoData } from './customGroupLayer'
import { CustomerSuppliersResponse } from '../../../../shared/response'

describe('Custom Group Layer', () => {
  it('should be able to transform supplier data to geo data', async () => {
    const suppliers: CustomerSuppliersResponse[] = [
      {
        id: 'id1',
        companyName: 'google',
        entity: 1,
        tier: 1,
        financialHealth: 0,
        rating: 1,
        riskLevel: 1,
        higgTotalScore: 50,
        category: 1,
        coordinate: {
          longitude: 85,
          latitude: 50,
        },
        location: {
          address: 'a',
          city: undefined,
          state: 'c',
          region: 'd',
          postalCode: '123',
        },
        logo: '',
        groupId: 'fake id',
      },
      {
        id: 'id2',
        companyName: 'tencent',
        entity: 1,
        tier: 1,
        financialHealth: 0,
        rating: 1,
        riskLevel: 1,
        higgTotalScore: 50,
        category: 2,
        coordinate: {
          longitude: 35,
          latitude: 80,
        },
        location: {
          address: 'a',
          city: undefined,
          state: 'c',
          region: 'd',
          postalCode: '123',
        },
        logo: '',
        groupId: 'fake id',
      },
    ]

    const result = buildGeoData(suppliers)

    expect(result).toEqual({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            id: 'id1',
            tier: 1,
            name: 'google',
            category: 1,
            riskLevel: 1,
            financialHealth: 0,
            location: {
              address: 'a',
              city: undefined,
              state: 'c',
              region: 'd',
              postalCode: '123',
            },
          },
          geometry: {
            type: 'Point',
            coordinates: [85, 50],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 'id2',
            tier: 1,
            name: 'tencent',
            category: 2,
            riskLevel: 1,
            financialHealth: 0,
            location: {
              address: 'a',
              city: undefined,
              state: 'c',
              region: 'd',
              postalCode: '123',
            },
          },
          geometry: {
            type: 'Point',
            coordinates: [35, 80],
          },
        },
      ],
    })
  })

  it('should render nothing if there is no active point', async () => {
    const map = { addSource: jest.fn(), addLayer: jest.fn(), on: jest.fn() }
    const mapRef = { current: { state: { map } } }

    const { container } = render(
      <MapContext.Provider value={{ mapRef }}>
        <CustomGroupLayer containPopUp suppliers={[]} />
      </MapContext.Provider>,
    )

    expect(container.firstChild).toBeNull()
  })

  describe('Map Source/Layer Configuration', () => {
    const addSource = jest.fn()
    const addLayer = jest.fn()
    const removeSource = jest.fn()
    const removeLayer = jest.fn()
    const map = { addSource, addLayer, removeSource, removeLayer, on: jest.fn(), style: 'some style' }
    const mapRef = { current: { state: { map } } }

    const { unmount } = render(
      <MapContext.Provider value={{ mapRef }}>
        <CustomGroupLayer containPopUp suppliers={[]} />
      </MapContext.Provider>,
    )

    it('should add supplier geo json as map source', async () => {
      expect(addSource).toHaveBeenCalledWith('suppliers', {
        type: 'geojson',
        data: { features: [], type: 'FeatureCollection' },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 40,
        clusterProperties: {
          highRiskSupplierNumber: mapboxExpressions.suppliers.supplierWithHighRiskInCluster,
        },
      })
    })

    it('should add unclustered point layer to map', async () => {
      expect(addLayer).toHaveBeenCalledWith({
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
    })

    it('should add clusters layer to map', async () => {
      expect(addLayer).toHaveBeenCalledWith({
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
    })

    it('should add cluster count layer to map', async () => {
      expect(addLayer).toHaveBeenCalledWith({
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
    })

    it('should add high risk icon layer to map', async () => {
      expect(addLayer).toHaveBeenCalledWith({
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
    })

    it('should remove all source/layer configuration during map teardown', async () => {
      unmount()

      expect(removeSource).toHaveBeenCalledWith('suppliers')
      expect(removeLayer).toHaveBeenCalledWith('unclustered-point')
      expect(removeLayer).toHaveBeenCalledWith('clusters')
      expect(removeLayer).toHaveBeenCalledWith('cluster-count')
      expect(removeLayer).toHaveBeenCalledWith('high-risk-icon')
    })
  })

  describe('Map Event Binding', () => {
    const addSource = jest.fn()
    const addLayer = jest.fn()
    const removeSource = jest.fn()
    const removeLayer = jest.fn()
    const onEventBinding = jest.fn()
    const map = { addSource, addLayer, removeSource, removeLayer, on: onEventBinding, style: 'some style' }
    const mapRef = { current: { state: { map } } }

    render(
      <MapContext.Provider value={{ mapRef }}>
        <CustomGroupLayer containPopUp suppliers={[]} />
      </MapContext.Provider>,
    )

    it('should be able to bind click event on layers', async () => {
      expect(onEventBinding).toHaveBeenCalledWith('click', 'clusters', expect.any(Function))
      expect(onEventBinding).toHaveBeenCalledWith('click', 'unclustered-point', expect.any(Function))
      expect(onEventBinding).toHaveBeenCalledWith('click', expect.any(Function))
    })

    it('should be able to bind mouse event on layers', async () => {
      expect(onEventBinding).toHaveBeenCalledWith('mouseenter', 'clusters', expect.any(Function))
      expect(onEventBinding).toHaveBeenCalledWith('mouseleave', 'clusters', expect.any(Function))
    })

    it('should be able to bind map move and zoom event', async () => {
      expect(onEventBinding).toHaveBeenCalledWith('move', expect.any(Function))
      expect(onEventBinding).toHaveBeenCalledWith('zoom', expect.any(Function))
      expect(onEventBinding).toHaveBeenCalledWith('zoomend', expect.any(Function))
    })
  })
})
