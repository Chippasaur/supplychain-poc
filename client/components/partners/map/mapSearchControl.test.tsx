import React from 'react'
import { render } from 'enzyme'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import MapSearchControl from './mapSearchControl'
import { MapContext } from '../../../utils/map/shareData'

describe('Map Search Control', () => {
  it('should be able to add search bar to the map', async () => {
    const addControl = jest.fn()
    const control = new MapboxGeocoder({ accessToken: 'fake token' })
    const mapRef = { current: { state: { map: { addControl } } } }

    render(
      <MapContext.Provider value={{ mapRef }}>
        <MapSearchControl control={control} />
      </MapContext.Provider>,
    )

    expect(addControl.mock.calls.length).toEqual(1)
  })

  it('should not add duplicate search bar', async () => {
    const addControl = jest.fn()
    const control = new MapboxGeocoder({ accessToken: 'fake token' })
    const mapRef = { current: { state: { map: { addControl, _controls: [control] } } } }

    render(
      <MapContext.Provider value={{ mapRef }}>
        <MapSearchControl control={control} />
      </MapContext.Provider>,
    )

    expect(addControl.mock.calls.length).toEqual(0)
  })
})
