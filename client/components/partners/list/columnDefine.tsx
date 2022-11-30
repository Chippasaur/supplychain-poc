import cls from 'classnames'
import { get } from 'lodash'
import Link from 'next/link'
import { GridCellParams, GridColDef } from '@material-ui/data-grid'
import Rating from '@material-ui/lab/Rating'

import Icon from '../../icon'
import styles from './index.module.scss'
import { LEGENDS } from '../legend/legends'
import { DAndBLevel } from '../../../../shared/enum/dAndBLevel'
import { EntityType } from '../../../../shared/enum/entityType'
import { SupplierCategory } from '../../../../shared/enum/category'
import { Location } from '../../../../shared/types'
import NoDataText from '../../noDataText'

const columns: GridColDef[] = [
  {
    field: 'companyName',
    headerName: 'Company Name',
    width: 200,
    cellClassName: 'company',
    headerAlign: 'left',
    sortable: false,
    disableColumnMenu: true,
    renderCell: ({ value, row, ...rest }: GridCellParams) => {
      const id = get(row, 'id', '')
      const riskLevel = get(row, 'riskLevel', 0)
      return (
        <div className={styles.companyName}>
          {(riskLevel === DAndBLevel.High || riskLevel === DAndBLevel.Severe) && <Icon type={'danger'} size={16} />}
          <Link href={`/partners/${id}`}>
            <span>{value}</span>
          </Link>
        </div>
      )
    },
  },
  {
    field: 'location',
    headerName: 'Country',
    width: 140,
    headerAlign: 'left',
    sortable: false,
    disableColumnMenu: true,
    renderCell: ({ row, value, ...rest }: GridCellParams) => {
      const location = value as Location
      return <div className={styles.typeCell}>{location?.region ? location?.region : <NoDataText />}</div>
    },
  },
  {
    field: 'entity',
    headerName: 'Entity Type',
    width: 150,
    disableColumnMenu: true,
    headerAlign: 'left',
    sortable: false,
    renderCell: ({ row, value, ...rest }: GridCellParams) => {
      const entity = value as number
      const id = get(row, 'id', '')
      return (
        <div className={styles.typeCell}>
          {
            <span
              key={`${id}entityType${entity}`}
              className={cls(styles.rowBox, {
                [styles.group]: entity === EntityType.Group,
                [styles.facility]: entity === EntityType.Facility,
              })}>
              {EntityType[entity].toString()}
            </span>
          }
        </div>
      )
    },
  },
  {
    field: 'tier',
    headerName: 'Tier',
    type: 'number',
    width: 80,
    disableColumnMenu: true,
    headerAlign: 'left',
    align: 'left',
    sortable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 200,
    disableColumnMenu: true,
    headerAlign: 'left',
    sortable: false,
    renderCell: ({ row, value, ...rest }: GridCellParams) => {
      const category = value as SupplierCategory
      return <div className={styles.typeCell}>{LEGENDS[category].name}</div>
    },
  },
  {
    field: 'riskLevel',
    headerName: 'Business Risk',
    width: 120,
    disableColumnMenu: true,
    type: 'number',
    headerAlign: 'left',
    align: 'center',
    cellClassName: 'alignCenter',
    sortable: false,
    renderCell: (params: GridCellParams) => {
      const riskLevel = params.value
      return (
        <div
          className={cls(styles.overallBusinessRiskLevel, {
            [styles.low]: riskLevel === DAndBLevel.Low,
            [styles.moderate]: riskLevel === DAndBLevel.Moderate,
            [styles.high]: riskLevel === DAndBLevel.High,
            [styles.severe]: riskLevel === DAndBLevel.Severe,
            [styles.outOfBusiness]: riskLevel === DAndBLevel.OutOfBusiness,
            [styles.undetermined]: riskLevel === DAndBLevel.Undetermined,
            [styles.unavailable]: riskLevel === DAndBLevel.Unavailable,
          })}
        />
      )
    },
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 120,
    type: 'number',
    disableColumnMenu: true,
    headerAlign: 'left',
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <Rating value={Number(params.value)} readOnly precision={0.5} size={'small'} />
    ),
  },
]

export default columns
