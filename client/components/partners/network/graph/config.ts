import G6 from '@antv/g6'
import { get, toPlainObject } from 'lodash'
import { IG6GraphEvent } from '@antv/g6-core'
import { Graph as GraphType } from '@antv/g6-pc'

import styles from './index.module.scss'
import { highlight } from './highlightUtils'
import { findSelectedNode } from '../../../../utils/networkTransform'
import { CustomerSuppliersResponse } from '../../../../../shared/response'
import { isCustomer, isHighlighted } from './conditions'

let isClicked = false
let isSearchMode = false
let isFreeMode = false

export const addEvents = (
  graph: GraphType,
  setSupplierDetail: (value: ((prevState: any) => any) | any) => void,
  restoreHighlightStatus: () => void,
  setRestoreSwitch: any,
  setTooltip: any,
) => {
  const setIsClicked = (newState: boolean) => (isClicked = newState)
  const setIsSearchMode = (newState: boolean) => (isSearchMode = newState)
  const setIsFreeMode = (newState: boolean) => (isFreeMode = newState)

  const viewportChangeHandler = () => {
    setSupplierDetail(null)
    setTooltip({ display: false })
  }

  const nodeClickHandler = (e: IG6GraphEvent) => {
    const { canvasX, canvasY, item } = e
    const itemData = item?.getModel()
    const cardInfo = get(itemData, 'cardInfo')
    if (!isFreeMode && !isHighlighted(item)) {
      return
    }
    setSupplierDetail({ ...toPlainObject(cardInfo), top: canvasY - 200, right: canvasX - 100 })

    if (isClicked && !isSearchMode) {
      graph.setAutoPaint(false)
      highlight(graph, item)
      graph.paint()
      graph.setAutoPaint(true)
    }
    setIsClicked(true)
  }

  const canvasClickHandler = () => {
    setSupplierDetail(null)
    setIsClicked(true)
    if (!isSearchMode) {
      setRestoreSwitch(true)
    }
  }

  const mouseLeaveHandler = () => {
    setTooltip({ display: false })
    if (!isClicked && !isSearchMode) {
      setRestoreSwitch(true)
    }
  }

  const mouseEnterHandler = (e: IG6GraphEvent) => {
    const { item } = e
    if (item && isHighlighted(item) && !isCustomer(item)) {
      const model = item.getModel()
      const { x, y } = model
      if (x && y && model) {
        const canvasPoint = graph.getCanvasByPoint(x, y)
        setTooltip({ display: true, tooltipTop: canvasPoint.y + 30, tooltipLeft: canvasPoint.x, name: model.fullName })
      }
      if (!isClicked && !isSearchMode) {
        graph.setAutoPaint(false)
        highlight(graph, item)
        graph.paint()
        graph.setAutoPaint(true)
      }
    }
  }

  graph.on('viewportchange', viewportChangeHandler)
  graph.on('node:click', nodeClickHandler)
  graph.on('canvas:click', canvasClickHandler)
  graph.on('edge:click', canvasClickHandler)
  graph.on('node:mouseleave', mouseLeaveHandler)
  graph.on('canvas:mouseleave', mouseLeaveHandler)
  graph.on('node:mouseenter', mouseEnterHandler)

  return [setIsClicked, setIsFreeMode, setIsSearchMode]
}

export const focusOnSelectedNode = (graph: GraphType, filteredSuppliers: CustomerSuppliersResponse[]) => {
  const selectedNode = findSelectedNode(graph.getNodes(), get(filteredSuppliers, '0.companyName'))
  if (selectedNode) {
    graph.zoomTo(0.8)
    graph.focusItem(selectedNode, true, {
      easing: 'easeCubic',
      duration: 1000,
    })
    highlight(graph, selectedNode)
  }
}

export const focusOnCustomerNode = (graph: GraphType) => {
  const customer = graph.getNodes()[0]
  graph.zoomTo(0.8)
  graph.focusItem(customer, true, {
    easing: 'easeCubic',
    duration: 500,
  })
}

const tooltip = new G6.Tooltip({
  className: styles.toolTip,
  getContent(e: IG6GraphEvent) {
    const fullName = e.item?.getModel().fullName
    if (!fullName || !isHighlighted(e.item)) {
      return ''
    }

    const outDiv = document.createElement('div')
    outDiv.innerHTML = `${fullName}`
    return outDiv
  },
  itemTypes: ['node'],
})

export const DefaultGraphConfig = {
  lineType: 'quadratic',
  nodeColor: '#909090',
  labelColor: '#3E4545',
  dangerLabelColor: '#D0021B',
}

export const GraphStyles = {
  width: 940,
  height: 600,
  modes: {
    default: ['double-finger-drag-canvas', { type: 'drag-canvas', allowDragOnItem: true }],
  },
  defaultNode: {
    type: 'circle',
    size: 10,
    style: {
      fill: DefaultGraphConfig.nodeColor,
      lineWidth: 0,
      stroke: 'transparent',
    },
    labelCfg: {
      style: {
        fill: DefaultGraphConfig.labelColor,
        fontSize: 11,
        fontWeight: 400,
      },
      position: 'right',
    },
  },
  defaultEdge: {
    type: DefaultGraphConfig.lineType,
    style: {
      stroke: '#DCDCDC',
      lineWidth: 1,
    },
  },
  nodeStateStyles: {
    dark: {
      opacity: 0.2,
      'text-shape': {
        opacity: 0.2,
      },
    },
  },
  edgeStateStyles: {
    highlight: {
      stroke: '#9DE5EE',
      lineWidth: 4,
      opacity: 1,
    },
    dark: {
      opacity: 0.2,
    },
  },
}
