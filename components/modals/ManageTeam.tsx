import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { faAlignLeft, faClock, faTrafficLight, faTasks, faSave, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from '../../utils/formatDate';
import axios from 'axios';
import { isEqual, isEmpty } from 'lodash';
import MultiSelect from '../multi-select/MultiSelect';

const ManageTeam = forwardRef(({ }, ref) => {
    
    useImperativeHandle(ref, () => ({
        async open2(projectId) {
            await getTasks(projectId)
            // setSaveStatus(false)
            setSaveStatus(true)
        },
    }));
    useEffect(() => {
        fetchTeam()
    }, [])
    // const checkForChange = () => {
    //     const hasChanged = !isEqual(projectDetails, initialDetails)
    //     if (hasChanged) {
    //         setSaveStatus(true)
    //     } else {
    //         setSaveStatus(false)
    //     }
    // }
    const [saveStatus, setSaveStatus] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [team, setTeam] = useState([]);
    const handleMemberSelection = (item, taskIdx) => {
        // todo: Make multi select list homogenous (i.e. like a set). Do this is in the multiselect component
        const taskItem = tasks[taskIdx]
        setTasks([
            ...tasks.slice(0, taskIdx),
            {
                ...taskItem,
                teamMembers: [
                    ...taskItem.teamMembers,
                    { id: item.value, name: item.label },
                ]
            },
            ...tasks.slice(taskIdx + 1, tasks.length),
        ])
    }
    const handleMemberRemoval = (index, taskIdx) => {
        const taskItem = tasks[taskIdx]
        setTasks([
                ...tasks.slice(0, taskIdx),
                {
                    ...taskItem,
                    teamMembers: [
                        ...taskItem.teamMembers.slice(0, index),
                        ...taskItem.teamMembers.slice(index + 1, taskItem.teamMembers.length),
                    ]
                },
                ...tasks.slice(taskIdx + 1, tasks.length),
            ])
    }
    const getTasks = async (project_id) => {
        try {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            const organization_id = user && JSON.parse(user).organizations[0].id
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://127.0.0.1:3001/organization/${organization_id}/task/project/${project_id}`)
            const data = response.data
            setTasks(data)
        } catch (e) {
            console.log({ e })
        }
    }
    const fetchTeam = async () => {
        try {
          const user = localStorage.getItem('user');
          const token = localStorage.getItem('token');
          const organization_id = user && JSON.parse(user).organizations[0].id
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`http://127.0.0.1:3001/organization/${organization_id}/team/all`)
          const data = response.data
          setTeam(data)
        } catch (e) {
          console.log({ e })
        }
    }
    const saveTeam = async () => {
        try {
          const user = localStorage.getItem('user');
          const token = localStorage.getItem('token');
          const organization_id = user && JSON.parse(user).organizations[0].id
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const payload = {
            tasksWithTeam: tasks.map(item => ({ id: item.id, team: item.teamMembers.map(i => ({ id: Number(i.id) })) }))
          }
          await axios.patch(`http://127.0.0.1:3001/organization/${organization_id}/task/update-team`, payload)
        } catch (e) {
          console.log({ e })
        }
    }
    return (
        <div className="p-5">
            <div className='flex justify-between mb-7'>
                <h1 className="focus:outline-0 text-3xl">Team</h1>
                <button disabled={!saveStatus} className={`${saveStatus ? 'bg-violet-600' : 'bg-violet-300'} text-white rounded-md p-2`} onClick={saveTeam}>
                    SAVE
                    <FontAwesomeIcon icon={faSave} className='ml-2' />
                </button>
            </div>
            <div className='flex flex-col'>
                {
                    tasks.map((item, key) => (
                        <div key={key} className="flex flex-wrap mb-2 border-t-2 px-5 py-5">
                            <div className="flex flex-col w-2/4 mb-4">
                                <div className='flex items-center mb-2'>
                                    <FontAwesomeIcon icon={faClock} className='mr-3 text-gray-600 text-sm' />
                                    <p className="text-gray-600 text-sm font-bold">Due date</p>
                                </div>
                                <div>
                                    {formatDate.normal3(item.due_date)}
                                </div>
                            </div>
                            <div className="flex flex-col w-2/4 mb-4">
                                <div className='flex items-center mb-2'>
                                    <FontAwesomeIcon icon={faTrafficLight} className='mr-3 text-gray-600 text-sm' />
                                    <p className="text-gray-600 text-sm font-bold">Status</p>
                                </div>
                                <div>
                                    {item.is_completed ? 'Completed' : 'Not completed'}
                                </div>
                            </div>
                            <div className="flex flex-col w-2/4 mb-4">
                                <div className='flex items-center mb-2'>
                                    <FontAwesomeIcon icon={faAlignLeft} className='mr-3 text-gray-600 text-sm' />
                                    <p className="text-gray-600 text-sm font-bold">Description</p>
                                </div>
                                <div>
                                    {item.description}
                                </div>
                            </div>
                            <div className="flex flex-col w-2/4 mb-4">
                                <div className='flex items-center mb-2'>
                                    <FontAwesomeIcon icon={faUserCog} className='mr-3 text-gray-600 text-sm' />
                                    <p className="text-gray-600 text-sm font-bold">Members</p>
                                </div>
                                <div>
                                    <MultiSelect
                                        // list={[{value: 1, label: 'One'}, {value: 2, label: 'Two'}]}
                                        list={team.map(i => ({ label: `${i.firstName} ${i.lastName}`, value: i.id }))}
                                        addSelection={(item_) => handleMemberSelection(item_, key)}
                                        removeSelection={(idx) => handleMemberRemoval(idx, key)}
                                        selections={item.teamMembers.map(i => (i.name ? { label: i.name, value: i.id } : { label: `${i.firstName} ${i.lastName}`, value: i.id }))}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
})

export default ManageTeam
