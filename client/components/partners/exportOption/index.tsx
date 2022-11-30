import React from 'react'

import styles from './index.module.scss'
import Icon from '../../icon'

const ExportOption = () => {
  return (
    <div className={styles.exportOption}>
      <span className={styles.des}>Export</span>
      <div className={styles.option}>
        <Icon type={'dots'} size={5} />
      </div>
    </div>
  )
}
export default ExportOption
