import { makeStyles } from '@material-ui/styles'

export const useStyle = (size: string, multiLines: boolean | undefined, style: any) =>
  makeStyles({
    input: {
      height: size === 'large' ? 22 : 16,
      fontSize: 12,
    },
    inputRoot: {
      padding: 0,
      '&&[class*="MuiOutlinedInput-root"]': {
        padding: '6px 8px',
      },
      '&&[class*="MuiOutlinedInput-root"] $input': {
        padding: 0,
        'min-width': 0,
      },
      '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #000',
      },
      '&&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-endAdornment': {
        right: '2px',
      },
      flexWrap: multiLines ? 'wrap' : 'nowrap',
    },
    outlinedInput: {
      backgroundColor: style?.backgroundColor || 'rgba(245, 245, 245, 0.6)',
    },
    clearIndicator: {
      padding: 3,
    },
    option: {
      fontSize: 12,
      fontWeight: 400,
      color: '#3E4545',
      '&&[aria-selected="true"]': {
        backgroundColor: '#E5F9FF',
      },
    },
    endAdornment: {
      height: 28,
      lineHeight: '28px',
    },
    popupIndicatorOpen: {
      marginBottom: 4,
    },
    listbox: {
      maxHeight: 200,
    },
  })()
