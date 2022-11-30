import { render } from '@testing-library/react'
import React from 'react'

import GroupAndFacilitiesLayer, { buildData } from './groupAndFacilitiesLayer'
import { buildDataResult, groupAndFacilities, buyerList } from '../../../__test__/mockData/facilities'
import { MapContext } from '../../../utils/map/shareData'
import { mapboxExpressions } from '../../../utils/map/mapboxExpressions'
import { EntityType } from '../../../../shared/enum/entityType'

describe('custom group layer', () => {
  it('should be able to transform supplier data to geo data', async () => {
    const result = buildData(groupAndFacilities, buyerList)

    expect(result).toEqual(buildDataResult)
  })

  describe('Facilities Map Source/Layer Configuration', () => {
    const addSource = jest.fn()
    const addLayer = jest.fn()
    const removeSource = jest.fn()
    const removeLayer = jest.fn()
    const map = { addSource, addLayer, removeSource, removeLayer, on: jest.fn(), style: 'some style' }
    const mapRef = { current: { state: { map } } }

    const { unmount } = render(
      <MapContext.Provider value={{ mapRef }}>
        <GroupAndFacilitiesLayer />
      </MapContext.Provider>,
    )

    it('should add facilities geo json as map source', async () => {
      expect(addSource).toHaveBeenCalledWith('group-and-facilities', {
        type: 'geojson',
        data: {
          features: [
            {
              geometry: {
                coordinates: [0, 0],
                type: 'Point',
              },
              properties: {
                entity: EntityType.Facility,
                name: '',
                buyers: [],
                id: '',
                location: '',
              },
              type: 'Feature',
            },
          ],
          type: 'FeatureCollection',
        },
      })
    })

    it('should add group point layer to map', async () => {
      expect(addLayer).toHaveBeenCalledWith({
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
    })

    it('should add facilities layer to map', async () => {
      expect(addLayer).toHaveBeenCalledWith({
        id: 'facilities',
        type: 'circle',
        source: 'group-and-facilities',
        filter: mapboxExpressions.facilities.isFacility,
        paint: {
          'circle-color': 'red',
          'circle-radius': 5,
        },
      })
    })

    it('should add company name layer to map', async () => {
      expect(addLayer).toHaveBeenCalledWith({
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
    })

    it('should add company first character layer to map', async () => {
      expect(addLayer).toHaveBeenCalledWith({
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
    })

    it('should has select for map', function () {
      const { container } = render(
        <MapContext.Provider value={{ mapRef }}>
          <GroupAndFacilitiesLayer />
        </MapContext.Provider>,
      )

      const searchBox = container.getElementsByClassName('selectBox')

      expect(searchBox).toHaveLength(1)
    })

    it('should remove all source/layer configuration during map teardown', async () => {
      unmount()
      expect(removeSource).toHaveBeenCalledWith('group-and-facilities')
      expect(removeLayer).toHaveBeenCalledWith('group')
      expect(removeLayer).toHaveBeenCalledWith('facilities')
      expect(removeLayer).toHaveBeenCalledWith('company-name')
      expect(removeLayer).toHaveBeenCalledWith('company-first-character')
    })
  })
})
