import G6 from '@antv/g6'
import { Dispatch, SetStateAction } from 'react'

import { GraphStyles } from './config'
import { NodeType } from '../../../../../shared/enum/nodeType'
import { isCustomer, isFacility, isGroup, isStandAloneFacility } from './conditions'

export const Network = (ref: HTMLHeadingElement, setIsLayoutEnded: Dispatch<SetStateAction<boolean>>) => {
  G6.registerBehavior('double-finger-drag-canvas', {
    getEvents: function getEvents() {
      return {
        wheel: 'onWheel',
      }
    },

    onWheel: function onWheel(event: any) {
      if (event.ctrlKey) {
        const canvas = graph.get('canvas')
        const point = canvas.getPointByClient(event.clientX, event.clientY)
        let ratio = graph.getZoom()
        if (event.wheelDelta > 0) {
          ratio = ratio + ratio * 0.05
        } else {
          ratio = ratio - ratio * 0.05
        }
        graph.zoomTo(ratio, {
          x: point.x,
          y: point.y,
        })
      } else {
        const x = event.deltaX || event.movementX
        let y = event.deltaY || event.movementY
        if (!y && navigator.userAgent.indexOf('Firefox') > -1) {
          y = (-event.wheelDelta * 125) / 3
        }
        graph.translate(-x, -y)
      }
      event.preventDefault()
    },
  })
  const graph = new G6.Graph({
    container: ref,
    ...GraphStyles,
    layout: {
      preventOverlap: true,
      type: 'force',
      collideStrength: 1,
      alphaMin: 0.07,
      alpha: 0.5,
      alphaDecay: 0.04,
      nodeSize: 30,
      onLayoutEnd: () => {
        setIsLayoutEnded(true)
      },
      linkDistance: (edge: { source: { nodeType: NodeType }; target: { nodeType: NodeType } }) => {
        if (isGroup(edge.source) && isGroup(edge.target)) {
          return 300
        }
        if (isFacility(edge.source) && isGroup(edge.target)) {
          return 10
        }
        return 50
      },
      nodeSpacing: (node: { nodeType: NodeType }) => {
        if (isCustomer(node)) {
          return 120
        }
        if (isGroup(node)) {
          return 15
        }
        return 5
      },
      nodeStrength: (node: { nodeType: NodeType }) => {
        if (isCustomer(node)) {
          return -10
        }
        if (isGroup(node)) {
          return -1500
        }
        return -500
      },
      edgeStrength: (edge: { source: { nodeType: NodeType; isTier1: boolean }; target: { nodeType: NodeType } }) => {
        if (isGroup(edge.source) && isGroup(edge.target)) {
          return 0.8
        }
        if (isFacility(edge.source) && isFacility(edge.target)) {
          return 0.1
        }
        if (isFacility(edge.source) && isGroup(edge.target)) {
          return 4.5
        }
        if (isStandAloneFacility(edge.source) && isCustomer(edge.target)) {
          return 0.3
        }
        if (isStandAloneFacility(edge.source) && isFacility(edge.target)) {
          return 1
        }
        // case of tier1 to customer
        return 0.7
      },
    },
  })

  return graph
}
