import cls from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'

import styles from './index.module.scss'
import TipCard from '../../tipCard'

interface MessageBoxProps {
  className?: string
}

const declarationOfHiggIndex =
  'Higg Index data was created for testing purposes. It does not reflect any real or associated company'

export default function MessageBox({ className }: MessageBoxProps) {
  const [hoverExclamationState, setHoverExclamationState] = useState<boolean>(false)
  const renderTipCard = () => {
    return (
      <TipCard style={{ height: '92px', width: '287px', top: '-125px', left: '-95px' }}>
        <div className={styles.tipCardImage}>
          <Image src={'/images/exclamation.svg'} width={12} height={12} />
        </div>
        <span className={styles.declaration}>{declarationOfHiggIndex}</span>
      </TipCard>
    )
  }
  const handleExclamationMouseActivity = (state: boolean) => {
    setHoverExclamationState(state)
  }
  return (
    <span
      className={cls(className, styles.exclamation)}
      onMouseEnter={() => handleExclamationMouseActivity(true)}
      onMouseLeave={() => handleExclamationMouseActivity(false)}>
      {!hoverExclamationState && <Image src={'/images/exclamation.svg'} width={12} height={12} />}
      {hoverExclamationState && (
        <>
          <Image src={'/images/exclamation-blue.svg'} width={12} height={12} /> {renderTipCard()}
        </>
      )}
    </span>
  )
}
