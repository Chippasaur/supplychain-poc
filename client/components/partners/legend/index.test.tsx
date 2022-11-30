import { render, screen } from '@testing-library/react'
import React from 'react'

import Legend from './index'
import { LEGENDS, MAP_EXTRA_LEGENDS } from './legends'

describe('Legend', () => {
  it('should show all category legends', () => {
    render(<Legend legends={Object.values(LEGENDS)} />)
    expect(screen.getByText('Manufacturer')).toBeInTheDocument()
    expect(screen.getByText('Fabric supplier')).toBeInTheDocument()
    expect(screen.getByText('Raw material supplier')).toBeInTheDocument()
    expect(screen.getByText('Trims & accessories supplier')).toBeInTheDocument()
    expect(screen.getByText('Print, wash or dye house')).toBeInTheDocument()
    expect(screen.getByText('Other')).toBeInTheDocument()
    expect(screen.getByText('Unknown entity')).toBeInTheDocument()
  })

  it('should show all legends', () => {
    render(<Legend legends={[...Object.values(LEGENDS), ...Object.values(MAP_EXTRA_LEGENDS)]} />)
    expect(screen.getByText('Manufacturer')).toBeInTheDocument()
    expect(screen.getByText('Fabric supplier')).toBeInTheDocument()
    expect(screen.getByText('Raw material supplier')).toBeInTheDocument()
    expect(screen.getByText('Trims & accessories supplier')).toBeInTheDocument()
    expect(screen.getByText('Print, wash or dye house')).toBeInTheDocument()
    expect(screen.getByText('Other')).toBeInTheDocument()
    expect(screen.getByText('Unknown entity')).toBeInTheDocument()
    expect(screen.getByText('High risk or above')).toBeInTheDocument()
    expect(screen.getByText('Port')).toBeInTheDocument()
    expect(screen.getByText('Airport')).toBeInTheDocument()
  })
})
