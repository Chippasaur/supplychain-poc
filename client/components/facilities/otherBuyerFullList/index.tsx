import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/core/styles'
import { slice, map } from 'lodash'
import { useState } from 'react'
import * as React from 'react'

import Icon from '../../icon'
import styles from './index.module.scss'
import Pagination from '../../pagination'

interface Props {
  open: boolean
  onClose: () => void
  buyers: string[]
}

const dialogStyles = makeStyles({
  paper: {
    padding: '14px 28px 0 28px',
  },
  paperWidthMd: {
    maxWidth: '850px',
  },
})

const listItemStyles = makeStyles({
  root: {
    fontSize: 12,
    fontWeight: 400,
    color: '#3e4545',
  },
})

export default function OtherBuyerFullList({ open, onClose, buyers = [] }: Props) {
  const [currentPage, setCurrentPage] = useState(0)
  const initialBuyers = slice(buyers, 0, 15)
  const [currentList, setCurrentList] = useState(initialBuyers)
  const pageCount = buyers.length

  const onPageChange = (page: number) => {
    setCurrentPage(page)
    const newBuyers = slice(buyers, page * 15, (page + 1) * 15)
    setCurrentList(newBuyers)
  }

  const handleClose = () => {
    onClose()
    setCurrentList(initialBuyers)
    setCurrentPage(0)
  }

  return (
    <Dialog open={open} scroll={'paper'} classes={dialogStyles()} fullWidth maxWidth={'md'}>
      <div className={styles.titleWrapper}>
        <span>Full Buyer List</span>
        <Icon type={'close'} size={18} onClick={() => handleClose()} />
      </div>
      <List className={styles.list} disablePadding classes={listItemStyles()}>
        {map(currentList, (name, index) => (
          <ListItem divider={index !== 14} key={index}>
            {name}
          </ListItem>
        ))}
      </List>
      <Pagination count={pageCount} onChangePage={onPageChange} page={currentPage} rowsPerPage={15} />
    </Dialog>
  )
}
