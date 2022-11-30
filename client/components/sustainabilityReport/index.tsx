import { map, isNil, find, drop } from 'lodash'
import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import Image from 'next/image'
import cls from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

import { useSustainability } from '../../utils/hooks'
import styles from './index.module.scss'
import { PerformanceCategory } from '../../../shared/enum/performanceCategory'
import Icon from '../icon'
import TipCard from '../tipCard'
import ExportOption from '../partners/exportOption'
import SliderTabs, { SliderTab } from '../sliderTabs'
import MessageBox from '../sustainabilityPerformance/messageBox'

const categories = [
  {
    type: PerformanceCategory.averageTotalScore,
    name: 'Average total score',
  },
  {
    type: PerformanceCategory.ems,
    name: 'EMS',
  },
  {
    type: PerformanceCategory.energyAndGHGEmissions,
    name: 'Energy & GHG emissions',
  },
  {
    type: PerformanceCategory.waterUse,
    name: 'Water use',
  },
  {
    type: PerformanceCategory.wastewaterEffluent,
    name: 'Wastewater effluent',
  },
  {
    type: PerformanceCategory.emissionsToAir,
    name: 'Emissions to air',
  },
  {
    type: PerformanceCategory.wasteManagement,
    name: 'Waste management',
  },
  {
    type: PerformanceCategory.chemicals,
    name: 'Chemicals',
  },
]

const indicatedIcons = [
  {
    label: 'Improved',
    type: 'improved',
    style: styles.improved,
  },
  {
    label: 'Regressed',
    type: 'regressed',
    style: styles.regressed,
  },
  {
    label: 'No change',
    type: 'no-change',
    style: styles.noChange,
  },
]

const SustainabilityReport = () => {
  const counts = useSustainability()
  const [tipCardVisible, setTipCardVisible] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)

  const options = {
    tooltips: {
      enabled: false,
    },
    cutoutPercentage: 84,
  }

  const getColor = (score: number) => {
    switch (true) {
      case score > 0 && score <= 25:
        return '#ffd600'
      case score > 25 && score <= 50:
        return '#c6df62'
      case score > 50 && score <= 75:
        return '#91e34e'
      case score > 75 && score <= 100:
        return '#01c95a'
      default:
        return '#f2f2f2'
    }
  }

  const findScoreOrDefault = (
    collection: { sustainabilityIndex: PerformanceCategory; score: number },
    predicate: any,
  ) => {
    const result: any = find(collection, predicate)
    return result ? result.score : 0
  }

  const getDataSet = (category: { type: PerformanceCategory; name: string | undefined }) => {
    const score = findScoreOrDefault(counts[0].performance, { sustainabilityIndex: category.type })
    return {
      data: [score, 100 - score],
      backgroundColor: [getColor(score), '#f2f2f2'],
      borderWidth: 0,
    }
  }

  const getIcon = (currentScore: number, previousScore: number) => {
    if (currentScore > previousScore) {
      return indicatedIcons[0]
    }
    if (currentScore < previousScore) {
      return indicatedIcons[1]
    }
    return indicatedIcons[2]
  }

  const onMouseOverHandler = (event: React.MouseEvent<Element>) => {
    setTipCardVisible(true)
  }

  const onMouseOutHandler = (event: React.MouseEvent<Element>) => {
    setTipCardVisible(false)
  }

  const renderTotalIndexChart = (category: { type: PerformanceCategory; name: string }) => {
    const dataSet = getDataSet(category)
    const score = findScoreOrDefault(counts[1].performance, { sustainabilityIndex: category.type })
    const icon = getIcon(dataSet.data[0], Number(score))
    return (
      <>
        <div className={styles.totalView}>
          <div className={styles.totalChart}>
            <div className={styles.headMsg}>Total score</div>
            <Doughnut height={150} width={150} data={{ datasets: [dataSet] }} options={options} />
            <div className={styles.totalChartCenter}>
              <span className={styles.currentScore}>{dataSet.data[0]}</span>
              <span className={styles.pointsLabel}>Points</span>
              <Icon className={icon.style} type={icon.type} size={8} />
              <span className={styles.previousScore}>{score}</span>
            </div>
            <div className={styles.totalLabel}>
              <Icon
                className={cls(styles.instruction, tipCardVisible && styles.hoverInstruction)}
                type={'instruction'}
                size={12}
                pointer={true}
                onMouseOver={event => onMouseOverHandler(event)}
                onMouseOut={event => onMouseOutHandler(event)}
              />
              {tipCardVisible && renderTipCard()}
              <span className={styles.label}>
                Higg ID <span className={styles.id}>142693</span>
              </span>
            </div>
            <div className={styles.msg}>2020 Verified</div>
          </div>
        </div>
        <div className={styles.variousView}>
          {map(drop(categories), category => renderIndexesChart(category, styles.chart))}
        </div>
      </>
    )
  }

  const renderIndexesChart = (
    category: { type: PerformanceCategory; name: string | undefined },
    chartStyle: string,
  ) => {
    const dataSet = getDataSet(category)
    const score = findScoreOrDefault(counts[1].performance, { sustainabilityIndex: category.type })
    const icon = getIcon(dataSet.data[0], Number(score))
    return (
      <div className={chartStyle} key={category.name}>
        <Doughnut height={98} width={98} data={{ datasets: [dataSet] }} options={options} />
        <div className={styles.chartCenter}>
          <span className={styles.currentScore}>{dataSet.data[0]}</span>
          <Icon className={icon.style} type={icon.type} size={6} />
          <span className={styles.previousScore}>{score}</span>
        </div>
        {category.name && (
          <div className={styles.label}>
            <p className={styles.description}>{category.name}</p>
          </div>
        )}
      </div>
    )
  }

  const renderIndicatedIcons = () => {
    return (
      <div className={styles.icons}>
        <span className={styles.iconTitle}>Compared to the previous year</span>
        {map(indicatedIcons, icon => (
          <div key={icon.label} className={styles.icon}>
            <Icon className={icon.style} type={icon.type} size={8} />
            <span className={styles.iconLabel}>{icon.label}</span>
          </div>
        ))}
      </div>
    )
  }

  const renderTipCard = () => {
    return (
      <TipCard style={{ height: '155px', width: '247px', top: '-215px', left: '40px', textAlign: 'left' }}>
        <div className={styles.mockTitle}>How to read this chart?</div>
        <div className={styles.mockContent}>
          {renderIndexesChart({ type: PerformanceCategory.averageTotalScore, name: undefined }, styles.mockChart)}
          <div className={styles.firstCircleArrow}>
            <Image src="/images/circle-arrow.svg" width={60} height={10} />
          </div>
          <div className={styles.secondCircleArrow}>
            <Image src="/images/circle-arrow.svg" width={60} height={10} />
          </div>
          <div className={styles.mockDescription}>
            <p>Current year</p>
            <p>Previous year</p>
          </div>
        </div>
      </TipCard>
    )
  }

  const handleChange = (event: React.ChangeEvent<any>, newTabIndex: number) => {
    setTabIndex(newTabIndex)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Sustainability & ESG</span>
        <ExportOption />
      </div>
      <SliderTabs tabIndex={tabIndex} onChange={handleChange} indicatorColor={'#066184'} className={styles.tabs}>
        <SliderTab label="Environment" />
        <SliderTab label="Social & Labour" disabled={true} />
        <SliderTab label="Sustainability" disabled={true} />
      </SliderTabs>
      {tabIndex === 0 && (
        <div className={styles.box}>
          <div className={styles.container}>
            <div>
              <Image src={'/images/higgIndex.png'} width={56} height={28} />
              <MessageBox />
            </div>
            <span className={styles.subTitle}>Higg Facilty Environmental Module report</span>
            <div className={styles.charts}>{!isNil(counts) && renderTotalIndexChart(categories[0])}</div>
          </div>
          {renderIndicatedIcons()}
        </div>
      )}
      {tabIndex !== 0 && <div className={cls(styles.placeholder, styles.box)}>Test</div>}
    </div>
  )
}

export default SustainabilityReport
