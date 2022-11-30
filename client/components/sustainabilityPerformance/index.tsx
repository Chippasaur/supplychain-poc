import cls from 'classnames'
import Image from 'next/image'
import { Bar } from 'react-chartjs-2'
import { map, get, find } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.scss'
import { useSustainability } from '../../utils/hooks'
import { PerformanceCategory } from '../../../shared/enum/performanceCategory'
import MessageBox from './messageBox'

const performanceCategories = [
  {
    type: PerformanceCategory.averageTotalScore,
    name: 'Average total score',
  },
  {
    type: PerformanceCategory.ems,
    name: 'EMS*',
  },
  {
    type: PerformanceCategory.energyAndGHGEmissions,
    name: 'Energy & GHG emissions*',
  },
  {
    type: PerformanceCategory.waterUse,
    name: 'Water use*',
  },
  {
    type: PerformanceCategory.wastewaterEffluent,
    name: 'Wastewater effluent*',
  },
  {
    type: PerformanceCategory.emissionsToAir,
    name: 'Emissions to air*',
  },
  {
    type: PerformanceCategory.wasteManagement,
    name: 'Waste management*',
  },
  {
    type: PerformanceCategory.chemicals,
    name: 'Chemicals*',
  },
]

const options = {
  responsive: true,
  tooltips: {
    enabled: false,
  },
  barValueSpacing: 4,
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          max: 100,
          stepSize: 100,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
}
export default function SustainabilityPerformance() {
  const counts = useSustainability()
  const labels = map(performanceCategories, 'name')
  const reportYears = map(counts, 'reportTime')
  const [selectedYear, setSelectedYear] = useState(reportYears[0])
  const [data, setData] = useState({})

  useEffect(() => {
    setSelectedYear(reportYears[0])
  }, [counts])

  useEffect(() => {
    setData({
      labels,
      datasets: map(reportYears, reportTime => {
        const opacity = reportTime === selectedYear ? 1 : 0.2
        return {
          barThickness: 4,
          label: reportTime,
          data: map(get(find(counts, { reportTime }), 'performance'), 'score'),
          backgroundColor: [
            `rgba(66, 66, 66, ${opacity})`,
            `rgba(142, 142, 142, ${opacity})`,
            `rgba(66, 189, 220, ${opacity})`,
            `rgba(142, 214, 234, ${opacity})`,
            `rgba(63, 180, 124, ${opacity})`,
            `rgba(138, 210, 175, ${opacity})`,
            `rgba(255, 183, 0, ${opacity})`,
            `rgba(255, 211, 103, ${opacity})`,
          ],
        }
      }),
    })
  }, [selectedYear])

  return (
    <>
      <Image src={'/images/higgIndex.png'} width={56} height={28} />
      <MessageBox />
      <div className={styles.detail}>
        <div className={styles.performance}>
          <div className={styles.title}>HIGG FEM Performance</div>
          {map(performanceCategories, item => (
            <div className={styles.scoreRow} key={item.name}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.score}>
                {get(find(get(counts, '[0].performance'), { sustainabilityIndex: item.type }), 'score', '-')}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.graph}>
          <div className={styles.histogram}>
            <Bar data={data} options={options} />
          </div>
          <div className={styles.yearSelection}>
            {map(reportYears, year => (
              <span
                key={year}
                className={cls(styles.year, selectedYear === year && styles.selectedYear)}
                onClick={() => setSelectedYear(year)}>
                {year}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
