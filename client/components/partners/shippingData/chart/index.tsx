import { map, max } from 'lodash'
import moment from 'moment'
import React, { useCallback, useMemo } from 'react'
import { Line } from 'react-chartjs-2'

import styles from './index.module.scss'
import NumberItem from './numberItem'
import { MockShipmentResponse } from '../../../../../shared/response'
import { formatNumberWithUnit } from '../../../../utils/format'

interface TooltipItem {
  value: number
  xLabel: string
}
interface Props {
  chartData: Array<MockShipmentResponse>
  totalShipments: number
  averageValue: number
  firstDay?: Date
  lastDay?: Date
}

const LineChart = ({ chartData, totalShipments, averageValue, firstDay, lastDay }: Props) => {
  const labels = map(chartData, 'shipmentDate')
  const volumes = map(chartData, 'volume')
  const data = useCallback(
    canvas => {
      const gradient = canvas.getContext('2d')?.createLinearGradient(0, 0, 0, 450)
      gradient.addColorStop(0.05, 'rgba(235, 95, 44, 0.6)')
      gradient.addColorStop(0.23, 'rgba(235, 95, 44, 0.1)')
      gradient.addColorStop(0.5, 'rgba(235, 95, 44, 0.05)')
      gradient.addColorStop(0.95, 'rgba(235, 95, 44, 0.02)')
      return {
        labels,
        datasets: [
          {
            label: '# Number of shipments',
            data: volumes,
            fill: true,
            backgroundColor: gradient,
            borderColor: '#EB5F2C',
            labelColor: 'transparent',
            pointHoverRadius: 10,
            pointBorderColor: 'transparent',
            pointHoverBorderColor: 'rgba(235, 95, 44, 0.3)',
            pointHoverBorderWidth: 4,
            pointBorderWidth: 0,
            pointHitRadius: 0,
            pointRadius: 2,
            pointHoverBackgroundColor: '#fff',
          },
        ],
      }
    },
    [chartData],
  )

  const maxValue = max(volumes) || 0
  const stepSize = Math.ceil(maxValue / 4)
  const yAxisMax = (Math.ceil(maxValue / stepSize) + 1) * stepSize

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        // axes doc: https://www.chartjs.org/docs/latest/axes/cartesian/#scale-bounds
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              userCallback: function (label: string) {
                if (moment(label).date() === 1) {
                  return moment(label).format('MMM.YYYY')
                }
              },
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: Math.ceil(maxValue / 4),
              max: yAxisMax,
            },
          },
        ],
      },
      tooltips: {
        // tooltip style doc: https://www.chartjs.org/docs/latest/configuration/tooltip.html#tooltip-configuration
        mode: 'index',
        intersect: false,
        xPadding: 14,
        yPadding: 10,
        backgroundColor: '#fff',
        titleFontSize: 10,
        titleFontStyle: 'normal',
        titleFontColor: '#767676',
        bodyFontColor: '#3E4545',
        bodyFontSize: 18,
        bodyFontStyle: 'bold',
        footerFontSize: 12,
        footerFontStyle: 'normal',
        footerFontColor: '#3E4545',
        borderColor: '#eee',
        borderWidth: 1,
        labelColor: 'transparent',
        position: 'nearest',
        callbacks: {
          label: () => '',
          title: function (tooltipItems: Array<TooltipItem>) {
            return moment(tooltipItems[0].xLabel).format('YYYY.MM.DD')
          },
          beforeBody: (tooltipItems: Array<TooltipItem>) => {
            return tooltipItems[0].value
          },
          footer: () => 'Number of shipments',
        },
      },
      legend: { display: false },
      elements: {
        radius: 10,
      },
    }),
    [maxValue],
  )
  return (
    <div className={styles.chartWrapper}>
      <p>
        Shipment data{' '}
        <span className={styles.bold}>
          from {moment(firstDay).format('YYYY.MM.DD')} to {moment(lastDay).format('YYYY.MM.DD')}
        </span>
      </p>
      <div className={styles.content}>
        <div className={styles.general}>
          <NumberItem title={totalShipments} des={'Number of Shipments'} />
          <NumberItem title={`$ ${formatNumberWithUnit(averageValue)}`} des={'Average Value'} />
        </div>
        <div className={styles.chart}>
          <div className={styles.yAxisLabel}>Shipping volume</div>
          <div className={styles.chartLayout}>
            <div className={styles.chartContainer}>
              <Line data={data} options={options} width={622} height={150} />
            </div>
            <div className={styles.xAxisLabel}>Date</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineChart
