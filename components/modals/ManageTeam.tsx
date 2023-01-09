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
            setSaveStatus(false)
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
    const [team, setTeam] = useState([]);
    const [members, setMembers] = useState([]);
    const handleMemberSelection = (item) => {
        // console.log({item})
        // Todo: set item.value to task form
        setMembers([...members, item])
    }
    const handleMemberRemoval = (index) => {
        setMembers([
                ...members.slice(0, index),
                ...members.slice(index + 1, members.length),
            ])
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
    return (
        <div className="p-5">
            <div className='flex justify-between mb-7'>
                <h1 className="focus:outline-0 text-3xl">Team</h1>
                <button disabled={!saveStatus} className={`${saveStatus ? 'bg-violet-600' : 'bg-violet-300'} text-white rounded-md p-2`}>
                    SAVE
                    <FontAwesomeIcon icon={faSave} className='ml-2' />
                </button>
            </div>
            <div className='flex flex-col'>
                {
                    [1, 1].map((i,k) => (
                        <div key={k} className="flex flex-wrap mb-2 border-t-2 px-3 py-5">
                            <div className="flex flex-col w-2/4 mb-3">
                                <div className='flex items-center'>
                                    <FontAwesomeIcon icon={faClock} className='mr-3 text-gray-600 text-sm' />
                                    <p className="text-gray-600 text-sm font-bold">Due date</p>
                                </div>
                                <div>
                                    Test
                                </div>
                            </div>
                            <div className="flex flex-col w-2/4 mb-3">
                                <div className='flex items-center'>
                                    <FontAwesomeIcon icon={faTrafficLight} className='mr-3 text-gray-600 text-sm' />
                                    <p className="text-gray-600 text-sm font-bold">Status</p>
                                </div>
                                <div>
                                    Test
                                </div>
                            </div>
                            <div className="flex flex-col w-2/4 mb-3">
                                <div className='flex items-center'>
                                    <FontAwesomeIcon icon={faAlignLeft} className='mr-3 text-gray-600 text-sm' />
                                    <p className="text-gray-600 text-sm font-bold">Description</p>
                                </div>
                                <div>
                                    Test
                                </div>
                            </div>
                            <div className="flex flex-col w-2/4 mb-3">
                                <div className='flex items-center'>
                                    <FontAwesomeIcon icon={faUserCog} className='mr-3 text-gray-600 text-sm' />
                                    <p className="text-gray-600 text-sm font-bold">Members</p>
                                </div>
                                <div>
                                    <MultiSelect
                                        // list={[{value: 1, label: 'One'}, {value: 2, label: 'Two'}]}
                                        list={team.map(i => ({ label: `${i.firstName} ${i.lastName}`, value: i.id }))}
                                        addSelection={handleMemberSelection}
                                        removeSelection={handleMemberRemoval}
                                        selections={members}
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
