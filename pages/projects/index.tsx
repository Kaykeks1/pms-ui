import MainLayout from '../../components/layouts/MainLayout';
import Modal from '../../components/modals/Modal';
import ProjectDetails from '../../components/modals/ProjectDetails';
import ManageTeam from '../../components/modals/ManageTeam';
import styles from '../../styles/projects.module.css';
import { useState, useRef, useEffect } from 'react';
import { faPlus, faTimes, faSave, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import formatDate from '../../utils/formatDate';

const Projects = () => {
  const statusOptions = [
    { label: 'Not Started', value: 'not_started' },
    { label: 'Started', value: 'started' },
    { label: 'Delayed', value: 'delayed' },
    { label: 'Completed', value: 'completed' },
    { label: 'On Hold', value: 'on_hold' },
  ];
  const priorityOptions = {
    nice: 'Nice',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical'
  }
  const effortOptions = {
    small: 'Small',
    medium: 'Medium',
    large: 'Large'
  }
  const [projects, setProjectsFromAPI] = useState([]);
  const intialProjectLists = statusOptions.map(i => ({ title: i.label, items: projects.filter(project => project.status === i.value) }))
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
  const ref = useRef() as any;
  let ref1 = Object.assign({}, ref)
  let ref2 = Object.assign({}, ref)
  let ref3 = Object.assign({}, ref)
  let ref4 = Object.assign({}, ref)
  useEffect(() => {
    fetchProjects()
  }, [])
  useEffect(() => {
      setProjectLists(intialProjectLists)
  }, [projects])
  const onDrag = (event, project, listTitle) => {
    event.preventDefault();
    setDraggedTask({ from: listTitle, item: project });
  }
  const onDragOver = (event) => {
    event.preventDefault();
  }
  const onDrop = async (event, toListTitle) => {
    const fromListTitle = draggedTask.from;
    if (toListTitle === fromListTitle) return;
    const projectSlug = statusOptions.find(i => i.label === toListTitle)
    const updateSuccessful = await updateStatus(draggedTask.item.id, projectSlug.value);
    if (!updateSuccessful) return;
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
  const openModal = (projectId) => {
    ref1.current.open()
    ref2.current.open2(projectId)
  }
  const createProject = async () => {
    if (!newProjectTitle) return
    toggleCreateInput(false)
    await addProject()
    setNewProjectTitle('')
    await fetchProjects()
  }
  const updateStatus = async (project_id, status) => {
    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const organization_id = user && JSON.parse(user).organizations[0].id
      const payload = { status }
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.patch(`http://127.0.0.1:3001/organization/${organization_id}/project/edit/${project_id}`, payload)
      const data = response.data
      return true
    } catch (e) {
      console.log({e})
      return false
    }
  }

  const addProject = async () =>  {
    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const organization_id = user && JSON.parse(user).organizations[0].id
      const payload = { title: newProjectTitle }
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post(`http://127.0.0.1:3001/organization/${organization_id}/project/create`, payload)
      const data = response.data
    } catch (e) {
      console.log({ e })
    }
  }
  const fetchProjects = async () => {
    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const organization_id = user && JSON.parse(user).organizations[0].id
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`http://127.0.0.1:3001/organization/${organization_id}/project/all`)
      const data = response.data
      setProjectsFromAPI(data)
    } catch (e) {
      console.log({ e })
    }
  }
  const openTeamModal = (e, projectId) => {
    if (e && e.stopPropagation) e.stopPropagation();
    ref3.current.open()
    ref4.current.open2(projectId)
  }
  const onClose = async () => {
    await fetchProjects()
  }
  return(
    <MainLayout title="Projects" pageTitle="Projects">
      <Modal name='Details' ref={ref1} key={1} onClose={onClose}>
        <ProjectDetails ref={ref2} />
      </Modal>
      <Modal name='Team' ref={ref3} key={2} onClose={onClose}>
        <ManageTeam ref={ref4} />
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
            <div className={styles["list-body"]}>
            {
              item.items.map((project, key2) => (
                <div onClick={() => openModal(project.id)} key={key2} className={styles["list-item"]} draggable onDrag={(event) => onDrag(event, project, item.title)}>
                  <div className={styles['list-item-head']}>
                    <FontAwesomeIcon icon={faUserCog} className='cursor-pointer text-green' onClick={(e) => openTeamModal(e, project.id)} />
                    <p>{project.title}</p>
                  </div>
                  <div className={styles['list-item-body']}>
                    <div>
                      <p>Priority: </p><p><span className={`priority ${project.priority}-priority`}>{project.priority ? priorityOptions[project.priority] : '--'}</span></p>
                    </div>
                    <div>
                      <p>Effort: </p><p>{project.effort ? effortOptions[project.effort] : '--'}</p>
                    </div>
                    <div>
                      <p>No of tasks: </p><p>{project.no_of_tasks ? project.no_of_tasks : '--'}</p>
                    </div>
                    <div>
                      <p>Due date: </p><p>{project.deadline ? formatDate.normal(project.deadline) : '--'}</p>
                    </div>
                  </div>
                </div>
              ))
            }
            </div>
          </div>
          ))
        }
      </div>
    </MainLayout>
  )
}
export default Projects
