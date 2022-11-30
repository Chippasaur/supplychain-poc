import React from 'react'
import Avatar from '@material-ui/core/Avatar'

import styles from './index.module.scss'
import Button from '../client/components/button'
import { fetchCommonData } from '../client/utils/api'
import GraphTabs from '../client/components/graphTabs'
import Activities from '../client/components/activities'
import NotificationBox from '../client/components/notificationBox'
import CompanyOverview from '../client/components/home/companyOverview/index'
import { useCustomerData, useNews, useNotificationContents } from '../client/utils/hooks'

export default function Home() {
  const { data: alerts = [] } = fetchCommonData('/api/v1/alerts')
  const { name, customerName, logoUri } = useCustomerData()
  const news = useNews()
  const { data: notificationContents = [] } = useNotificationContents()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Welcome back, {name}</h1>
          <div className={styles.companyInfo}>
            <Avatar alt="Remy Sharp" src={logoUri} className={styles.avatar} />
            <p>{customerName}</p>
          </div>
        </div>
        <div>
          <Button role="secondary" variant="outlined" color="primary">
            Add colleagues
          </Button>
          <Button role="secondary" variant="outlined" color="primary">
            Invite partners
          </Button>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.column}>
          <CompanyOverview />
          <GraphTabs />
        </div>
        <Activities title="activities" alerts={alerts} news={news} />
        <NotificationBox contents={notificationContents} containerClassName={styles.notification} />
      </main>
    </div>
  )
}
