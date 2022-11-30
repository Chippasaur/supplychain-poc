import { find } from 'lodash'
import { useContext } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { MapContext } from '../../../utils/map/shareData'

interface MapControlProps {
  control: any
}

export default function MapSearchControl(props: MapControlProps) {
  const { mapRef } = useContext(MapContext)

  const { map } = mapRef.current.state

  if (!find(map._controls, control => control instanceof MapboxGeocoder)) {
    map.addControl(props.control, 'top-left')
  }

  return null
}
