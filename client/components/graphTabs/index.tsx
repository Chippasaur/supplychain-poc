import React, { useState } from 'react'

import FinancialRisk from '../financialRisk'
import OverallBusinessRisk from '../overallBusinessRisk'
import styles from './index.module.scss'
import SustainabilityPerformance from '../sustainabilityPerformance'
import SliderTabs, { SliderTab } from '../sliderTabs'

export default function GraphTabs() {
  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (event: React.ChangeEvent<any>, newTabIndex: number) => {
    setTabIndex(newTabIndex)
  }

  return (
    <>
      <SliderTabs tabIndex={tabIndex} onChange={handleChange}>
        <SliderTab label="Overall Business Risk" />
        <SliderTab label="Financial Health" />
        <SliderTab label="Environmental Scores" />
      </SliderTabs>
      <div className={styles.tab}>
        {tabIndex === 0 && <OverallBusinessRisk />}
        {tabIndex === 1 && <FinancialRisk />}
        {tabIndex === 2 && <SustainabilityPerformance />}
      </div>
      <div className={styles.footer}>
        <div className={styles.updateDate}>Last update: 2021 Feb</div>
        {tabIndex === 2 && <span className={styles.tip}>* All data are on average</span>}
      </div>
    </>
  )
}
