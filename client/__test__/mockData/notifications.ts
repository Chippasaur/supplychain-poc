import { NotificationType } from '../../../shared/enum/notificationType'

export default [
  {
    supplierName: 'company1',
    type: NotificationType.SubmitSurvey,
    postedAt: new Date('2021-2-23 16:00:00'),
    id: '1',
  },
  {
    supplierName: 'company2',
    type: NotificationType.SubmitSurvey,
    postedAt: new Date('2021-2-23 13:00:00'),
    id: '2',
  },
  {
    supplierName: 'company3',
    type: NotificationType.SubmitSurvey,
    postedAt: new Date('2021-2-23 11:00:00'),
    id: '3',
  },
]
