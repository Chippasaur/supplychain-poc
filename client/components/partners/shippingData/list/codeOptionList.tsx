import React, { useCallback, useEffect, useMemo, useState } from 'react'
import cls from 'classnames'
import { chain, map, isEmpty } from 'lodash'
import { ListChildComponentProps } from 'react-window'

import LongList, { RowPropsType } from '../../../longList'
import styles from './index.module.scss'
import ShipmentListItem from './shipmentListItem'
import { ShipmentRecord } from '../../../../../shared/response'
import HoverWithInfo from '../../../hoverWithInfo'

const CodeShipmentListItem = (props: ListChildComponentProps) => {
  const { index, data } = props

  const { title } = data[index]

  return (
    <ShipmentListItem {...props}>
      <div className={cls(styles.codeResultColumn1)}>
        <HoverWithInfo info={title}>
          <div className={styles.title}>{title}</div>
        </HoverWithInfo>
      </div>
    </ShipmentListItem>
  )
}

function CodeOptionItem(props: RowPropsType) {
  const { index, style, data } = props
  const { hsCode, hsDescription } = data[index]
  return (
    <HoverWithInfo info={hsDescription} style={style} index={index} key={index}>
      <div data-index={index} className={cls(styles.option)}>
        {hsCode} {hsDescription}
      </div>
    </HoverWithInfo>
  )
}

interface Props {
  data: Array<ShipmentRecord>
}
const CodeOptionList = ({ data }: Props) => {
  const [HSCodeIndex, setHSCodeIndex] = useState<number>(-1)

  useEffect(() => {
    if (!isEmpty(data)) {
      setHSCodeIndex(0)
    }
  }, [data])

  const hsData = useMemo(() => {
    return chain(data)
      .groupBy('hsCode')
      .map((v, k) => ({
        hsCode: k,
        hsDescription: v[0].hsDescription,
        buyerList: map(v, ({ buyer, volume, value }) => ({ title: buyer, volume, value })),
      }))
      .value()
  }, [data])

  const filterData = useMemo(() => {
    return HSCodeIndex >= 0 ? hsData[HSCodeIndex].buyerList : []
  }, [HSCodeIndex])

  const onSelect = useCallback(index => {
    setHSCodeIndex(index)
  }, [])

  const getCodeKey = useCallback((index: number, dataSet: any) => dataSet[index].hsCode, [])
  const getBuyerKey = useCallback((index: number, dataSet: any) => dataSet[index].title, [])

  return (
    <>
      <div className={styles.codeOptions}>
        <div className={styles.des}>
          <span>HS Code / Description</span>
        </div>
        <LongList
          height={400}
          width={'100%'}
          itemSize={46}
          itemCount={hsData.length}
          itemData={hsData}
          Row={CodeOptionItem}
          onItemClick={onSelect}
          activeClassName={styles.optionActive}
          activeIndex={HSCodeIndex}
          itemKey={getCodeKey}
        />
      </div>
      <div className={styles.spreadOut}>
        <div className={styles.des}>
          <span className={styles.codeResultColumn1}>buyers</span>
          <span>Shipping data of buyers</span>
        </div>
        <LongList
          height={400}
          width={'100%'}
          itemSize={46}
          itemCount={filterData.length}
          Row={CodeShipmentListItem}
          itemData={filterData}
          itemKey={getBuyerKey}
        />
      </div>
    </>
  )
}
export default CodeOptionList
