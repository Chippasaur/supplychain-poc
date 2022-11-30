import { withStyles } from '@material-ui/styles'
import { Slider } from '@material-ui/core'

export const CustomSlider = withStyles({
  root: {
    color: '#4BBCCE',
    height: 5,
  },
  thumb: {
    height: 8,
    width: 8,
    backgroundColor: '#ffffff',
    border: '2px solid currentColor',
    marginTop: -3,
    marginLeft: -2,
    '&:focus, &:hover': {
      boxShadow: '0 0 0px 5px rgba(75,188,206,0.2)',
      zIndex: 1,
    },
  },
  valueLabel: {
    left: '-14px',
    top: '-23px',
    '& > span': {
      width: 32,
      height: 24,
      transform: 'rotate(0deg)',
      borderRadius: 4,
      backgroundColor: '#000000',
      opacity: 0.4,
    },

    '& span > span': {
      transform: 'rotate(0deg)',
    },
  },
  track: {
    height: 2,
    borderRadius: 4,
  },
  rail: {
    height: 2,
    borderRadius: 4,
    color: '#DBDBDB',
  },
})(Slider)
