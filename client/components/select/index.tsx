import cls from 'classnames'
import Popper from '@material-ui/core/Popper'
import TextField from '@material-ui/core/TextField'
import React, { CSSProperties, useState } from 'react'
import { get, isEmpty, isFunction, some } from 'lodash'
import Autocomplete from '@material-ui/lab/Autocomplete'
import InputAdornment from '@material-ui/core/InputAdornment'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import {
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
} from '@material-ui/lab/Autocomplete/Autocomplete'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

import Button from '../button'
import styles from './index.module.scss'
import { useStyle } from './materialInputStyle'

export interface SelectProps {
  size?: 'large' | 'small'
  options: string[]
  classnames?: string
  multiple?: boolean
  multiLines?: boolean
  popupIcon?: React.ReactNode
  style?: CSSProperties
  textFieldVariant?: 'standard' | 'filled' | 'outlined'
  onChange?: (event: React.ChangeEvent<any> | undefined, value: string | string[] | null) => void
  value: string | string[] | null
  placeholder?: string
  renderDefaultTags?: boolean
  displayClearIcon?: boolean
  icon?: React.ReactNode
}

export default function Select(props: SelectProps) {
  const {
    size = 'small',
    options,
    multiple,
    multiLines,
    classnames,
    popupIcon,
    style,
    textFieldVariant,
    onChange,
    value,
    placeholder,
    renderDefaultTags,
    displayClearIcon,
    icon,
  } = props
  const classes = useStyle(size, multiLines, style)
  const [open, setOpen] = useState(false)
  const refSelect = React.useRef()

  const TextFieldCustomIcon = (params: AutocompleteRenderInputParams) => {
    return icon ? (
      <TextField
        {...params}
        onClick={() => setOpen(true)}
        autoFocus={open}
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <>
              <InputAdornment position="start">{icon}</InputAdornment>
              {params.InputProps.startAdornment}
            </>
          ),
        }}
        variant={textFieldVariant}
        placeholder={isEmpty(value) ? placeholder : ''}
      />
    ) : (
      <TextField
        {...params}
        autoFocus={open}
        onClick={() => setOpen(true)}
        variant={textFieldVariant}
        placeholder={isEmpty(value) ? placeholder : ''}
      />
    )
  }

  const OptionsBox = (props: React.HTMLAttributes<HTMLElement>) => (
    <div {...props} className={styles.selectBox}>
      {props.children}
      {multiple && !renderDefaultTags && (
        <Button
          role="selection"
          onClick={() => {
            isFunction(onChange) && onChange(undefined, [])
            setOpen(false)
          }}>
          Clear
        </Button>
      )}
    </div>
  )

  const Option = (option: string, { selected }: AutocompleteRenderOptionState) => (
    <div className={styles.optionContainer}>
      <div>{option}</div>
      {multiple && selected && <CheckIcon fontSize={'small'} />}
    </div>
  )

  const renderTags = renderDefaultTags
    ? undefined
    : (option: string[]) => <div className={styles.tag}>{option.join(',')}</div>
  const tagOptions = { renderTags }

  const handleChange = (event: React.ChangeEvent<any>, newValue: string | string[] | null) => {
    isFunction(onChange) && onChange(event, newValue)
  }

  const handleClickAway = (event: React.MouseEvent<Document>) => {
    if (multiple && some(get(event, 'path'), { className: 'MuiAutocomplete-popper' })) {
      return
    }
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Autocomplete
        ref={refSelect}
        value={value}
        options={options}
        className={classnames}
        open={open}
        classes={{
          input: classes.input,
          inputRoot: cls(classes.inputRoot, { [classes.outlinedInput]: textFieldVariant === 'outlined' }),
          clearIndicator: classes.clearIndicator,
          option: classes.option,
          endAdornment: classes.endAdornment,
          popupIndicatorOpen: classes.popupIndicatorOpen,
          listbox: classes.listbox,
        }}
        multiple={multiple}
        disableListWrap
        closeIcon={displayClearIcon ? <CloseIcon fontSize={'small'} /> : null}
        style={style}
        popupIcon={popupIcon}
        renderInput={params => <TextFieldCustomIcon {...params} />}
        onChange={handleChange}
        noOptionsText={null}
        PopperComponent={props => (
          <Popper {...props} placement={'bottom-start'} disablePortal anchorEl={refSelect.current} />
        )}
        PaperComponent={OptionsBox}
        renderOption={Option}
        disableCloseOnSelect={multiple}
        {...tagOptions}
      />
    </ClickAwayListener>
  )
}
