import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import '@testing-library/jest-dom/extend-expect'

window.URL.createObjectURL = () => {
  return undefined
}

configure({
  adapter: new Adapter(),
})

global.fetch = jest.fn(() =>
  Promise.resolve({
    blob: () => Promise.resolve(new Blob(['mock blob'])),
  }),
)

global.document.createRange = () => ({
  setStart: () => jest.fn(),
  setEnd: () => jest.fn(),
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})
