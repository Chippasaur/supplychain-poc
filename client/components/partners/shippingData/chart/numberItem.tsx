import styles from './index.module.scss'

interface Props {
  title: string | number
  des: string
}
const NumberItem = ({ title, des }: Props) => {
  return (
    <div className={styles.numberItem}>
      <p className={styles.numberItemTitle}>{title}</p>
      <p className={styles.numberItemDescription}>{des}</p>
    </div>
  )
}
export default NumberItem
