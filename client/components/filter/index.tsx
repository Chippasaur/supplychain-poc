import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { isFunction } from 'lodash'

import styles from './index.module.scss'
import Icon from '../icon'

export interface Level {
  [key: string]: any
}

interface Props {
  level: string
  levels: Level
  levelEnum?: any
  onClick: (event: any) => void
  onClose: (event: any) => void
  anchorEl: Element | null
  style?: string
  maxHeight?: number
}

const Filter = (props: Props) => {
  const { level, levels, levelEnum, onClick, onClose, anchorEl, style, maxHeight = 160 } = props

  const handleOnClick = (event: any) => {
    isFunction(onClick) && onClick(event)
  }

  const handleOnClose = (event: any) => {
    isFunction(onClose) && onClose(event)
  }

  const enumConverter = (levelEnum: any) => {
    const results = []
    for (const key in levelEnum) {
      results.push(levelEnum[key])
    }
    return results
  }

  const renderMenuItems = () => {
    if (levelEnum) {
      return enumConverter(levelEnum).map(item => (
        <MenuItem key={item} onClick={handleOnClose} data-value={item}>
          {levels[item]}
        </MenuItem>
      ))
    }
    return levels.map((item: string) => (
      <MenuItem key={item} onClick={handleOnClose} data-value={item}>
        {item}
      </MenuItem>
    ))
  }

  return (
    <div className={style}>
      <Button aria-controls="level-filter" aria-haspopup="true" onClick={handleOnClick} className={styles.filter}>
        {levelEnum ? levels[level] : level}
        <Icon type={Boolean(anchorEl) ? 'arrow-open' : 'arrow-collapse'} className={styles.icon} />
      </Button>
      <Menu
        id="level-filter"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleOnClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          style: {
            maxHeight: maxHeight,
          },
        }}>
        {renderMenuItems()}
      </Menu>
    </div>
  )
}

export default Filter
