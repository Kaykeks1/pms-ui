import MainLayout from '../../components/layouts/MainLayout'
import styles from '../../styles/overview.module.css';
import { faListUl, faTasks, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect } from 'react';
import { AreaChart, PieChart } from 'react-chartkick'
import 'chartkick/chart.js'
import axios from 'axios';

// export const getServerSideProps = async (context) => {
// export const getstaticprops = async (context) => {
//   try {
//     console.log('here')
//     const token = context.req.cookies['token']
//     const user = context.req.cookies['user']
//     const organization_id = user && JSON.parse(user).organizations[0].id
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     const response = await axios.get(`http://127.0.0.1:3001/organization/${organization_id}/statistics/overview`)
//     const data = response.data
//     console.log({data})

//     return {
//       props: { projects: data }
//     }
//   } catch(e) {
//     console.log({e})
//     return { props: {}}
//   }
// }

const Overview = () => {
  const initialNumbers = [
    { label: 'Tasks done', slug: 'completedTasksPercentage', value: 0, icon: faTasks },
    { label: 'Number of tasks', slug: 'totalTasks', value: 0, icon: faListUl },
    { label: 'Number of members', slug: 'totalMembers', value: 0, icon: faUsers },
  ]
  const initialStatusChart = [["not_started", 44], ["started", 23], ["delayed", 44], ["completed", 23], ["on_hold", 44]]
  const [numbers, setNumbers] = useState(initialNumbers);
  const [statusChart, setStatusChart] = useState(initialStatusChart);
  const [gradientFill, setGradientFill] = useState<CanvasGradient>();
  const legend = ['not_started', 'started', 'delayed', 'completed', 'on_hold']
  const PieChartColors = ['#4B7BE5', '#A85CF9', '#5534A5', '#6FDFDF', '#F1EEF6']

  useEffect(() => {
    fetchOverview()
    setGradientFill_()
  }, [])


  const setGradientFill_ = () => {
    if (!!document.getElementById('tasks-trend')) {
      const canvas = document.getElementById('tasks-trend').firstElementChild as HTMLCanvasElement;
      const ctx = canvas?.getContext("2d"); // canvas element
      const gradientFill_ = ctx.createLinearGradient(0, 270, 0, -100);
      gradientFill_.addColorStop(0, "#f5f5f5");
      gradientFill_.addColorStop(1, "#7c3aed");
      setGradientFill(gradientFill_);
    }
  }

  const fetchOverview = async () => {
    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const organization_id = user && JSON.parse(user).organizations[0].id
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`http://127.0.0.1:3001/organization/${organization_id}/statistics/overview`)
      const data = response.data
      const { percentageOfProjectsByStatus } = data
      setStatusChart(Object.keys(percentageOfProjectsByStatus).map(key => [key, percentageOfProjectsByStatus[key]]))
      setNumbers(numbers.map(i => ({ ...i, value: i.slug === 'completedTasksPercentage' ? `${data[i.slug]}%` : data[i.slug] })))
    } catch (e) {
      console.log({ e })
    }
  }

  const areachartDatasetOptions = {
    // backgroundColor: 'rgb(2,0,36)',
    backgroundColor: gradientFill,
    pointRadius: 0,
    borderColor: '#7c3aed',
  }

  const areachartLibraryOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
          drawBorder: false,
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        }
      },
      x: {
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
          display: false,
        },
      },
    },
  }
  
  const tasksDueWeeklyTrend = {"2021-01-01 00:00:00 -0800": 2, "2021-01-01 00:01:00 -0800": 5, "2021-01-01 00:02:00 -0800": 3, "2021-01-01 00:03:00 -0800": 7}

  return (
    <MainLayout title="Overview" pageTitle="Analytics">
      <div className={styles['analytics-overview']}>
        <div className={styles['left-metrics']}>
          <div className={styles['numbers']}>
            {
              numbers.map((i, key) =>
                <div key={key} className={styles['number']}>
                  <div className={styles['icon']}><FontAwesomeIcon icon={i.icon} className={styles['']} /></div>
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
          <div className={styles['line-chart']}>
            <p>Tasks trend</p>
            <AreaChart
              id="tasks-trend"
              data={tasksDueWeeklyTrend}
              dataset={areachartDatasetOptions}
              library={areachartLibraryOptions}
            />
          </div>
          <div className={styles['latest-list']}></div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Overview
