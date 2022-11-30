import React from 'react'
import { isNil } from 'lodash'
import Image from 'next/image'
import cls from 'classnames'

import styles from './index.module.scss'
import AssessmentLayout from '../partnersSecColumn/layout'
import { useSupplierData } from '../../utils/hooks'
import TrafficLight from '../partnersSecColumn/companies/trafficLight'
import ActivityNews from '../activityNews'
import { ActivityNewsType } from '../activityNews/ActivityNewsType'
import { CustomerLinearProgress } from '../linearProgress'
import ExportOption from '../partners/exportOption'
import ExponentBox from './exponentBox'
import FinancialStrengths, { strengthsMap } from './financialStrength'
import CompositeCreditAppraisalComponent from './compositeCreditAppraisalComponent'
import ViabilityScore from './viabilityScore'
import { DAndBLevel } from '../../../shared/enum/dAndBLevel'
import { DAndBFinancialRisk } from '../../../shared/enum/dAndBFinancialRisk'

const overallBusinessRisk = {
  [DAndBLevel.Low]: 'Low',
  [DAndBLevel.Moderate]: 'Moderate',
  [DAndBLevel.High]: 'High',
  [DAndBLevel.Severe]: 'Severe',
  [DAndBLevel.OutOfBusiness]: 'Out of Business',
  [DAndBLevel.Undetermined]: 'Undetermined',
  [DAndBLevel.Unavailable]: 'Unavailable',
}

const financialRisk = {
  [DAndBFinancialRisk.Low]: 'Low',
  [DAndBFinancialRisk.Average]: 'Average',
  [DAndBFinancialRisk.Medium]: 'Medium',
  [DAndBFinancialRisk.High]: 'High',
}

export default function RiskAnalysisContent() {
  const {
    news,
    company: { dAndB, trafficLight },
  } = useSupplierData()
  if (isNil(dAndB)) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Risk analysis</p>
        <ExportOption />
      </div>
      <div className={styles.content}>
        <div className={styles.dAndB}>
          <Image src="/images/dAndB.png" width={45} height={25} />
          <div className={styles.section}>
            <ExponentBox title="Overall business risk" description={overallBusinessRisk[dAndB.businessRiskLevel]} />
            <CustomerLinearProgress
              level={dAndB.businessRiskLevel}
              progressBarClassName={styles.progressBar}
              className={styles.riskBar}
            />
          </div>
          <div className={cls(styles.section, styles.flexSection)}>
            <ExponentBox title="D&B rating" description={dAndB.rating} />
            <ExponentBox title="Padex" description={dAndB.padex} subscript="industry medium 74" />
          </div>
          <div className={styles.section}>
            <ExponentBox title="Financial strength" description={strengthsMap[dAndB.financialStrength].name} />
            <FinancialStrengths strength={dAndB.financialStrength} />
          </div>
          <div className={styles.section}>
            <ExponentBox title="Composite credit appraisal" description={dAndB.compositeCreditAppraisal} />
            <CompositeCreditAppraisalComponent compositeCreditAppraisal={dAndB.compositeCreditAppraisal} />
          </div>
          <div className={styles.section}>
            <ExponentBox title="Financial risk" description={financialRisk[dAndB.financialRisk]} />
            <CustomerLinearProgress
              level={dAndB.financialRisk}
              progressBarClassName={styles.progressBar}
              className={styles.riskBar}
            />
          </div>
          <div className={styles.section}>
            <ExponentBox title="Viability Rating" description={dAndB.viabilityRating} />
          </div>
          <div className={styles.section}>
            <ExponentBox title="Viability Score" description={dAndB.viabilityScore} />
            <ViabilityScore viabilityScore={dAndB.viabilityScore} />
          </div>
          <div className={styles.section}>
            <span className={styles.footer}>Source: D&B Last update: 28 Feb 2021</span>
          </div>
        </div>
        <div className={styles.other}>
          <AssessmentLayout
            logo={{ source: '/images/trafficLight.png', width: 0, height: 0 }}
            secondLogo={
              <>
                {/*<span className={styles.secondLogo}>by</span>*/}
                <Image src="/images/eh.png" alt="logo" width={0} height={0} />
              </>
            }
            className={styles.otherLayout}>
            {!isNil(trafficLight) && <TrafficLight level={trafficLight.level} />}
          </AssessmentLayout>
          <>
            <p className={styles.title}>News</p>
            <div className={styles.newsWrapper}>
              <ActivityNews
                type={ActivityNewsType.RECENT_NEWS}
                contents={news}
                className={styles.otherLayout}
                containerClassName={styles.newsContainer}
              />
            </div>
          </>
        </div>
      </div>
    </div>
  )
}
