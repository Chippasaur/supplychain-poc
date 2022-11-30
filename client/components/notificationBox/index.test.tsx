import { render } from '@testing-library/react'

import NotificationBox from '../../../client/components/notificationBox/index'
import { NotificationResponse } from '../../../shared/response'
import { NotificationType } from '../../../shared/enum/notificationType'

describe('<NotificationBox />', () => {
  const contents: NotificationResponse[] = [
    {
      id: '1',
      supplierId: 'fake id',
      supplierName: 'UBC',
      postedAt: new Date('2021-2-23 16:00:00'),
      lastUpdatedAt: new Date('2021-2-23 16:00:00'),
      read: false,
      type: NotificationType.SubmitSurvey,
    },
    {
      id: '2',
      supplierId: 'fake id',
      supplierName: 'UBC',
      postedAt: new Date('2021-2-23 16:00:00'),
      lastUpdatedAt: new Date('2021-2-23 16:00:00'),
      read: false,
      type: NotificationType.SubmitSurvey,
    },
    {
      id: '5',
      supplierId: 'fake id',
      supplierName: 'UBC',
      postedAt: new Date('2021-2-23 16:00:00'),
      lastUpdatedAt: new Date('2021-2-23 16:00:00'),
      read: false,
      type: NotificationType.SubmitSurvey,
    },
    {
      id: '4',
      supplierId: 'fake id',
      supplierName: 'UBC',
      postedAt: new Date('2021-2-23 16:00:00'),
      lastUpdatedAt: new Date('2021-2-23 16:00:00'),
      read: true,
      type: NotificationType.SubmitSurvey,
    },
  ]

  it('should renders 3 unread contents in notificationBox', () => {
    const { container } = render(<NotificationBox contents={contents} />)
    expect(container.getElementsByClassName('title').length).toBe(1)
    expect(container.getElementsByClassName('item').length).toBe(3)
  })
})
