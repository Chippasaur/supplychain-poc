import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './index.module.scss'

export default function LoadingProgress() {
  return (
    <div className={styles.loadingProgress}>
      <CircularProgress size={60} thickness={2} />
    </div>
  )
}
