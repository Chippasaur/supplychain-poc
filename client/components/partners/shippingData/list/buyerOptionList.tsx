import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { chain, isEmpty, map } from 'lodash'
import cls from 'classnames'
import { ListChildComponentProps } from 'react-window'

import styles from './index.module.scss'
import LongList, { RowPropsType } from '../../../longList'
import ShipmentListItem from './shipmentListItem'
import HoverWithInfo from '../../../hoverWithInfo'

function BuyerOptionItem(props: RowPropsType) {
  const { index, style, data } = props
  const { buyer } = data[index]
  return (
    <HoverWithInfo info={buyer} style={style} key={index}>
      <div className={cls(styles.option)} data-index={index}>
        {buyer}
      </div>
    </HoverWithInfo>
  )
}

const BuyerShipmentListItem = (props: ListChildComponentProps) => {
  const { index, data } = props

  const { title } = data[index]

  return (
    <ShipmentListItem {...props}>
      <div className={cls(styles.buyerResultColumn1)}>
        <HoverWithInfo info={title}>
          <div className={styles.title}>{title}</div>
        </HoverWithInfo>
      </div>
    </ShipmentListItem>
  )
}
interface Props {
  data: Array<any>
}

const BuyerOptionList = ({ data }: Props) => {
  const [buyerIndex, setBuyerIndex] = useState<number>(-1)

  useEffect(() => {
    if (!isEmpty(data)) {
      setBuyerIndex(0)
    }
  }, [data])

  const buyerData = useMemo(() => {
    return chain(data)
      .groupBy('buyerCompanyCode')
      .map(buyers => ({
        buyer: buyers[0].buyer,
        hsCodeList: map(buyers, ({ hsCode, volume, hsDescription, value }) => ({
          title: `${hsCode} - ${hsDescription}`,
          volume,
          value,
        })),
      }))
      .sortBy(item => item.buyer)
      .value()
  }, [data])

  const filterData = useMemo(() => {
    return buyerIndex >= 0 ? buyerData[buyerIndex].hsCodeList : []
  }, [buyerIndex])

  const onSelect = useCallback(index => {
    setBuyerIndex(index)
  }, [])

  return (
    <>
      <div className={styles.buyerOptions}>
        <div className={styles.des}>
          <span>Other buyers</span>
        </div>
        <LongList
          height={400}
          width={'100%'}
          itemSize={46}
          itemCount={buyerData.length}
          itemData={buyerData}
          Row={BuyerOptionItem}
          onItemClick={onSelect}
          activeClassName={styles.optionActive}
          activeIndex={buyerIndex}
        />
      </div>
      <div className={styles.spreadOut}>
        <div className={styles.des}>
          <span className={styles.buyerResultColumn1}>HS Code/description</span>
          <span>Shipping data of buyers</span>
        </div>
        <LongList
          height={400}
          width={'100%'}
          itemSize={46}
          itemCount={filterData.length}
          Row={BuyerShipmentListItem}
          itemData={filterData}
        />
      </div>
    </>
  )
}
export default BuyerOptionList
