import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { faAlignLeft, faClock, faDumbbell, faExclamationTriangle, faTrafficLight, faTasks, faPlus, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDate from '../../utils/formatDate';
import axios from 'axios';
import { isEqual, isEmpty } from 'lodash';


interface ChildProps {
    onCreateMember: Function
  }
  

const ProjectDetails = forwardRef((props: ChildProps, ref) => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        role: '',
    });
    const [saveStatus, setSaveStatus] = useState(false)
    const [isTaskFormCompleted, setTaskFormBtnStatus] = useState(false);
    useImperativeHandle(ref, () => ({
        async open2(projectId) {
            setForm({
                firstName: '',
                lastName: '',
                role: '',
            });
        },
    }));
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
    const save = (e) => {
        e.preventDefault()
        props.onCreateMember(form)
    }
    return (
        // <div className="p-5">
            <form className="p-5" onSubmit={save}>
                <div className='flex justify-between mb-5'>
                    <h1 className='text-2xl'>Create Team Member</h1>
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
