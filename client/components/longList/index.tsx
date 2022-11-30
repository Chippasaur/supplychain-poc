import React, { ComponentType, MouseEventHandler, SyntheticEvent, useCallback, useEffect, useRef } from 'react'
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps, ListOnItemsRenderedProps } from 'react-window'
import { isNil, get } from 'lodash'

type Props = Omit<FixedSizeListProps, 'children'> & {
  Row: ComponentType<RowPropsType>
  onItemClick?: onItemClick
  activeClassName?: string
  activeIndex?: number
}

type onItemClick = (data: any) => void
export type RowPropsType = ListChildComponentProps

const LongList = ({ Row, activeIndex, activeClassName, onItemClick, ...rest }: Props) => {
  const listRef = useRef<HTMLElement | null>(null)

  const setActive = useCallback(
    activeIndex => {
      const element = listRef.current?.querySelector(`[data-index="${activeIndex}"]`)
      if (!activeClassName || !element) {
        return
      }
      const pre = listRef.current?.querySelector(`.${activeClassName}`)
      if (pre) {
        pre.classList.remove(activeClassName)
      }
      element?.classList?.add(activeClassName)
    },
    [activeClassName],
  )

  const onClick: MouseEventHandler = useCallback(
    (e: SyntheticEvent) => {
      if (!onItemClick) {
        return null
      }
      const element = e.target
      const index = get(element, 'dataset.index')
      !isNil(index) && onItemClick(index)
    },
    [activeClassName, onItemClick],
  )
  const onItemsRendered = useCallback(
    ({ overscanStartIndex, overscanStopIndex }: ListOnItemsRenderedProps) => {
      if (isNil(activeIndex) || activeIndex < overscanStartIndex || activeIndex > overscanStopIndex) {
        return
      }
      setActive(activeIndex)
    },
    [activeIndex],
  )

  useEffect(() => {
    setActive(activeIndex)
  }, [activeIndex])

  return (
    <div onClick={onClick}>
      <FixedSizeList {...rest} onItemsRendered={onItemsRendered} innerRef={listRef}>
        {Row}
      </FixedSizeList>
    </div>
  )
}
export default LongList
