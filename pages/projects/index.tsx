import MainLayout from '../../components/MainLayout';
import styles from '../../styles/projects.module.css';
import { useState } from 'react';

const Projects = () => {
  const intialProjectLists = [
    {
      title: 'Not Started',
      items: [
        { id: '01', description: '01'},
        { id: '02', description: '02'},
        { id: '03', description: '03'},
        { id: '04', description: '04'}
      ]
    },
    {
      title: 'Started',
      items: [{ id: '11', description: '11'}]
    },
    {
      title: 'Delayed',
      items: [{ id: '22', description: '22'}]
    },
    {
      title: 'Completed',
      items: [{ id: '33', description: '33'}]
    },
    {
      title: 'On Hold',
      items: [{ id: '44', description: '44'}]
    },
  ]
  interface DraggedTask {
    from: string
    item: {
      id: string;
      description: string;
    };
  }
  const [projectLists, setProjectLists] = useState(intialProjectLists);
  const [draggedTask, setDraggedTask] = useState<DraggedTask>({ from: '', item: { id: '', description: '' } });
  // const [draggedTask, setDraggedTask] = useState({ from: '', item: { id: '', description: '' } });
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
    setDraggedTask({ from: '', item: { id: '', description: '' } });
  }  
  return(
    <MainLayout title="Projects" pageTitle="Projects">
      <h1>Projects</h1>
      <div className={styles["projects-container"]}>
        {
          projectLists.map((item, key1) => (
          <div  key={key1} className={styles["projects-list"]} onDrop={event => onDrop(event, item.title)} onDragOver={(event => onDragOver(event))}>
            <div>
              <h1 className={styles["list-title"]}>{item.title}</h1>
              <div className={styles[""]}></div>
            </div>
            {
              item.items.map((project, key2) => (
                <div key={key2} className={styles["list-item"]} draggable onDrag={(event) => onDrag(event, project, item.title)}>{project.description}</div>
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
