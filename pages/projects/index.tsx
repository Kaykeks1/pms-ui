import MainLayout from '../../components/MainLayout';
import Modal from '../../components/Modal';
import ProjectDetails from '../../components/ProjectDetails';
import styles from '../../styles/projects.module.css';
import { useState, useRef } from 'react';
import { faPlus, faTimes, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// export const getServerSideProps = async (context) => {
//   try {
//     const token = context.req.cookies['token']
//     const user = context.req.cookies['user']
//     const organization_id = user && JSON.parse(user).organizations[0].id
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     const response = await axios.get(`http://127.0.0.1:3001/organization/${organization_id}/project/all`)
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

const Projects = () => {
  const intialProjectLists = [
    {
      title: 'Not Started',
      items: [
        { id: '01', title: '01'},
        { id: '02', title: '02'},
        { id: '03', title: '03'},
        { id: '04', title: '04'}
      ]
    },
    {
      title: 'Started',
      items: [{ id: '11', title: '11'}]
    },
    {
      title: 'Delayed',
      items: [{ id: '22', title: '22'}]
    },
    {
      title: 'Completed',
      items: [{ id: '33', title: '33'}]
    },
    {
      title: 'On Hold',
      items: [{ id: '44', title: '44'}]
    },
  ]
  interface DraggedTask {
    from: string
    item: {
      id: string;
      title: string;
    };
  }
  const [projectLists, setProjectLists] = useState(intialProjectLists);
  const [draggedTask, setDraggedTask] = useState<DraggedTask>({ from: '', item: { id: '', title: '' } });
  const [showCreateInput, toggleCreateInput] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  // const [draggedTask, setDraggedTask] = useState({ from: '', item: { id: '', title: '' } });
  const ref = useRef() as any;
  const onDrag = (event, project, listTitle) => {
    event.preventDefault();
    setDraggedTask({ from: listTitle, item: project });
  }
  const onDragOver = (event) => {
    event.preventDefault();
  }
  const onDrop = (event, toListTitle) => {
    const fromListTitle = draggedTask.from;
    const newProjectLists = projectLists.map(project => {
      if (toListTitle === fromListTitle) return project
      if (project.title === toListTitle) {
        return {
          ...project,
          items: [ ...project.items, draggedTask.item ]
        }
      }
      if (project.title === fromListTitle) {
        return {
          ...project,
          items: project.items.filter(i => i.id !== draggedTask.item.id)
        }
      }
      return project
    })
    setProjectLists(newProjectLists)
    setDraggedTask({ from: '', item: { id: '', title: '' } });
  }  
  const openModal = () => {
    ref.current.open()
  }
  const createProject = () => {
    toggleCreateInput(false)
  }
  return(
    <MainLayout title="Projects" pageTitle="Projects">
      <Modal title='Title' ref={ref}>
        <ProjectDetails />
      </Modal>
      <h1 className={styles["title-text"]}>Scrum Board</h1>
      <p className={styles["sub-text"]}>Scrum boards are visual project management tools that help Scrum teams visualize backlog items and work progress. This helps you track individual sprints and help team members visualize their progress.</p>
      <div className={styles["projects-container"]}>
        {
          projectLists.map((item, key1) => (
          <div  key={key1} className={styles["projects-list"]} onDrop={event => onDrop(event, item.title)} onDragOver={(event => onDragOver(event))}>
            <div className={styles["list-head"]}>
              <h1 className={styles["list-title"]}>{item.title}</h1>
              {
                (key1 === 0) && <div className='cursor-pointer' onClick={() => toggleCreateInput(!showCreateInput)} style={{ backgroundColor: showCreateInput ? 'red' : '#5534A5' }}>{showCreateInput ? 'Close' : 'Create'} <FontAwesomeIcon icon={showCreateInput ? faTimes : faPlus} className='text-white ml-2' /></div>
              }
            </div>
            {
              (key1 === 0 && showCreateInput)
                && <div className={styles['create-input-container']}>
                  <input type="text" name="newProjectTitle" placeholder='Project Title' value={newProjectTitle} onChange={event => setNewProjectTitle(event.target.value)} />
                  <FontAwesomeIcon icon={faSave} className='cursor-pointer text-green ml-2' onClick={createProject} />
                </div>
            }
            {
              item.items.map((project, key2) => (
                <div onClick={openModal} key={key2} className={styles["list-item"]} draggable onDrag={(event) => onDrag(event, project, item.title)}>
                  <div className={styles['list-item-head']}>
                    <p>Project {project.title}</p>
                    <div className='effort medium-effort'>Medium</div>
                  </div>
                  <div className={styles['list-item-body']}>
                    {/* <div>
                      <p>Effort: </p><p>Large</p>
                    </div> */}
                    <div>
                      <p>No of tasks: </p><p>5</p>
                    </div>
                    <div>
                      <p>Due date: </p><p>12/12/2022</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          ))
        }
      </div>
    </MainLayout>
  )
}
export default Projects
