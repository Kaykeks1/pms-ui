import { useState, useEffect } from 'react';
import { faAlignLeft, faClock, faDumbbell, faExclamationTriangle, faTrafficLight, faTasks, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from '../utils/formatDate';

const ProjectDetails = ({ }) => {
    const [taskForm, setTaskForm] = useState({
        description: '',
        due_date: '',
        is_completed: '',
    });
    const [projectDetails, setProjectDetails] = useState({
        title: '',
        description: '',
        priority: '',
        effort: '',
        status: '',
        createdAt: '',
        deadline: '',
        tasks: [
            { description: 'tst', due_date: formatDate.normal("2022-12-10T00:00:00.000Z"), is_completed: 'not-completed' },
            { description: 'tst', due_date: formatDate.normal("2022-12-10T00:00:00.000Z"), is_completed: 'not-completed' },
            { description: 'tst', due_date: formatDate.normal("2022-12-10T00:00:00.000Z"), is_completed: 'not-completed' },
        ],
    });
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
        console.log({ taskForm, projectDetails })
    }, [taskForm, projectDetails])
    const handleDetailsChange = (event) => {
        const name = event.target.name
        if (name === 'description'
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
    return (
        <div className="p-5">
            <div className='flex justify-between mb-5'>
                <h1 className="text-3xl">This is the title</h1>
                <div className="cursor-pointer bg-violet-600 text-white rounded-md p-2">Save</div>
            </div>
            <div className="flex my-9">
                <div className='flex items-center w-3/12'>
                    <FontAwesomeIcon icon={faAlignLeft} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Description</p>
                </div>
                <input className="focus:outline-0" type="text" name="description" placeholder='Empty' value={projectDetails.description} onChange={handleDetailsChange} />
            </div>
            <div className="flex my-9">
                <div className='flex items-center w-3/12'>
                    <FontAwesomeIcon icon={faExclamationTriangle} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Priority</p>
                </div>
                <select className='focus:outline-0 bg-transparent' name="priority" value={projectDetails.priority} onChange={handleDetailsChange}>
                    <option disabled value=''> -- select an option -- </option>
                    {
                        priorityOptions.map(({ label, value }, key) => <option key={key} value={value}>{label}</option>)
                    }
                </select>
            </div>
            <div className="flex my-9">
                <div className='flex items-center w-3/12'>
                    <FontAwesomeIcon icon={faDumbbell} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Effort</p>
                </div>
                <select className='focus:outline-0 bg-transparent' name="effort" value={projectDetails.effort} onChange={handleDetailsChange}>
                    <option disabled value=''> -- select an option -- </option>
                    {
                        effortOptions.map(({ label, value }, key) => <option key={key} value={value}>{label}</option>)
                    }
                </select>
            </div>
            <div className="flex my-9">
                <div className='flex items-center w-3/12'>
                    <FontAwesomeIcon icon={faTrafficLight} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Status</p>
                </div>
                <select className='focus:outline-0 bg-transparent' name="status" value={projectDetails.status} onChange={handleDetailsChange}>
                    <option disabled value=''> -- select an option -- </option>
                    {
                        statusOptions.map(({ label, value }, key) => <option value={value} key={key}>{label}</option>)
                    }
                </select>
            </div>
            <div className="flex my-9">
                <div className='flex items-center w-3/12'>
                    <FontAwesomeIcon icon={faClock} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Created at</p>
                </div>
                Created at
            </div>
            <div className="flex my-9">
                <div className='flex items-center w-3/12'>
                    <FontAwesomeIcon icon={faClock} className='mr-3 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Deadline</p>
                </div>
                <input className="focus:outline-0" type="date" name="deadline" placeholder='Empty' value={projectDetails.deadline} onChange={handleDetailsChange} />
            </div>
            <div className="flex my-9">
                <div className='flex w-3/12'>
                    <FontAwesomeIcon icon={faTasks} className='cursor-pointer mr-3 mt-1 text-gray-600 text-sm' />
                    <p className="text-gray-600 text-sm font-bold">Tasks</p>
                </div>
                <div className='w-9/12'>
                    <form className="flex flex-col" onSubmit={addTask}>
                        <div className="flex justify-between">
                            <div className='w-5/12'>
                                <small>Description</small>
                                <input className="border-solid border-black border h-10 rounded p-2 w-full" type="text" name="description" placeholder='Empty' value={taskForm.description} onChange={handleTaskFormChange} />
                            </div>
                            <div className='w-5/12'>
                                <small>Due date</small>
                                <input className="border-solid border-black border h-10 rounded p-2 w-full" type="date" name="due_date" placeholder='Empty' value={taskForm.due_date} onChange={handleTaskFormChange} />
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <div className='w-5/12'>
                                <small>Status</small>
                                <select className='border-solid border-black border h-10 rounded p-2 w-full' value={taskForm.is_completed} onChange={handleTaskFormChange}>
                                    <option disabled value=''> -- select an option -- </option>
                                    <option value="completed">Completed</option>
                                    <option value="not-completed">Not Completed</option>
                                </select>
                            </div>
                            <button className="w-5/12 border-solid border-violet-600 border-2 text-violet-600 rounded-md h-7 self-end" type='submit'>
                                Add
                                <FontAwesomeIcon icon={faPlus} className='text-violet-600 ml-2' />
                            </button>
                        </div>
                    </form>
                    <table className="w-full border-collapse mt-7">
                        <thead>
                            <tr>
                                <th>Due date</th>
                                <th>Status</th>
                                <th>Description</th>
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
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
