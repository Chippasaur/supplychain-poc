import React from 'react'
import { isNil, head, isEmpty } from 'lodash'

import Layout from './layout'
import Buyers from '../buyers'
import DAndB from './companies/dAndB'
import styles from './index.module.scss'
import HiggIndex from './companies/higgIndex'
import { useCompanyData, useBuyers } from '../../utils/hooks'
import MessageBox from '../sustainabilityPerformance/messageBox'
import { BuyersDataSource } from '../../../shared/enum/buyersDataSource'

export interface Level {
  [key: string]: any
}

const dAndBLogo = '/images/dAndB.png'

const higgIndexLogo = '/images/higgIndex.png'

const PartnersSecColumn = () => {
  const { dAndB, higgIndex } = useCompanyData()
  const buyers = useBuyers(BuyersDataSource.CONTRIBUTORS)

  return (
    <>
      <Layout logo={{ source: dAndBLogo, width: 45, height: 25 }}>
        {!isNil(dAndB) && <DAndB level={dAndB.businessRiskLevel} />}
      </Layout>
      <Layout
        logo={{ source: higgIndexLogo, width: 63, height: 28 }}
        secondLogo={<MessageBox className={styles.higgTip} />}>
        {!isNil(higgIndex) && <HiggIndex selfAssessment={higgIndex.selfAssessment} verified={higgIndex.verified} />}
      </Layout>
      <Layout headerVisible={false}>
        <Buyers buyerNames={!isEmpty(buyers) ? head(buyers)!.buyers : []} />
      </Layout>
    </>
  )
}

export default PartnersSecColumn
