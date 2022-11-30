import { NodeConfig } from '@antv/g6-core'
import { EdgeConfig, GraphData } from '@antv/g6-core/lib/types'
import { find, get, truncate, filter, isString, isEmpty } from 'lodash'

import { NodeType } from '../../shared/enum/nodeType'
import { DAndBLevel } from '../../shared/enum/dAndBLevel'
import { EntityType } from '../../shared/enum/entityType'
import { SupplierCategory } from '../../shared/enum/category'
import { LEGENDS } from '../components/partners/legend/legends'
import { CustomerSuppliersResponse } from '../../shared/response'
import { DefaultGraphConfig } from '../components/partners/network/graph/config'

const groupNodeSize = 28
const facilityNodeSize = 12
const facilityToFacilityEdgeStyle = { lineDash: [2, 4] }
const facilityToCustomerEdgeStyle = { opacity: 0.3, lineDash: [2, 4] }
const groupToCustomerEdgeStyle = { opacity: 0.3 }

type Range = 0 | 1 | 2 | 3 | 4 | 5 | 6

const getNodeParams = (
  entity: EntityType,
  category: SupplierCategory,
  groupId: string | undefined,
): [number, NodeType, string, number, number] => {
  const isGroup = entity === EntityType.Group
  const isFacility = entity === EntityType.Facility
  const isTier1 = category === SupplierCategory.Manufacturer
  const isTier2 = category !== SupplierCategory.Manufacturer
  if (isGroup && isTier1) {
    return [groupNodeSize, NodeType.Tier1Group, 'bottom', 12, 500]
  }
  if (isGroup && isTier2) {
    return [groupNodeSize, NodeType.Tier2Group, 'bottom', 12, 500]
  }
  if (isFacility && isEmpty(groupId)) {
    return [facilityNodeSize, NodeType.StandAloneFacility, 'right', 10, 400]
  }
  return [facilityNodeSize, NodeType.Facility, 'right', 10, 400]
}

function generateInfoNode(supplier: CustomerSuppliersResponse) {
  const { id, companyName, riskLevel, category, entity, groupId } = supplier
  const [size, nodeType, position, fontSize, fontWeight] = getNodeParams(entity, category, groupId)
  const isDangerous = riskLevel === DAndBLevel.Severe || riskLevel === DAndBLevel.High
  const fill = isDangerous ? DefaultGraphConfig.dangerLabelColor : DefaultGraphConfig.labelColor

  return {
    id,
    size,
    nodeType,
    label: truncate(companyName, { length: 15 }),
    fullName: companyName,
    cardInfo: supplier,
    style: {
      fill:
        category <= SupplierCategory.UnknownEntity ? LEGENDS[category as Range].color : DefaultGraphConfig.nodeColor,
    },
    labelCfg: {
      position,
      style: {
        fill,
        fontSize: fontSize,
        fontWeight: fontWeight,
      },
    },
  }
}

function transformImageURIToBse64(uri: string): Promise<string> {
  return new Promise(resolve => {
    fetch(uri)
      .then(res => {
        res.blob().then(blob => {
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            resolve(isString(reader.result) ? reader.result : uri)
          }
          reader.onerror = () => {
            resolve(uri)
          }
        })
      })
      .catch(() => resolve(uri))
  })
}

function findGroup(relations: any, source: CustomerSuppliersResponse, suppliers: Array<CustomerSuppliersResponse>) {
  return find(
    relations,
    relation => relation.source === source.id && find(suppliers, { id: relation.target })?.entity === EntityType.Group,
  )?.target
}

function bothAreFacility(source: CustomerSuppliersResponse | undefined, target: CustomerSuppliersResponse | undefined) {
  return source?.entity === EntityType.Facility && target?.entity === EntityType.Facility
}

export const transformNodesData = async (
  customer: any,
  suppliers: Array<CustomerSuppliersResponse>,
): Promise<GraphData> => {
  const { logoUri, customerId, customerName, relations } = customer

  const url = await transformImageURIToBse64(logoUri)
  const nodes: Array<NodeConfig> = []
  let edges: Array<EdgeConfig> = []

  for (const supplier of suppliers) {
    nodes.push(generateInfoNode(supplier))
  }
  for (const relation of relations) {
    const source = find(suppliers, { id: relation.source })
    const target = find(suppliers, { id: relation.target })
    if (!relation.source || !relation.target) {
      continue
    }
    if (source && target && bothAreFacility(source, target)) {
      const sourceGroupId = findGroup(relations, source, suppliers)
      const targetGroupId = findGroup(relations, target, suppliers)
      sourceGroupId && targetGroupId
        ? edges.push(
            { ...relation, style: facilityToFacilityEdgeStyle },
            { source: sourceGroupId, target: targetGroupId },
          )
        : edges.push({ ...relation, style: facilityToFacilityEdgeStyle })
    } else if (source && relation.target === customerId && source.entity === EntityType.Facility) {
      edges.push({ ...relation, style: facilityToCustomerEdgeStyle })
    } else if (relation.target === customerId) {
      edges.push({ ...relation, style: groupToCustomerEdgeStyle })
    } else {
      edges.push(relation)
    }
  }
  edges = Array.from(new Set(edges))

  return {
    nodes: [
      {
        id: customerId,
        label: customerName,
        size: 90,
        x: 425,
        y: 300,
        icon: {
          show: true,
          img: url,
          width: 54,
          height: 54,
        },
        labelCfg: {
          style: {
            fill: '#000000',
            fontSize: 14,
            fontWeight: 600,
          },
          position: 'bottom',
        },
        style: {
          fill: '#fff',
          lineWidth: 1,
          stroke: '#ebebeb',
        },
        nodeType: NodeType.Customer,
      },
      ...nodes,
    ],
    edges,
  }
}

export const findSelectedNode = (nodes: any[], name: string) => {
  const selectedNodes = filter(nodes, node => node.getModel().fullName === name)

  if (selectedNodes.length === 2) {
    return find(selectedNodes, node => get(node.getModel(), 'cardInfo.entity') === EntityType.Group)
  }

  return selectedNodes[0]
}
