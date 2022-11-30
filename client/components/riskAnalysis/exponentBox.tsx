import styles from './index.module.scss'
import Icon from '../icon'

interface ExponentProps {
  title: string
  description: string | number
  subscript?: string
}

export default function ExponentBox({ title, description, subscript }: ExponentProps) {
  return (
    <div>
      <div className={styles.exponentTitle}>
        {title} <Icon type={'instruction'} size={12} className={styles.icon} pointer />
      </div>
      <div className={styles.exponent}>
        {description}
        {subscript && <sub>{subscript}</sub>}
      </div>
    </div>
  )
}
