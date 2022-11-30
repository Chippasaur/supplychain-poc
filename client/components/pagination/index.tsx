import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import cls from 'classnames'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'
import * as React from 'react'

import styles from './index.module.scss'

interface Props {
  count: number
  onChangePage: (page: number) => void
  page: number
  rowsPerPage: number
}

export default function Pagination({ count, onChangePage, page, rowsPerPage }: Props) {
  const totalPage = Math.floor(count / rowsPerPage)
  const startIndex = page * rowsPerPage + 1
  const endIndex = (page + 1) * rowsPerPage

  const handleBackClick = () => {
    if (page === 0) {
      return
    }
    onChangePage(page - 1)
  }

  const handleForwardClick = () => {
    if (page === totalPage) {
      return
    }
    onChangePage(page + 1)
  }

  return (
    <div className={styles.pagination}>
      <span>
        {startIndex}-{count <= endIndex ? count : endIndex} of {count}
      </span>
      <div className={styles.pageButtons}>
        <ArrowBackIosRoundedIcon
          className={cls(styles.pageAction, page === 0 && styles.disabled)}
          onClick={handleBackClick}
        />
        <ArrowForwardIosRoundedIcon
          className={cls(styles.pageAction, page === totalPage && styles.disabled)}
          onClick={handleForwardClick}
        />
      </div>
    </div>
  )
}
