import MainLayout from '../../components/layouts/MainLayout'
import styles from '../../styles/overview.module.css';
import { faListUl, faTasks, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect } from 'react';
import { AreaChart, PieChart } from 'react-chartkick'
import 'chartkick/chart.js'
import axios from 'axios';
import formatDate from '../../utils/formatDate';

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
  const initialProjects = [
    // {
    //   createdAt: "2023-01-03T19:35:15.725Z",
    //   deadline: "2023-10-20T00:00:00.000Z",
    //   description: "Complete the task",
    //   effort: "small",
    //   id: 1,
    //   organizationId: 1,
    //   priority: "nice",
    //   status: "not_started",
    //   title: "Complete App",
    //   updatedAt: "2023-01-13T21:22:42.501Z"
    // },
  ]
  // const tasksDueWeeklyTrend = {"2021-01-01 00:00:00 -0800": 2, "2021-01-01 00:01:00 -0800": 5, "2021-01-01 00:02:00 -0800": 3, "2021-01-01 00:03:00 -0800": 7}
  const initialStatusChart = [["not_started", 44], ["started", 23], ["delayed", 44], ["completed", 23], ["on_hold", 44]]
  const [numbers, setNumbers] = useState(initialNumbers);
  const [statusChart, setStatusChart] = useState(initialStatusChart);
  const [statusTotal, setStatusTotal] = useState(0);
  const [latestProjects, setLatestProjects] = useState(initialProjects);
  const [tasksDueTrend, setTasksDueTrend] = useState({ [(new Date()).toDateString()]: 0 });
  const [gradientFill, setGradientFill] = useState<CanvasGradient>();
  const legend = ['not_started', 'started', 'delayed', 'completed', 'on_hold']
  const pieChartColors = ['#4B7BE5', '#A85CF9', '#5534A5', '#6FDFDF', '#F1EEF6'];

  useEffect(() => {
    fetchOverview()
    setGradientFill_()
  }, [])


  const setGradientFill_ = () => {
    if (!!document.getElementById('tasks-trend')) {
      const canvas = document.getElementById('tasks-trend').firstElementChild as HTMLCanvasElement;
      const ctx = canvas?.getContext("2d"); // canvas element
      if (!ctx) return
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
      const { percentageOfProjectsByStatus, mostDueProjects, taskTrend } = data
      setStatusChart(Object.keys(percentageOfProjectsByStatus).map(key => [key, percentageOfProjectsByStatus[key].value]))
      const listOfStatusCount = Object.values(percentageOfProjectsByStatus)
      interface projectStatusCountAndPercentage {
        value: number
        percentage: number
      }
      setStatusTotal(listOfStatusCount.reduce((acc: number, curr: projectStatusCountAndPercentage) => (acc + curr.value), 0) as number)
      setNumbers(numbers.map(i => ({ ...i, value: i.slug === 'completedTasksPercentage' ? `${Math.ceil(data[i.slug])}%` : data[i.slug] })))
      setLatestProjects(mostDueProjects)
      const getDate_ = (week, year) => {
        const WEEKS_IN_A_YEAR = 52
        const MONTHS_IN_A_YEAR = 12
        let month = Math.round((week * MONTHS_IN_A_YEAR) / WEEKS_IN_A_YEAR)
        return (new Date(year, month - 1)).toDateString()
      }
      const taskTrend_ = taskTrend.reduce((acc, cur) => ({ ...acc, [getDate_(cur.week, cur.year)]: cur.no_of_tasks_done }), {})
      setTasksDueTrend(taskTrend_)
    } catch (e) {
      console.log({ e })
    }
  }

  const areachartDatasetOptions = {
    // backgroundColor: 'rgb(2,0,36)',
    backgroundColor: gradientFill,
    pointRadius: 1,
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
            <p>Number of Projects</p>
            <div className={styles['pie-chart-container']}>
              <PieChart
                data={statusChart}
                donut
                legend={false}
                colors={pieChartColors}
              />
              <div className={styles['pie-chart-total']}>
                <p className={styles['total-titel']}>Total</p>
                <p>{statusTotal}</p>
              </div>
            </div>
            <div className={styles['legends']}>
              {
                legend.map((i, key) =>
                  <div key={key} className={styles['legend']}>
                    <div className={styles['color']} style={{backgroundColor: pieChartColors[key]}} /> <p>{i}</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className={styles['right-metrics']}>
          <div className={styles['line-chart']}>
            <p>Due tasks trend</p>
            <AreaChart
              id="tasks-trend"
              data={tasksDueTrend}
              dataset={areachartDatasetOptions}
              library={areachartLibraryOptions}
            />
          </div>
          <div className={styles['latest-project']}>
            <p>Most due Projects</p>
            <div>
              <table className="w-full border-collapse mt-7">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Due on</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    latestProjects.map((item, key) => 
                      <tr key={key}>
                        <td>{item.title || '--'}</td>
                        <td>{item.description || '--'}</td>
                        <td>{item.priority || '--'}</td>
                        <td>{formatDate.normal3(item.deadline) || '--'}</td>
                        <td>
                          <div className={styles['status']}>
                            <div style={{ backgroundColor: pieChartColors[legend.findIndex(i => i == item.status)] }}/>{item.status.replace('_', ' ')}
                          </div>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Overview
