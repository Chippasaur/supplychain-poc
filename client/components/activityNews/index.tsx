import React, { useState } from 'react'
import { isEqual, isEmpty, maxBy, map, range, includes, findIndex, eq, filter } from 'lodash'
import cls from 'classnames'

import styles from './index.module.scss'
import { dateTimeFormatter } from '../../utils/format'
import { ActivityNewsType } from './ActivityNewsType'
import Filter from '../filter'

interface ActivityNewsProps {
  type: ActivityNewsType
  contents: Array<Content>
  filterVisible?: boolean
  className?: string
  containerClassName?: string
}

interface Content {
  id: string
  postedAt: Date
  title?: string
  content: string
  tier?: number
}

const ActivityNews = (props: ActivityNewsProps) => {
  const { type, contents, filterVisible = false, className, containerClassName } = props
  const tierLabels = ['All Tiers']
  const [tier, setTier] = useState('All Tiers')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOnClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOnClose = (event: any) => {
    setAnchorEl(null)
    if (includes(tierLabels, event.currentTarget.dataset.value)) {
      setTier(event.currentTarget.dataset.value)
    }
  }

  const renderHint = () => {
    if (type === ActivityNewsType.RECENT_NEWS) {
      return <span>No news</span>
    }
    if (type === ActivityNewsType.ACTIVITY_FEED) {
      return <span>No activities</span>
    }
  }

  const renderHeader = (content: Content) => {
    return (
      <div className={styles.header}>
        <span className={styles.date}>{dateTimeFormatter(content.postedAt)}</span>
        {type === ActivityNewsType.RECENT_NEWS && <span className={styles.tier}>Tier {content.tier}</span>}
      </div>
    )
  }

  const renderFilter = () => {
    const result = maxBy(contents, 'tier')
    const maxTier = result ? result.tier : 0
    range(1, maxTier! + 1).forEach(item => {
      tierLabels.push('Tier ' + item)
    })
    return (
      <Filter
        level={tier}
        levels={tierLabels}
        onClick={handleOnClick}
        onClose={handleOnClose}
        anchorEl={anchorEl}
        style={styles.filter}
      />
    )
  }

  const newsFilter = () => {
    const result = findIndex(tierLabels, item => eq(item, tier))
    return result === 0 ? contents : filter(contents, item => item.tier === result)
  }

  return (
    <>
      {filterVisible && renderFilter()}
      <div className={cls(styles.container, containerClassName)}>
        {isEmpty(contents)
          ? renderHint()
          : newsFilter().map(content => {
              return (
                <div key={content.id} className={cls(styles.item, className)}>
                  {renderHeader(content)}
                  {content.title && <span className={styles.contentTitle}>{content.title}</span>}
                  <span
                    className={cls(styles.content, {
                      [styles.newsContent]: isEqual(type, ActivityNewsType.RECENT_NEWS),
                    })}
                    dangerouslySetInnerHTML={{ __html: content.content }}
                  />
                </div>
              )
            })}
      </div>
    </>
  )
}

export default ActivityNews
