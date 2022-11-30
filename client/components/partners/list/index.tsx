import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DataGrid, GridPageChangeParams } from '@material-ui/data-grid'

import columns from './columnDefine'
import styles from './index.module.scss'
import LoadingProgress from '../../loadingProgress'
import { Mode } from '../../../utils/network/modeCondition'
import { isFilterMode, isFreeMode } from '../network/graph/conditions'
import { CustomerSuppliersResponse } from '../../../../shared/response'

interface PartnersProps {
  suppliers: CustomerSuppliersResponse[]
  mode: Mode
}

const customCheckbox = {
  '& .MuiCheckbox-root svg': {
    width: 18,
    height: 18,
    backgroundColor: 'transparent',
    border: `1px solid #C4C4C4`,
    borderRadius: 3,
  },
  '& .MuiCheckbox-root svg path': {
    display: 'none',
  },
  '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
    backgroundColor: '#008DB3',
    borderColor: '#008DB3',
  },
  '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
    position: 'absolute',
    display: 'table',
    border: '2px solid #fff',
    borderTop: 0,
    borderLeft: 0,
    transform: 'rotate(45deg) translate(-50%,-50%)',
    opacity: 1,
    transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
    content: '""',
    top: '48%',
    left: '39%',
    width: 5.71428571,
    height: 9.14285714,
  },
  '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
    display: 'none',
  },
}

const useStyle = makeStyles({
  root: {
    fontFamily: 'HeroNew',
    fontSize: 12,
    '& .MuiDataGrid-colCellTitle': {
      color: '#555',
      fontWeight: 600,
      padding: 0,
      textOverflow: 'unset',
      whiteSpace: 'pre-wrap',
      overflow: 'unset',
      pointerEvents: 'none',
    },
    '& .MuiDataGrid-colCellTitleContainer': {
      textOverflow: 'unset',
      whiteSpace: 'pre-wrap',
      overflow: 'unset',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-cell': {
      color: '#656565',
      textOverflow: 'unset',
      whiteSpace: 'pre-wrap',
      overflow: 'unset',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: 'rgba(243, 245, 245, 0.6)',
    },
    '& .MuiDataGrid-cellWithRenderer.alignCenter ': {
      justifyContent: 'center',
    },
    '& .MuiDataGrid-row': {
      minHeight: 48,
    },
    '& .MuiDataGrid-window': {
      overflowX: 'hidden',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#F8F9F9',
    },
    '& .MuiDataGrid-row.Mui-selected': {
      backgroundColor: 'transparent',
    },
    '& .MuiDataGrid-row.Mui-selected:hover': {
      backgroundColor: 'transparent',
    },
    '& .company': {
      color: '#0F81AC',
    },
    '&.MuiDataGrid-autoHeight': {
      minHeight: 580,
    },
    ...customCheckbox,
  },
})

function PartnersTable({ suppliers, mode }: PartnersProps) {
  const classes = useStyle()

  const DEFAULT_START_PAGE_INDEX = 0
  const DEFAULT_ROWS_PER_PAGE = 20
  const [page, setPage] = useState(DEFAULT_START_PAGE_INDEX)
  const [rowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)
  const [loadingStatus, setLoadingStatus] = useState<boolean | null>(true)

  const handleChangePage = (param: GridPageChangeParams) => setPage(param.page)

  useEffect(() => {
    if (suppliers && suppliers.length <= rowsPerPage && page > DEFAULT_START_PAGE_INDEX) {
      setPage(DEFAULT_START_PAGE_INDEX)
    }
  }, [suppliers.length, rowsPerPage, page])

  useEffect(() => {
    if (suppliers.length || isFilterMode(mode)) {
      setLoadingStatus(false)
    }
    return () => setLoadingStatus(isEmpty(suppliers) && isFreeMode(mode))
  }, [suppliers, mode])

  return (
    <div className={styles.table}>
      {loadingStatus ? (
        <LoadingProgress />
      ) : (
        <DataGrid
          rows={suppliers}
          columns={columns}
          page={page > DEFAULT_START_PAGE_INDEX && suppliers.length <= rowsPerPage ? DEFAULT_START_PAGE_INDEX : page}
          pageSize={rowsPerPage}
          pagination={true}
          checkboxSelection
          onPageChange={handleChangePage}
          headerHeight={50}
          className={classes.root}
          disableSelectionOnClick
          autoHeight
        />
      )}
    </div>
  )
}

export default PartnersTable
