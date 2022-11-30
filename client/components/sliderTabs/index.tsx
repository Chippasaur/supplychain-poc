import React, { useEffect, useState } from 'react'
import { isFunction } from 'lodash'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Badge from '@material-ui/core/Badge'
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'

const StyledBadge = withStyles(() =>
  createStyles({
    badge: {
      top: '10px',
      padding: '8px 3px',
      backgroundColor: '#eb5f2c',
      borderRadius: '60%',
      zIndex: 1,
    },
    root: {
      '&:not(:nth-child(1))': {
        marginLeft: '12px',
      },
    },
  }),
)(Badge)

export interface TabsProps {
  tabIndex: number
  indicatorColor?: string
  children: React.ReactNode
  onChange: (event: React.ChangeEvent<any>, newTabIndex: number) => void
  className?: string
}

export const TabCustomized = withStyles({
  root: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#767676',
    minWidth: 63,
  },
  selected: {
    fontWeight: 600,
    color: '#3E4545',
  },
})(Tab)

export interface TabProps {
  badgeContent?: number | string
  label?: string
  disabled?: boolean
}

export const SliderTab = ({ badgeContent, disabled, ...props }: TabProps) => {
  return (
    <StyledBadge badgeContent={badgeContent} color="secondary">
      <TabCustomized {...props} disabled={disabled} />
    </StyledBadge>
  )
}

export const StyledTab = withStyles({
  root: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#231F20',
  },
  selected: {
    fontWeight: 600,
    color: '#066184',
  },
  textColorInherit: {
    opacity: 1,
  },
})(Tab)

const SliderTabs = (props: TabsProps) => {
  const { tabIndex, indicatorColor, onChange, children, className } = props
  const [currentTabIndex, setCurrentTabIndex] = useState(tabIndex)

  useEffect(() => {
    setCurrentTabIndex(tabIndex)
  }, [tabIndex])

  const handleOnChange = (event: React.ChangeEvent<any>, newTabIndex: number) => {
    setCurrentTabIndex(newTabIndex)
    isFunction(onChange) && onChange(event, newTabIndex)
  }

  const useStyle = makeStyles({
    indicator: {
      backgroundColor: `${indicatorColor || '#EB5F2C'}`,
    },
  })

  return (
    <Tabs value={currentTabIndex} onChange={handleOnChange} classes={useStyle()} className={className}>
      {children}
    </Tabs>
  )
}

export default SliderTabs
