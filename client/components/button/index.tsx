import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const SecondaryButton = withStyles({
  root: {
    border: '1px solid #0f81ac',
    color: '#0f81ac',
    fontWeight: 500,
    fontSize: 16,
    padding: '5px 18px',
  },
})(Button)

const SelectionButton = withStyles({
  root: {
    border: '1px solid #231F20',
    color: '#231F20',
    borderRadius: 2,
    fontWeight: 800,
    fontSize: 12,
    width: 'calc(100% - 20px)',
    margin: '0 10px 10px',
  },
})(Button)

const BaseButton = withStyles({
  root: {
    border: '1px solid #231F20',
    color: '#231F20',
    fontWeight: 500,
    fontSize: '16px',
    padding: '5px 40px',
  },
})(Button)

const CustomizeButton = ({ role, ...props }: any) => {
  if (role === 'secondary') {
    return <SecondaryButton {...props} />
  }
  if (role === 'selection') {
    return <SelectionButton {...props} />
  }
  return <BaseButton {...props} />
}

export default CustomizeButton
