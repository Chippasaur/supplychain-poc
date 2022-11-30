import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useRef } from 'react'
import { ZoomControl } from 'react-mapbox-gl'

import styles from './index.module.scss'
import GroupAndFacilitiesLayer from './groupAndFacilitiesLayer/groupAndFacilitiesLayer'
import { mapBoxStyle, maxBounds, MapContext, Map, mapContainerStyle, mapboxGeocoder } from '../../utils/map/shareData'

const FacilitiesMap = () => {
  const center = [0, 40] as [number, number]

  const mapRef = useRef<any>(null)
  const zoomControllerStyle: React.CSSProperties = {
    boxShadow: 'none',
    border: 'none',
  }

  return (
    <div className={styles.map}>
      <Map
        style={mapBoxStyle}
        containerStyle={mapContainerStyle}
        zoom={[1]}
        center={center}
        maxBounds={maxBounds}
        ref={mapRef}>
        <ZoomControl position="bottom-right" style={zoomControllerStyle} className={styles.zoomController} />
        <MapContext.Provider value={{ mapRef }}>
          <GroupAndFacilitiesLayer />
        </MapContext.Provider>
      </Map>
    </div>
  )
}
export default FacilitiesMap
