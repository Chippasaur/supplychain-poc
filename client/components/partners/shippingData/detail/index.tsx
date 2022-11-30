import React, { useCallback, useEffect, useMemo, useState } from 'react'
import cls from 'classnames'
import { get, chain, isEmpty, isFunction, some } from 'lodash'

import Icon from '../../../icon'
import Button from '../../../button'
import Select from '../../../select'
import styles from './index.module.scss'
import CodeOptionList from '../list/codeOptionList'
import BuyerOptionList from '../list/buyerOptionList'
import { ShipmentRecord } from '../../../../../shared/response'

enum TabIndex {
  Code,
  Buyer,
}

interface Props {
  shipmentRecords: Array<ShipmentRecord>
}
const Detail = ({ shipmentRecords }: Props) => {
  const [tabIndex, setTabIndex] = useState(TabIndex.Code)
  const [recordsFiltered, setRecordsFiltered] = useState<Array<ShipmentRecord>>([])
  const [codes, setCodes] = useState<Array<string>>([])
  const onConfirmCodeSelect = useCallback((event, value) => {
    setCodes(value)
  }, [])
  const onTabSelect = useCallback(index => {
    setTabIndex(index)
  }, [])
  const onReset = useCallback(() => {
    setCodes([])
  }, [])

  const hsCodeList = useMemo(
    () =>
      isEmpty(shipmentRecords)
        ? []
        : chain(shipmentRecords)
            .uniqBy('hsCode')
            .map(({ hsCode, hsDescription }) => `${hsCode} - ${hsDescription}`)
            .value(),
    [shipmentRecords],
  )
  const selectStyle = useMemo(() => ({ width: 350, backgroundColor: '#fff' }), [])

  useEffect(() => {
    if (isEmpty(shipmentRecords)) {
      return
    }
    if (isEmpty(codes)) {
      setRecordsFiltered(shipmentRecords)
    } else {
      const re = chain(shipmentRecords)
        .filter(({ hsCode }) => some(codes, code => code.startsWith(hsCode)))
        .value()
      setRecordsFiltered(re)
    }
  }, [shipmentRecords, codes])

  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <h3>Shipping details</h3>
        <Select
          size="large"
          value={codes}
          options={hsCodeList}
          classnames={styles.select}
          style={selectStyle}
          textFieldVariant="outlined"
          multiple
          multiLines
          popupIcon={<Icon type="arrow-collapse" size={6} />}
          onChange={onConfirmCodeSelect}
          placeholder="HS code/description"
          renderDefaultTags
        />
        <Button className={styles.reset} variant="outlined" color="primary" onClick={onReset}>
          Reset
        </Button>
      </div>
      <div className={styles.list}>
        <div className={styles.header}>
          <div
            className={cls(styles.title, { [styles.active]: tabIndex === TabIndex.Code })}
            onClick={() => onTabSelect(TabIndex.Code)}>
            HS Code list
          </div>
          <div
            className={cls(styles.title, { [styles.active]: tabIndex === TabIndex.Buyer })}
            onClick={() => onTabSelect(TabIndex.Buyer)}>
            Other buyers list
          </div>
        </div>
        <div className={styles.content}>
          {tabIndex === TabIndex.Code && <CodeOptionList data={recordsFiltered} />}
          {tabIndex === TabIndex.Buyer && <BuyerOptionList data={recordsFiltered} />}
        </div>
      </div>
    </div>
  )
}
export default Detail
