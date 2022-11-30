import { createStyles, Theme, withStyles } from '@material-ui/core/styles'
import React from 'react'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'

export const CustomizedCheckbox = withStyles({
  root: {
    top: -4,
    '& svg': {
      width: 12,
      height: 12,
      backgroundColor: 'transparent',
      border: `1px solid #C4C4C4`,
      borderRadius: 3,
    },
    '& svg path': {
      display: 'none',
    },
  },
  checked: {
    '& :not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#008DB3',
      borderColor: '#008DB3',
    },
    '& .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '48%',
      left: '37%',
      width: 2.8,
      height: 6.5,
    },
  },
})((props: CheckboxProps) => <Checkbox color="default" {...props} />)
