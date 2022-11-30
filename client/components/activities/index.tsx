import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { ActivityNewsType } from '../../components/activityNews/ActivityNewsType'
import ActivityNews from '../../components/activityNews'
import { SliderTab } from '../sliderTabs'
import Alert from '../../components/alert'
import styles from './index.module.scss'
import NewsTitle from '../newsTitle'

interface Props {
  title: string
  alerts: []
  news: []
}

const Activities = (props: Props) => {
  const { title, alerts, news } = props
  const [tabIndex, setTabIndex] = React.useState(0)

  const handleOnChange = (event: React.ChangeEvent<any>, newTabIndex: number) => {
    setTabIndex(newTabIndex)
  }

  const renderTabContainer = (tabIndex: number) => {
    if (tabIndex === 0) {
      return <Alert alerts={alerts} />
    }
    if (tabIndex === 1) {
      return (
        <div className={styles.news}>
          <ActivityNews type={ActivityNewsType.RECENT_NEWS} contents={news} filterVisible={true} />
        </div>
      )
    }
  }

  return (
    <div>
      <NewsTitle title={title} tabIndex={tabIndex} onChange={handleOnChange}>
        <SliderTab label="Alerts" />
        <SliderTab label="News" />
      </NewsTitle>
      <div className={styles.tabContent}>{renderTabContainer(tabIndex)}</div>
    </div>
  )
}

export default Activities
