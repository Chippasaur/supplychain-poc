import React from 'react'

import styles from './index.module.scss'
import SliderTabs, { TabsProps } from '../sliderTabs'

interface NewsTitleProps extends TabsProps {
  title: string
  children: React.ReactNode
  tabsChildren?: React.ReactNode
}
const NewsTitle = ({ title, children, tabsChildren, ...tabProps }: NewsTitleProps) => {
  return (
    <div className={styles.newsTitle}>
      <p className={styles.title}>{title}</p>

      <SliderTabs {...tabProps}>{children}</SliderTabs>
    </div>
  )
}
export default NewsTitle
