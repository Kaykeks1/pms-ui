import MainLayout from '../../components/layouts/MainLayout'
import styles from '../../styles/overview.module.css';
import { faPlus, faTimes, faSave, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect } from 'react';
import { LineChart, PieChart } from 'react-chartkick'
import 'chartkick/chart.js'

const Overview = () => {
  const initialNumbers = [
    { label: 'Tasks done', value: 150 },
    { label: 'Number of tasks', value: 150 },
    { label: 'Number of members', value: 150 },
  ]
  const [numbers, setNumbers] = useState(initialNumbers);
  const initialStatusChart = [["not_started", 44], ["started", 23], ["delayed", 44], ["completed", 23], ["on_hold", 44]]
  const [statusChart, setStatusChart] = useState(initialStatusChart);
  const legend = ['not_started', 'started', 'delayed', 'completed', 'on_hold']
  const PieChartColors = ['#4B7BE5', '#A85CF9', '#5534A5', '#6FDFDF', '#F1EEF6']
  
  return (
    <MainLayout title="Overview" pageTitle="Analytics">
      <div className={styles['analytics-overview']}>
        <div className={styles['left-metrics']}>
          <div className={styles['numbers']}>
            {
              numbers.map((i, key) =>
                <div key={key} className={styles['number']}>
                  <div className={styles['icon']}><FontAwesomeIcon icon={faSave} className={styles['']} /></div>
                  <div>
                    <p className={styles['label']}>{i.label}</p>
                    <p className={styles['value']}>{i.value}</p>
                  </div>
                  <div className={styles['line']} />
                </div>
              ) 
            }
          </div>
          <div className={styles['pie-chart']}>
            <PieChart
              data={statusChart}
              donut
              legend={false}
              colors={PieChartColors}
            />
            <div className={styles['legends']}>
              {
                legend.map((i, key) =>
                  <div key={key} className={styles['legend']}>
                    <div className={styles['color']} style={{backgroundColor: PieChartColors[key]}} /> <p>{i}</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className={styles['right-metrics']}>
          <div className={styles['line-chart']}></div>
          <div className={styles['latest-list']}></div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Overview
