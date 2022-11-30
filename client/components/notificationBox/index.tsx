import { countBy, get } from 'lodash'
import Collapse from '@material-ui/core/Collapse'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import cls from 'classnames'
import { useRouter } from 'next/router'

import NewsTitle from '../newsTitle'
import styles from './index.module.scss'
import { SliderTab } from '../sliderTabs'
import { dateTimeFormatter } from '../../utils/format'
import { CustomizedCheckbox } from '../customCheckBox'
import { NotificationResponse } from '../../../shared/response'
import { useUpdateNotification } from '../../utils/hooks'
import { NotificationType } from '../../../shared/enum/notificationType'

const messageMap = {
  [NotificationType.SubmitSurvey]: {
    content: 'has submitted a survey',
    path: 'survey',
  },
  [NotificationType.UploadCertification]: {
    content: 'has uploaded a new certification',
    path: 'certification',
  },
  [NotificationType.JoinedNetwork]: {
    content: 'has joined your network',
    path: '',
  },
  [NotificationType.JoinedSerai]: {
    content: 'has joined Serai',
    path: '',
  },
}

const processData = ({ contents }: NotificationBoxProps) => {
  const unreadContents: NotificationContent[] = []
  const readContents: NotificationContent[] = []
  contents.forEach(content => {
    content.read
      ? readContents.push({ ...content, isDisabled: false })
      : unreadContents.push({ ...content, isDisabled: false })
  })

  unreadContents.sort((o1, o2) => {
    return o1.postedAt >= o2.postedAt ? -1 : 1
  })
  readContents.sort((o1, o2) => {
    return o1.lastUpdatedAt >= o2.lastUpdatedAt ? -1 : 1
  })

  return { unreadContents, readContents }
}

interface NotificationContent extends NotificationResponse {
  isDisabled: boolean
}

interface NotificationBoxProps {
  contents: NotificationResponse[]
  containerClassName?: string
}

export default function NotificationBox({ contents, containerClassName }: NotificationBoxProps) {
  const [readStatus, setReadState] = useState(0)
  const [unreadContentsState, setUnreadContentsState] = useState<NotificationContent[]>([])
  const [readContentsState, setReadContentsState] = useState<NotificationContent[]>([])
  const router = useRouter()

  function handleSwitchReadStatus(event: React.ChangeEvent<any>, newReadStatus: number) {
    setReadState(newReadStatus)
  }

  useEffect(() => {
    if (contents.length) {
      const { unreadContents, readContents } = processData({ contents })
      setUnreadContentsState(unreadContents)
      setReadContentsState(readContents)
    }
  }, [contents])

  const handleRead = async (contentId: string) => {
    const tmpContent = unreadContentsState.find(content => contentId === content.id)
    if (tmpContent) {
      tmpContent.isDisabled = true
      setUnreadContentsState([...unreadContentsState])

      const updateBody = {
        viewerId: 'fake viewer id',
        read: true,
      }
      await useUpdateNotification(tmpContent.id, updateBody)
      tmpContent.read = true
      setUnreadContentsState([...unreadContentsState])
      setReadContentsState([tmpContent, ...readContentsState])
    }
  }

  const handleClick = (event: React.MouseEvent, notification: NotificationResponse) => {
    if (
      notification.type === NotificationType.JoinedSerai ||
      get(event, 'target.nodeName') === 'INPUT' ||
      get(event, 'target.innerText') === 'got it'
    ) {
      return
    }
    router.push(`/partners/${notification.supplierId}/${messageMap[notification.type].path}`)
  }

  function getUnreadContent(content: NotificationContent) {
    return (
      <Collapse key={`${content.id} unread Collapse`} in={!content.read}>
        <div key={`${content.id} unread item`} className={styles.item} onClick={event => handleClick(event, content)}>
          <div className={styles.itemHeader}>
            <span className={styles.date}>{dateTimeFormatter(content.postedAt)}</span>
            <div className={styles.checkBoxContainer}>
              <FormControlLabel
                control={<CustomizedCheckbox onChange={() => handleRead(content.id)} />}
                disabled={content.isDisabled}
                label={<span className={styles.checkBoxLabel}>got it</span>}
              />
            </div>
          </div>
          <span className={styles.content}>
            <b>{content.supplierName}</b> {messageMap[content.type].content}
          </span>
        </div>
      </Collapse>
    )
  }

  return (
    <div className={styles.wrapper}>
      <NewsTitle title={'NOTIFICATIONS'} tabIndex={readStatus} onChange={handleSwitchReadStatus}>
        <SliderTab label="Unread" badgeContent={countBy(unreadContentsState, o => !o.read).true} />
        <SliderTab label="Read" />
      </NewsTitle>

      {readStatus === 0 && (
        <div className={cls(styles.container, containerClassName)}>
          {unreadContentsState.map(content => getUnreadContent(content))}
        </div>
      )}
      {readStatus === 1 && (
        <div className={cls(styles.container, containerClassName)}>
          {readContentsState.map(content => (
            <div key={`${content.id} read item`} className={styles.item} onClick={event => handleClick(event, content)}>
              <span className={styles.date}>{dateTimeFormatter(content.postedAt)}</span>
              <span className={styles.content}>
                <b>{content.supplierName}</b> {messageMap[content.type].content}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
