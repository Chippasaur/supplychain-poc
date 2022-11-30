import { get } from 'lodash'

import { EntityType } from '../../shared/enum/entityType'
import { findSelectedNode, transformNodesData } from './networkTransform'
import { NodeType } from '../../shared/enum/nodeType'

describe('transformNodesData', () => {
  const customer = {
    logoUri: '/logoUri',
    customerId: 'customerId',
    customerName: 'customerName',
    relations: [
      {
        source: 'facility',
        target: 'group',
      },
      {
        source: 'facility',
        target: 'facility2',
      },
      {
        source: 'facility2',
        target: 'group2',
      },
    ],
  }

  const suppliers = [
    {
      id: 'facility',
      companyName: 'HESHAN TOP EAGLE GARMENT LTD',
      entity: 0,
      tier: 2,
      financialHealth: 1,
      rating: 5,
      riskLevel: 2,
      higgTotalScore: 50,
      category: 3,
      coordinate: { latitude: 22.4, longitude: 112.449997 },
      location: {
        address: 'DISTRICT 3 OF HECHENG INDUSTRIAL PARK',
        postalCode: undefined,
        state: 'GUANGDONG',
        city: 'N ASIA',
        region: 'China Mainland',
      },
      logo: '',
      groupId: 'fake id',
    },
    {
      id: 'facility2',
      companyName: 'facility2',
      entity: 0,
      tier: 2,
      financialHealth: 1,
      rating: 5,
      riskLevel: 2,
      higgTotalScore: 50,
      category: 3,
      coordinate: { latitude: 22.4, longitude: 112.449997 },
      location: {
        address: 'DISTRICT 3 OF HECHENG INDUSTRIAL PARK',
        postalCode: undefined,
        state: 'GUANGDONG',
        city: 'N ASIA',
        region: 'China Mainland',
      },
      logo: '',
      groupId: undefined,
    },
    {
      id: 'group',
      companyName: 'group',
      entity: 1,
      tier: 2,
      financialHealth: 1,
      rating: 5,
      riskLevel: 2,
      higgTotalScore: 50,
      category: 0,
      coordinate: { latitude: 22.4, longitude: 112.449997 },
      location: {
        address: 'DISTRICT 3 OF HECHENG INDUSTRIAL PARK',
        postalCode: undefined,
        state: 'GUANGDONG',
        city: 'N ASIA',
        region: 'China Mainland',
      },
      logo: '',
      groupId: 'fake id',
    },
    {
      id: 'group2',
      companyName: 'group2',
      entity: 1,
      tier: 2,
      financialHealth: 1,
      rating: 5,
      riskLevel: 2,
      higgTotalScore: 50,
      category: 3,
      coordinate: { latitude: 22.4, longitude: 112.449997 },
      location: {
        address: 'DISTRICT 3 OF HECHENG INDUSTRIAL PARK',
        postalCode: undefined,
        state: 'GUANGDONG',
        city: 'N ASIA',
        region: 'China Mainland',
      },
      logo: '',
      groupId: 'fake id',
    },
  ]
  it('transformNodesData should generate data', async () => {
    const data = await transformNodesData(customer, suppliers)

    expect(data.edges).toMatchObject([
      {
        source: 'facility',
        target: 'group',
      },
      {
        source: 'facility',
        target: 'facility2',
        style: { lineDash: [2, 4] },
      },
      {
        source: 'group',
        target: 'group2',
      },
      {
        source: 'facility2',
        target: 'group2',
      },
    ])
    expect(data.nodes).toMatchObject([
      {
        id: 'customerId',
        label: 'customerName',
        nodeType: NodeType.Customer,
        labelCfg: {
          style: {
            fill: '#000000',
            fontSize: 14,
            fontWeight: 600,
          },
          position: 'bottom',
        },
        size: 90,
        icon: {
          height: 54,
          img: 'data:;base64,bW9jayBibG9i',
          show: true,
          width: 54,
        },
        style: { fill: '#fff' },
      },
      {
        id: 'facility',
        cardInfo: suppliers[0],
        nodeType: NodeType.Facility,
        labelCfg: {
          position: 'right',
          style: {
            fontSize: 10,
            fontWeight: 400,
          },
        },
      },
      {
        id: 'facility2',
        cardInfo: suppliers[1],
        nodeType: NodeType.StandAloneFacility,
        labelCfg: {
          position: 'right',
          style: {
            fontSize: 10,
            fontWeight: 400,
          },
        },
      },
      {
        id: 'group',
        cardInfo: suppliers[2],
        nodeType: NodeType.Tier1Group,
        labelCfg: {
          position: 'bottom',
          style: {
            fontSize: 12,
            fontWeight: 500,
          },
        },
      },
      {
        id: 'group2',
        cardInfo: suppliers[3],
        nodeType: NodeType.Tier2Group,
        labelCfg: {
          position: 'bottom',
          style: {
            fontSize: 12,
            fontWeight: 500,
          },
        },
      },
    ])
  })
})

describe('find selected node', () => {
  it('should be able to find group node rather than facility node if two results appears', async () => {
    const nodes = [
      {
        getModel: () => ({
          fullName: 'fake name',
          cardInfo: {
            entity: EntityType.Facility,
          },
        }),
      },
      {
        getModel: () => ({
          fullName: 'fake name',
          cardInfo: {
            entity: EntityType.Group,
          },
        }),
      },
    ]
    const name = 'fake name'

    const selectedNode = findSelectedNode(nodes, name)

    expect(get(selectedNode.getModel(), 'cardInfo.entity')).toEqual(EntityType.Group)
  })
})
