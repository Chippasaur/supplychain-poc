import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

export const MapContext = React.createContext<any>({})

export const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

export const mapContainerStyle = { height: '75vh', width: '100%' }

export const mapBoxStyle = process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL as string

export const Map = ReactMapboxGl({
  accessToken,
  renderWorldCopies: false,
  dragRotate: false,
})

const southwest = [-180, -85]
const northeast = [180, 85]
export const maxBounds = [southwest, northeast] as [[number, number], [number, number]]

export const mapboxGeocoder = new MapboxGeocoder({ accessToken, placeholder: 'Search' })
