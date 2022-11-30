import dynamic from 'next/dynamic'

import Legend from '../legend'
import { LEGENDS } from '../legend/legends'
import styles from './index.module.scss'
import { Mode } from '../../../utils/network/modeCondition'
import { CustomerSuppliersResponse } from '../../../../shared/response'

const NetworkGraph = dynamic(() => import('./graph/index'), { ssr: false })

interface PartnersProps {
  suppliers: CustomerSuppliersResponse[]
  filteredSuppliers: CustomerSuppliersResponse[]
  mode: Mode
}

export default function PartnersNetwork({ suppliers, filteredSuppliers, mode }: PartnersProps) {
  return (
    <div className={styles.network}>
      <div className={styles.networkGraph}>
        <NetworkGraph suppliers={suppliers} filteredSuppliers={filteredSuppliers} mode={mode} />
      </div>
      <Legend legends={Object.values(LEGENDS)} />
    </div>
  )
}
