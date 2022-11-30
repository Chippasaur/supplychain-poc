import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ZoomControl } from 'react-mapbox-gl'
import { countBy } from 'lodash'
import cls from 'classnames'

import Legend from '../legend'
import styles from './supplierMap.module.scss'
import MapSearchControl from './mapSearchControl'
import CustomGroupLayer from './customGroupLayer'
import { CustomerSuppliersResponse } from '../../../../shared/response'
import { Map, mapBoxStyle, MapContext, maxBounds, mapboxGeocoder } from '../../../utils/map/shareData'
import { EntityType } from '../../../../shared/enum/entityType'
import SupplierStatisticsButton from './supplierStatisticsButton'

interface supplierMapProps {
  suppliers: CustomerSuppliersResponse[]
  controllers: Controller
  mapContainerStyle: MapContainerStyle
}

interface MapContainerStyle {
  height: string
  width: string
}

interface Controller {
  containZoomController: boolean
  containSearchBar: boolean
  containLegend: boolean
  containPopUp: boolean
  containStatistics: boolean
}

export interface SupplierStatistics {
  partnerNum: number | undefined
  facilityNum: number | undefined
}

const SupplierMap = ({ suppliers, controllers, mapContainerStyle }: supplierMapProps) => {
  const shenzhen = [113.9066, 22.5578] as [number, number]
  const [supplierStatistics, setSupplierStatistics] = useState<SupplierStatistics>({
    partnerNum: undefined,
    facilityNum: undefined,
  })
  const [filteredSuppliers, setFilteredSuppliers] = useState<CustomerSuppliersResponse[]>([])
  const [filterType, setFilterType] = useState(EntityType.Group)

  const mapRef = useRef<any>(null)
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    boxShadow: 'none',
    border: 'none',
  }

  useEffect(() => {
    const partnerNum = countBy(suppliers, ({ entity }) => entity === EntityType.Group).true
    const facilityNum = suppliers.length - partnerNum
    setSupplierStatistics({ partnerNum, facilityNum })

    const filteredSuppliers = controllers.containStatistics
      ? suppliers.filter(({ entity }) => entity === EntityType.Group)
      : suppliers
    setFilteredSuppliers(filteredSuppliers)
  }, [suppliers])

  const onSelectFilter = useCallback(
    (type: EntityType) => {
      setFilterType(type)
      setFilteredSuppliers(suppliers.filter(({ entity }) => entity === type))
    },
    [filterType, suppliers],
  )

  return (
    <Map
      style={mapBoxStyle}
      containerStyle={mapContainerStyle}
      zoom={[2]}
      center={shenzhen}
      maxBounds={maxBounds}
      ref={mapRef}>
      <>
        {controllers.containZoomController && (
          <ZoomControl
            className={cls('zoom-controller', styles.zoomButton)}
            position="top-right"
            style={containerStyle}
          />
        )}
        {controllers.containStatistics && (
          <div className={styles.statistics}>
            <SupplierStatisticsButton
              statisticsNum={supplierStatistics.partnerNum}
              statisticsType={EntityType.Group}
              isActivated={filterType === EntityType.Group}
              onSelectFilter={onSelectFilter}
            />
            <SupplierStatisticsButton
              statisticsNum={supplierStatistics.facilityNum}
              statisticsType={EntityType.Facility}
              isActivated={filterType === EntityType.Facility}
              onSelectFilter={onSelectFilter}
            />
          </div>
        )}
      </>
      <MapContext.Provider value={{ mapRef }}>
        {controllers.containSearchBar && <MapSearchControl control={mapboxGeocoder} />}
        <CustomGroupLayer suppliers={filteredSuppliers} containPopUp={controllers.containPopUp} />
      </MapContext.Provider>
    </Map>
  )
}

export default SupplierMap
