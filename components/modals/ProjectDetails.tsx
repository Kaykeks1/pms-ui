import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { faAlignLeft, faClock, faDumbbell, faExclamationTriangle, faTrafficLight, faTasks, faPlus, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from '../../utils/formatDate';
import axios from 'axios';
import { isEqual, isEmpty } from 'lodash';

const ProjectDetails = forwardRef(({  }, ref) => {
    const defaultDetails = {
        title: '',
        description: '',
        priority: '',
        effort: '',
        status: '',
        createdAt: '',
        deadline: '',
        tasks: [],
    }
    const [taskForm, setTaskForm] = useState({
        description: '',
        due_date: '',
        is_completed: '',
    });
    const [initialDetails, setInitialDetails] = useState({});
    const [projectDetails, setProjectDetails] = useState(defaultDetails);
    const [projectId, setProjectId] = useState();
    const [saveStatus, setSaveStatus] = useState(false);
    const [isTaskFormCompleted, setTaskFormBtnStatus] = useState(false);
    useImperativeHandle(ref, () => ({
        async open2(projectId) {
            setProjectDetails(defaultDetails)
            await getProject(projectId)
            setSaveStatus(false)
            setTaskForm({
                description: '',
                due_date: '',
                is_completed: '',
            });
        },
    }));
    const priorityOptions = [
        { label: 'Nice', value: 'nice' },
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Critical', value: 'critical' },
    ];
    const effortOptions = [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
    ];
    const statusOptions = [
        { label: 'Not Started', value: 'not_started' },
        { label: 'Started', value: 'started' },
        { label: 'Delayed', value: 'delayed' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on_hold' },
    ];
    useEffect(() => {
        if (!isEmpty(initialDetails)) {
            checkForChange()
        }
    }, [initialDetails, projectDetails])
    useEffect(() => {
        if (taskForm.description && taskForm.due_date && taskForm.is_completed) {
            setTaskFormBtnStatus(true)
        } else {
            setTaskFormBtnStatus(false)
        }
    }, [taskForm])
    const handleDetailsChange = (event) => {
        const name = event.target.name
        if (name === 'title'
            || name === 'description'
            || name === 'priority'
            || name === 'effort'
            || name === 'status'
            || name === 'deadline'
        ) {
            setProjectDetails({ ...projectDetails, [name]: event.target.value });
        }
    }
    const handleTasksDetailsChange = (event, index) => {
        const name = event.target.name
        if (name === 'description'
            || name === 'due_date'
            || name === 'is_completed'
        ) {
            setProjectDetails({
                ...projectDetails,
                tasks: [
                    ...projectDetails.tasks.slice(0, index),
                    {
                        ...projectDetails.tasks[index],
                        [event.target.name]: event.target.value
                    },
                    ...projectDetails.tasks.slice(index + 1, projectDetails.tasks.length)
                ]
            });
        }
    }
    const handleTaskFormChange = (event) => {
        const name = event.target.name
        if (name === 'description'
            || name === 'due_date'
            || name === 'is_completed'
        ) {
            setTaskForm({ ...taskForm, [name]: event.target.value });
        }
    }

    const addTask = (e) => {
        e.preventDefault();
        setProjectDetails({
            ...projectDetails,
            tasks: [
                ...projectDetails.tasks,
                taskForm,
            ]
        })
        setTaskForm({
            description: '',
            due_date: '',
            is_completed: '',
        });
    }
    const deleteTask = (key) => {
        setProjectDetails({
            ...projectDetails,
            tasks: [
                ...projectDetails.tasks.slice(0, key),
                ...projectDetails.tasks.slice(key + 1, projectDetails.tasks.length)
            ]
        })
    }
    const getProject = async (project_id) => {
        try {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            const organization_id = user && JSON.parse(user).organizations[0].id
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://127.0.0.1:3001/organization/${organization_id}/project/details/${project_id}`)
            const data = response.data
            const project = {
                ...projectDetails,
                title: data.title || '',
                description: data.description || '',
                priority: data.priority || '',
                effort: data.effort || '',
                status: data.status || '',
                createdAt: data.createdAt && formatDate.normal2(data.createdAt),
                deadline: data.deadline ? formatDate.normal(data.deadline) : '',
                tasks: data.tasks.map(i => ({ description: i.description, due_date: formatDate.normal(i.due_date), is_completed: i.is_completed ? 'completed' : 'not-completed', id: i.id }))
            }
            setProjectDetails(project)
            setInitialDetails(project)
            setProjectId(data.id)
        } catch (e) {
            console.log({ e })
        }
    }
    const checkForChange = () => {
        const hasChanged = !isEqual(projectDetails, initialDetails)
        if (hasChanged) {
            setSaveStatus(true)
        } else {
            setSaveStatus(false)
        }
    }
    const saveDetails = async () => {
        try {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            const organization_id = user && JSON.parse(user).organizations[0].id
            const payload = {
                ...projectDetails,
                deadline: new Date(projectDetails.deadline),
                tasks: projectDetails.tasks.map(i => ({
                    id: i.id && i.id,
                    description: i.description,
                    is_completed: i.is_completed === 'completed',
                    due_date: new Date(i.due_date),
                }))
            }
            for (const key in payload) {
                if (!payload[key]) {
                    delete payload[key]
                }
            }
            delete payload.createdAt
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.patch(`http://127.0.0.1:3001/organization/${organization_id}/project/edit/${projectId}`, payload)
            const data = response.data
            await getProject(projectId)
            return data
          } catch (e) {
            console.log({e})
            return false
          }
    }
    return (
        <div className="p-5">
            <div className='flex flex-col-reverse sm:flex-row justify-between mb-5'>
                <input className="focus:outline-0 text-2xl smtext-3xl" type="text" name="title" placeholder='Empty' value={projectDetails.title} onChange={handleDetailsChange} />
                <button disabled={!saveStatus} className={`${saveStatus ? 'bg-violet-600' : 'bg-violet-300'} text-white rounded-md p-2 mb-3 sm:mb-0`} onClick={saveDetails}>
                    SAVE
                    <FontAwesomeIcon icon={faSave} className='ml-2' />
                </button>
            </div>
            <div className="flex flex-col sm:flex-row my-9">
                <div className='flex items-center sm:w-3/12'>
                    <FontAwesomeIcon icon={faAlignLeft} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Description</p>
                </div>
                <input className="focus:outline-0 mt-2 sm:mt-0" type="text" name="description" placeholder='Empty' value={projectDetails.description} onChange={handleDetailsChange} />
            </div>
            <div className="flex flex-col sm:flex-row my-9">
                <div className='flex items-center sm:w-3/12'>
                    <FontAwesomeIcon icon={faExclamationTriangle} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Priority</p>
                </div>
                <select className='focus:outline-0 bg-transparent mt-2 sm:mt-0' name="priority" value={projectDetails.priority} onChange={handleDetailsChange}>
                    <option disabled value=''> -- select an option -- </option>
                    {
                        priorityOptions.map(({ label, value }, key) => <option key={key} value={value}>{label}</option>)
                    }
                </select>
            </div>
            <div className="flex flex-col sm:flex-row my-9">
                <div className='flex items-center sm:w-3/12'>
                    <FontAwesomeIcon icon={faDumbbell} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Effort</p>
                </div>
                <select className='focus:outline-0 bg-transparent mt-2 sm:mt-0' name="effort" value={projectDetails.effort} onChange={handleDetailsChange}>
                    <option disabled value=''> -- select an option -- </option>
                    {
                        effortOptions.map(({ label, value }, key) => <option key={key} value={value}>{label}</option>)
                    }
                </select>
            </div>
            <div className="flex flex-col sm:flex-row my-9">
                <div className='flex items-center sm:w-3/12'>
                    <FontAwesomeIcon icon={faTrafficLight} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Status</p>
                </div>
                <select className='focus:outline-0 bg-transparent mt-2 sm:mt-0' name="status" value={projectDetails.status} onChange={handleDetailsChange}>
                    <option disabled value=''> -- select an option -- </option>
                    {
                        statusOptions.map(({ label, value }, key) => <option value={value} key={key}>{label}</option>)
                    }
                </select>
            </div>
            <div className="flex flex-col sm:flex-row my-9">
                <div className='flex items-center sm:w-3/12'>
                    <FontAwesomeIcon icon={faClock} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Created at</p>
                </div>
                <p className='mt-2 sm:mt-0'>
                    {projectDetails.createdAt}
                </p>
            </div>
            <div className="flex flex-col sm:flex-row my-9">
                <div className='flex items-center sm:w-3/12'>
                    <FontAwesomeIcon icon={faClock} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Deadline</p>
                </div>
                <input className="focus:outline-0 mt-2 sm:mt-0" type="date" name="deadline" placeholder='Empty' value={projectDetails.deadline} onChange={handleDetailsChange} />
            </div>
            <div className="flex flex-col my-9">
                <div className='flex w-full mb-4'>
                    <FontAwesomeIcon icon={faTasks} className='cursor-pointer mr-3 mt-1 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Tasks</p>
                </div>
                <div className='w-full'>
                    <form className="flex flex-col" onSubmit={addTask}>
                        <div className="flex flex-col sm:flex-row justify-between">
                            <div className='sm:w-5/12'>
                                <small>Description</small>
                                <input className="border-solid border-black border h-10 rounded p-2 w-full" type="text" name="description" placeholder='Empty' value={taskForm.description} onChange={handleTaskFormChange} />
                            </div>
                            <div className='sm:w-5/12 mt-3 sm:mt-0'>
                                <small>Due date</small>
                                <input className="border-solid border-black border h-10 rounded p-2 w-full" type="date" name="due_date" placeholder='Empty' value={taskForm.due_date} onChange={handleTaskFormChange} />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between mt-3">
                            <div className='sm:w-5/12'>
                                <small>Status</small>
                                <select className='border-solid border-black border h-10 rounded p-2 w-full' name="is_completed" value={taskForm.is_completed} onChange={handleTaskFormChange}>
                                    <option disabled value=''> -- select an option -- </option>
                                    <option value="completed">Completed</option>
                                    <option value="not-completed">Not Completed</option>
                                </select>
                            </div>
                            <button disabled={!isTaskFormCompleted} className={`w-full sm:w-5/12 mt-5 sm:mt-0 border-solid ${isTaskFormCompleted ? 'border-violet-600 text-violet-600' : 'border-violet-300 text-violet-300'} border-2  rounded-md h-7 self-end`} type='submit'>
                                Add
                                <FontAwesomeIcon icon={faPlus} className={`${isTaskFormCompleted ? 'text-violet-600' : 'text-violet-300'} ml-2`} />
                            </button>
                        </div>
                    </form>
                    <div className='overflow-x-auto'>
                        <table className="w-full border-collapse mt-7">
                            <thead>
                                <tr>
                                    <th>Due date</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projectDetails.tasks.map((item, key) => 
                                        <tr key={key}>
                                            <td><input className="focus:outline-0 bg-transparent w-full" type="date" name="due_date" placeholder='Empty' value={item.due_date} onChange={event => handleTasksDetailsChange(event, key)} /></td>
                                            <td>
                                                <select className='focus:outline-0 bg-transparent w-full' name="is_completed" value={item.is_completed} onChange={event => handleTasksDetailsChange(event, key)}>
                                                    <option disabled value=''> -- select an option -- </option>
                                                    <option value="completed">Completed</option>
                                                    <option value="not-completed">Not Completed</option>
                                                </select>
                                            </td>
                                            <td><input className="focus:outline-0 bg-transparent w-full" type="text" name="description" placeholder='Empty' value={item.description} onChange={event => handleTasksDetailsChange(event, key)} /></td>
                                            <td>
                                                <button className='p-1 border-solid border-red-600 text-red-600 border-2 rounded-md self-end' onClick={() => deleteTask(key)}>
                                                    Delete
                                                    <FontAwesomeIcon icon={faTrashAlt} className='text-red-600 ml-2' />
                                                </button>
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
    )
})

export default ProjectDetails
