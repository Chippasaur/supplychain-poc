import { map } from 'lodash'
import { IEdge, INode, ICombo } from '@antv/g6'
import { Graph as GraphType } from '@antv/g6-pc'

import { CustomerSuppliersResponse } from '../../../../../shared/response'
import {
  isCustomer,
  isFacility,
  isGroup,
  isSource,
  isTarget,
  isTier1GroupNode,
  isStandAloneFacility,
} from './conditions'

const setAllToDark = (graph: GraphType) => {
  graph.getNodes().forEach(node => {
    if (!isCustomer(node)) {
      graph.clearItemStates(node)
      graph.setItemState(node, 'dark', true)
    }
  })
  graph.getEdges().forEach(edge => {
    graph.clearItemStates(edge)
    graph.setItemState(edge, 'dark', true)
  })
}

const setNodeHighlight = (graph: GraphType, node: INode) => {
  graph.clearItemStates(node)
}

const setEdgeHighlight = (graph: GraphType, edge: IEdge) => {
  graph.clearItemStates(edge)
  graph.setItemState(edge, 'highlight', true)
}

const highlightOwnGroup = (graph: GraphType, node: INode) => {
  for (const edge of node.getEdges()) {
    if (isGroup(edge.getTarget())) {
      setEdgeHighlight(graph, edge)
      setNodeHighlight(graph, edge.getTarget())
      return edge.getTarget()
    }
  }
}

const highlightEdgeBetweenTwoNode = (graph: GraphType, node1: INode, node2: INode) => {
  node1.getEdges().forEach(edge => {
    if (isTarget(edge, node2) || isSource(edge, node2)) {
      setEdgeHighlight(graph, edge)
    }
  })
}

const highlightRelatedFacility = (
  graph: GraphType,
  edgeBetweenFacilities: IEdge,
  facilityNode: INode,
  groupNode?: INode,
) => {
  setEdgeHighlight(graph, edgeBetweenFacilities)
  setNodeHighlight(graph, facilityNode)
  const relatedFacilityGroup = highlightOwnGroup(graph, facilityNode)
  if (groupNode && relatedFacilityGroup) {
    highlightEdgeBetweenTwoNode(graph, groupNode, relatedFacilityGroup)
  }
  return relatedFacilityGroup
}

const highlightGroupsUpperTier = (graph: GraphType, group: INode) => {
  group.getEdges().forEach(edge => {
    const tier2RelatedToTier1 = !isTier1GroupNode(group) && isSource(edge, group) && isTier1GroupNode(edge.getTarget())
    const tier1RelatedToTier2 = !isTier1GroupNode(group) && isTarget(edge, group) && isTier1GroupNode(edge.getSource())
    if (tier2RelatedToTier1) {
      setEdgeHighlight(graph, edge)
      setNodeHighlight(graph, edge.getTarget())
      highlightTier1NodeToCustomer(graph, edge.getTarget())
    } else if (tier1RelatedToTier2) {
      setEdgeHighlight(graph, edge)
      setNodeHighlight(graph, edge.getSource())
      highlightTier1NodeToCustomer(graph, edge.getSource())
    } else if (isCustomer(edge.getTarget())) {
      setEdgeHighlight(graph, edge)
    }
  })
}

const highlightTier1NodeToCustomer = (graph: GraphType, node: INode) => {
  node.getEdges().forEach(tier1GroupEdge => {
    if (isCustomer(tier1GroupEdge.getTarget())) {
      setEdgeHighlight(graph, tier1GroupEdge)
    }
  })
}

const highlightNeighborsAndUpperTier = (graph: GraphType, node: INode) => {
  node.getEdges().forEach(edge => {
    if (isSource(edge, node) && isGroup(edge.getTarget())) {
      setEdgeHighlight(graph, edge)
      setNodeHighlight(graph, edge.getTarget())
      if (!isTier1GroupNode(node) && isTier1GroupNode(edge.getTarget())) {
        highlightTier1NodeToCustomer(graph, edge.getTarget())
      }
    } else if (isTarget(edge, node) && isGroup(edge.getSource())) {
      setEdgeHighlight(graph, edge)
      setNodeHighlight(graph, edge.getSource())
    } else if (isCustomer(edge.getTarget())) {
      setEdgeHighlight(graph, edge)
    }
  })
}

const highlightFacility = (graph: GraphType, node: INode) => {
  setNodeHighlight(graph, node)
  const group = highlightOwnGroup(graph, node)
  if (group) {
    highlightGroupsUpperTier(graph, group)
    node.getEdges().forEach(edge => {
      if (isSource(edge, node) && isFacility(edge.getTarget())) {
        highlightRelatedFacility(graph, edge, edge.getTarget(), group)
      } else if (isTarget(edge, node) && isFacility(edge.getSource())) {
        highlightRelatedFacility(graph, edge, edge.getSource(), group)
      }
    })
  }
}

const highlightStandAloneFacility = (graph: GraphType, node: INode) => {
  setNodeHighlight(graph, node)
  highlightEdgeBetweenTwoNode(graph, node, graph.getNodes()[0])
  node.getEdges().forEach(edge => {
    if (isSource(edge, node) && isFacility(edge.getTarget())) {
      const relatedFacilityGroup = highlightRelatedFacility(graph, edge, edge.getTarget())
      highlightGroupsUpperTier(graph, relatedFacilityGroup!)
    } else if (isTarget(edge, node) && isFacility(edge.getSource())) {
      const relatedFacilityGroup = highlightRelatedFacility(graph, edge, edge.getSource())
      highlightGroupsUpperTier(graph, relatedFacilityGroup!)
    }
  })
}

const highlightGroup = (graph: GraphType, node: INode) => {
  highlightNeighborsAndUpperTier(graph, node)
  node.getEdges().forEach(edge => {
    if (isTarget(edge, node) && isFacility(edge.getSource())) {
      highlightFacility(graph, edge.getSource())
      setEdgeHighlight(graph, edge)
    }
  })
}

const highlightFacilityOrGroup = (graph: GraphType, node: INode) => {
  setAllToDark(graph)
  setNodeHighlight(graph, node)
  if (isGroup(node)) {
    highlightGroup(graph, node)
  } else if (isFacility(node)) {
    highlightFacility(graph, node)
  } else if (isStandAloneFacility(node)) {
    highlightStandAloneFacility(graph, node)
  }
}

export const highlight = (graph: GraphType, node: INode | IEdge | ICombo | null) => {
  if (!node || !graph) {
    return
  }

  node.toFront()

  if (!isCustomer(node) && 'getEdges' in node) {
    highlightFacilityOrGroup(graph, node)
  }
}

export const highlightFilteredNodes = (graph: GraphType, filteredSuppliers: CustomerSuppliersResponse[]) => {
  const supplierIdsSet = new Set(map(filteredSuppliers, 'id'))
  graph.getNodes().forEach(node => {
    if (!isCustomer(node)) {
      graph.clearItemStates(node)
      if (!supplierIdsSet.has(node.getModel().id!)) {
        graph.setItemState(node, 'dark', true)
      }
    }
  })
  graph.getEdges().forEach(edge => {
    graph.clearItemStates(edge)
    graph.setItemState(edge, 'dark', true)
  })
}
