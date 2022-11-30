import React from 'react'
import { get } from 'lodash'
import cls from 'classnames'
import Image from 'next/image'

import styles from './index.module.scss'
import { sourceMap } from '../../alert'

interface Props {
  source: string
  time: string
  className?: string
}

const UpdateInfo = ({ source, time, className }: Props) => {
  const sourceImage = get(sourceMap, source)
  return (
    <div className={cls(styles.updateInfo, className)}>
      <div className={styles.source}>
        Source:{' '}
        {sourceImage ? <Image src={sourceImage.src} width={sourceImage.width} height={sourceImage.height} /> : source}
      </div>
      <p>Last update: {time}</p>
    </div>
  )
}
export default UpdateInfo
