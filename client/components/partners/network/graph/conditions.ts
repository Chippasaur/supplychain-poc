import { IEdge, INode } from '@antv/g6'

import { NodeType } from '../../../../../shared/enum/nodeType'
import { Mode } from '../../../../utils/network/modeCondition'

export const isNode = (node: any) => {
  return 'getEdges' in node
}

export const isCustomer = (node: any) => {
  if (isNode(node)) {
    return node.getModel().nodeType === NodeType.Customer
  }
  return node?.nodeType === NodeType.Customer
}

export const isGroup = (node: any) => {
  if (isNode(node)) {
    return node.getModel().nodeType === NodeType.Tier2Group || node.getModel().nodeType === NodeType.Tier1Group
  }
  return node?.nodeType === NodeType.Tier2Group || node.nodeType === NodeType.Tier1Group
}

export const isFacility = (node: any) => {
  if (isNode(node)) {
    return node.getModel().nodeType === NodeType.Facility
  }
  return node?.nodeType === NodeType.Facility
}

export const isStandAloneFacility = (node: any) => {
  if (isNode(node)) {
    return node.getModel().nodeType === NodeType.StandAloneFacility
  }
  return node?.nodeType === NodeType.StandAloneFacility
}

export const isTier1GroupNode = (node: any) => {
  if (isNode(node)) {
    return node.getModel().nodeType === NodeType.Tier1Group
  }
  return node?.nodeType === NodeType.Tier1Group
}

export const isTarget = (edge: IEdge, node: INode) => {
  return edge.getTarget() === node
}

export const isSource = (edge: IEdge, node: INode) => {
  return edge.getSource() === node
}

export const isSearchMode = (mode: Mode) => mode === Mode.SEARCH

export const isFilterMode = (mode: Mode) => mode === Mode.FILTER

export const isFreeMode = (mode: Mode) => mode === Mode.FREE

export const isHighlighted = (node: any) => {
  if (isNode(node)) {
    return node.getStates().indexOf('dark') === -1
  }
  return false
}
