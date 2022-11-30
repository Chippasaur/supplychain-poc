import cls from 'classnames'
import { get, isEmpty } from 'lodash'
import { Graph as GraphType } from '@antv/g6'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import Icon from '../../../icon'
import styles from './index.module.scss'
import { Network } from './graphInstance'
import SupplierDetail from '../../map/supplierDetail'
import LoadingProgress from '../../../loadingProgress'
import { useCustomerData } from '../../../../utils/hooks'
import { highlightFilteredNodes } from './highlightUtils'
import { Mode } from '../../../../utils/network/modeCondition'
import { isFilterMode, isFreeMode, isSearchMode } from './conditions'
import { transformNodesData } from '../../../../utils/networkTransform'
import { CustomerSuppliersResponse } from '../../../../../shared/response'
import { addEvents, focusOnCustomerNode, focusOnSelectedNode } from './config'

interface PartnersProps {
  suppliers: CustomerSuppliersResponse[]
  filteredSuppliers: CustomerSuppliersResponse[]
  mode: Mode
}

let setIsClicked: (newState: boolean) => void
let setIsSearchMode: (newState: boolean) => void
let setIsFreeMode: (newState: boolean) => void

const Graph = ({ suppliers, filteredSuppliers, mode }: PartnersProps) => {
  const ref = useRef<HTMLHeadingElement>(null)
  const [supplierDetail, setSupplierDetail] = useState<any>(null)
  const [tooltip, setTooltip] = useState<any>(null)
  const [isLayoutEnded, setIsLayoutEnded] = useState<boolean>(false)
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true)
  const graph = useRef<GraphType | null>(null)
  const customer = useCustomerData()
  const [restoreSwitch, setRestoreSwitch] = useState<boolean>(false)

  useEffect(() => {
    if (!graph.current && ref.current) {
      graph.current = Network(ref.current, setIsLayoutEnded)
      ;[setIsClicked, setIsFreeMode, setIsSearchMode] = addEvents(
        graph.current,
        setSupplierDetail,
        restoreHighlightStatus,
        setRestoreSwitch,
        setTooltip,
      )
    }
  }, [])

  useEffect(() => {
    ;(async function () {
      if (suppliers.length && customer.logoUri) {
        const result = await transformNodesData(customer, suppliers)
        if (!graph.current) {
          return
        }
        setLoadingStatus(false)
        graph.current.data(result)
        graph.current.render()
        graph.current.zoomTo(0.2, { x: 425, y: 300 })
      }
    })()
    return () => setLoadingStatus(isEmpty(suppliers) || !customer.logoUri)
  }, [customer.logoUri, suppliers, graph])

  useEffect(() => {
    if (!graph.current || isEmpty(suppliers) || !isLayoutEnded) {
      return
    }

    if (isSearchMode(mode)) {
      focusOnSelectedNode(graph.current, filteredSuppliers)
      setIsSearchMode(true)
      setIsFreeMode(false)
    }
    if (isFilterMode(mode)) {
      setIsSearchMode(false)
      setIsFreeMode(false)
      restoreHighlightStatus()
    }
    if (isFreeMode(mode)) {
      focusOnCustomerNode(graph.current)
      setIsSearchMode(false)
      setIsFreeMode(true)
      restoreHighlightStatus()
    }
  }, [filteredSuppliers, suppliers, isLayoutEnded, mode])

  const restoreHighlightStatus = () => {
    const current = graph.current

    if (!current || isSearchMode(mode)) {
      return
    }
    if (isFilterMode(mode) && isLayoutEnded) {
      highlightFilteredNodes(current, filteredSuppliers)
    } else {
      current.getNodes().forEach(node => {
        current.clearItemStates(node)
      })
      current.getEdges().forEach(edge => {
        current.clearItemStates(edge)
      })
    }
    setIsClicked(false)
    setRestoreSwitch(false)
  }

  restoreSwitch && restoreHighlightStatus()

  const canvasOnBlur = useCallback(
    (e: MouseEvent) => {
      const tagName = get(e.target, 'tagName', '')
      if (tagName.toUpperCase() !== 'CANVAS') {
        restoreHighlightStatus()
        setSupplierDetail(null)
      }
    },
    [restoreHighlightStatus],
  )

  useEffect(() => {
    if (graph.current) {
      document.body.addEventListener('click', canvasOnBlur)
    }
    return () => {
      document.body.removeEventListener('click', canvasOnBlur)
    }
  }, [graph, canvasOnBlur])

  const zoomIn = useCallback(
    e => {
      graph.current && graph.current.zoom(1.1)
      e.stopPropagation()
    },
    [graph.current],
  )

  const zoomOut = useCallback(
    e => {
      graph.current && graph.current.zoom(0.9)
      e.stopPropagation()
    },
    [graph.current],
  )

  const { id, tier, category, companyName, riskLevel, financialHealth, top, right, location } = supplierDetail || {}
  const { display, tooltipTop, tooltipLeft, name } = tooltip || {}
  return (
    <>
      {loadingStatus && (
        <div className={styles.loading}>
          <LoadingProgress />
        </div>
      )}
      <div ref={ref} className={cls(styles.graph, { [styles.cursorGrab]: !id })}>
        <Icon type={'zoom_in'} size={18} className={styles.zoomIn} onClick={zoomIn} />
        <Icon type={'zoom_out'} size={18} className={styles.zoomOut} onClick={zoomOut} />
        {id && (
          <SupplierDetail
            style={{
              top: `${top}px`,
              left: `${right}px`,
            }}
            className={styles.supplierDetail}
            id={id}
            tier={tier}
            category={category}
            name={companyName}
            riskLevel={riskLevel}
            location={location}
            financialHealth={financialHealth}
          />
        )}
      </div>
      {display && (
        <div className={styles.toolTip} style={{ top: `${tooltipTop}px`, left: `${tooltipLeft}px` }}>
          {name}
        </div>
      )}
    </>
  )
}

export default Graph
