import { NodeType } from '../../../../../shared/enum/nodeType'
import { isNode, isGroup, isFacility, isTier1GroupNode, isCustomer, isHighlighted } from './conditions'

describe('node type conditions', () => {
  const customerNode = { nodeType: NodeType.Customer }
  const customerNodeINode = {
    getEdges: () => {
      return null
    },
    getModel: () => {
      return customerNode
    },
    getStates: () => {
      return ['dark']
    },
  }

  const highlightedCustomerNodeINode = {
    ...customerNodeINode,
    getStates: () => {
      return []
    },
  }

  describe('node type conditions', () => {
    it('should correct when not INode', () => {
      expect(isNode(customerNode)).toBeFalsy()
      expect(isGroup(customerNode)).toBeFalsy()
      expect(isFacility(customerNode)).toBeFalsy()
      expect(isTier1GroupNode(customerNode)).toBeFalsy()
      expect(isCustomer(customerNode)).toBeTruthy()
    })

    it('should correct when is INode', () => {
      expect(isNode(customerNodeINode)).toBeTruthy()
      expect(isGroup(customerNodeINode)).toBeFalsy()
      expect(isFacility(customerNodeINode)).toBeFalsy()
      expect(isTier1GroupNode(customerNodeINode)).toBeFalsy()
      expect(isCustomer(customerNodeINode)).toBeTruthy()
    })
  })

  describe('node state condition', () => {
    it('should not be highlighted when node has dark state', () => {
      expect(isHighlighted(customerNodeINode)).toBeFalsy()
    })
    it('should be highlighted when node has no state', () => {
      expect(isHighlighted(highlightedCustomerNodeINode)).toBeTruthy()
    })
  })
})
