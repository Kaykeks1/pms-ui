import MainLayout from '../../components/layouts/MainLayout';
import { faUser, faTag, faTasks, faClock, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/team.module.css';
import Modal from '../../components/modals/Modal';
import CreateTeamMember from '../../components/modals/CreateTeamMember';
import { useRef, useEffect, useState } from 'react'
import axios from 'axios';
import formatDate from '../../utils/formatDate';

const Team = () => {
  const [team, setTeam] = useState([])
  useEffect(() => {
    fetchTeam()
  }, [])
  const ref = useRef() as any;
  let ref1 = Object.assign({}, ref)
  let ref2 = Object.assign({}, ref)
  const openModal = () => {
    ref1.current.open()
    ref2.current.open2()
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
  const triggerCreateMember = async (payload) => {
    await addMember(payload)
    ref1.current.close()
    await fetchTeam()
  }
  const addMember = async (payload) =>  {
    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const organization_id = user && JSON.parse(user).organizations[0].id
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post(`http://127.0.0.1:3001/organization/${organization_id}/team/create`, payload)
      const data = response.data
    } catch (e) {
      console.log({ e })
    }
  }
  return (
    <MainLayout title="Team" pageTitle="Team">
      <Modal name='Create-Team' ref={ref1} onClose={() => {}}>
        <CreateTeamMember ref={ref2} onCreateMember={triggerCreateMember} />
      </Modal>
      <div className={styles["top-section"]}>
        <div className={styles["sub-text"]}>Here is the list of all team members that can be assigned to a project. Click on the button on the top right to create a new team member.</div>
        <div className={styles["btn-section"]}>
          <button className={styles["create-btn"]} onClick={openModal}>Create <FontAwesomeIcon className='ml-2' icon={faPlus} /></button>
        </div>
      </div>
      <div className={styles['team-list']}>
        {
          team.map((item, key) =>
            <div key={key} className={styles['list-item']}>
              <div className={styles['list-item-detail']}>
                <div>
                  <FontAwesomeIcon icon={faUser} className='mr-2' />
                  First name
                </div>
                <p>{item.firstName}</p>
              </div>
              <div className={styles['list-item-detail']}>
                <div>
                  <FontAwesomeIcon icon={faUser} className='mr-2' />
                  Last name
                </div>
                <p>{item.lastName}</p>
              </div>
              <div className={styles['list-item-detail']}>
                <div>
                  <FontAwesomeIcon icon={faTag} className='mr-2' />
                  Role
                </div>
                <p>{item.role && `${item.role[0].toUpperCase()}${item.role.slice(1,item.role.length)}`}</p>
              </div>
              <div className={styles['list-item-detail']}>
                <div>
                  <FontAwesomeIcon icon={faTasks} className='mr-2' />
                  No. of tasks
                </div>
                <p>{item.no_of_tasks}</p>
              </div>
              <div className={styles['list-item-detail']}>
                <div>
                  <FontAwesomeIcon icon={faClock} className='mr-2' />
                  Created at
                </div>
                <p>{formatDate.normal3(item.createdAt)}</p>
              </div>
            </div>
          )
        }
      </div>
    </MainLayout>
  )
}

export default Team
