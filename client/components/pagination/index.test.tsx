import { render, fireEvent } from '@testing-library/react'

import Pagination from './index'

describe('Pagination', () => {
  it('should render page count', () => {
    const onChangePage = jest.fn()
    const { container } = render(<Pagination count={100} onChangePage={onChangePage} page={0} rowsPerPage={10} />)
    expect(container.querySelector('span')?.textContent).toBe('1-10 of 100')
  })

  it('should render page count when page is last page', () => {
    const onChangePage = jest.fn()
    const { container } = render(<Pagination count={97} onChangePage={onChangePage} page={0} rowsPerPage={10} />)
    expect(container.querySelector('span')?.textContent).toBe('1-10 of 97')
  })

  it('should not call onChangePage when click prev button and page is 0', () => {
    const onChangePage = jest.fn()
    const { container } = render(<Pagination count={100} onChangePage={onChangePage} page={0} rowsPerPage={10} />)
    fireEvent.click(container.querySelectorAll('.pageAction')[0])
    expect(onChangePage).not.toBeCalled()
  })

  it('should not call onChangePage when click prev button and page is 10', () => {
    const onChangePage = jest.fn()
    const { container } = render(<Pagination count={100} onChangePage={onChangePage} page={10} rowsPerPage={10} />)
    fireEvent.click(container.querySelectorAll('.pageAction')[1])
    expect(onChangePage).not.toBeCalled()
  })

  it('should call onChangePage when click prev button and page is not 0', () => {
    const onChangePage = jest.fn()
    const { container } = render(<Pagination count={100} onChangePage={onChangePage} page={10} rowsPerPage={10} />)
    fireEvent.click(container.querySelectorAll('.pageAction')[0])
    expect(onChangePage).toBeCalledTimes(1)
  })

  it('should not call onChangePage when click prev button and page is not 10', () => {
    const onChangePage = jest.fn()
    const { container } = render(<Pagination count={100} onChangePage={onChangePage} page={0} rowsPerPage={10} />)
    fireEvent.click(container.querySelectorAll('.pageAction')[1])
    expect(onChangePage).toBeCalledTimes(1)
  })
})
