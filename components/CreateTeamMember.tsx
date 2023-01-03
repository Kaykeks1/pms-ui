import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { faAlignLeft, faClock, faDumbbell, faExclamationTriangle, faTrafficLight, faTasks, faPlus, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from '../utils/formatDate';
import axios from 'axios';
import { isEqual, isEmpty } from 'lodash';

const ProjectDetails = forwardRef(({  }, ref) => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        role: '',
    });
    const [saveStatus, setSaveStatus] = useState(false)
    useEffect(() => {
        if (form.firstName && form.lastName && form.role) {
            setSaveStatus(true)
        } else {
            setSaveStatus(false)
        }
    }, [form])
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    const save = async () => {
        try {
            // const user = localStorage.getItem('user');
            // const token = localStorage.getItem('token');
            // const organization_id = user && JSON.parse(user).organizations[0].id
            // const payload = {
            //     ...projectDetails,
            //     deadline: new Date(projectDetails.deadline),
            //     tasks: projectDetails.tasks.map(i => ({ ...i, is_completed: i.is_completed === 'completed', due_date: new Date(i.due_date) }))
            // }
            // for (const key in payload) {
            //     if (!payload[key]) {
            //         delete payload[key]
            //     }
            // }
            // delete payload.createdAt
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // const response = await axios.patch(`http://127.0.0.1:3001/organization/${organization_id}/project/edit/${projectId}`, payload)
            // const data = response.data
          } catch (e) {
            console.log({e})
          }
    }
    return (
        // <div className="p-5">
            <form className="p-5" onSubmit={save}>
                <div className='flex justify-between mb-5'>
                    <h1 className='text-3xl'>Create Team Member</h1>
                    <button disabled={!saveStatus} type='submit' className={`${saveStatus ? 'bg-violet-600' : 'bg-violet-300'} text-white rounded-md p-2`}>
                        SAVE
                        <FontAwesomeIcon icon={faSave} className='ml-2' />
                    </button>
                </div>

                <div className="mb-4">
                    <label>First Name:</label>
                    <input className="border-solid border-black border h-10 rounded p-2 w-full mt-2" type="text" name="firstName" value={form.firstName} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label>Last Name:</label>
                    <input className="border-solid border-black border h-10 rounded p-2 w-full mt-2" type="text" name="lastName" value={form.lastName} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label>Role:</label>
                    <select className='border-solid border-black border h-10 rounded p-2 w-full mt-2' name="role" value={form.role} onChange={handleChange}>
                        <option disabled value=''> -- select an option -- </option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
            </form>
        // </div>
    )
})

export default ProjectDetails
