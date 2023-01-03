import MainLayout from '../../components/MainLayout';
import { faUser, faTag, faTasks, faClock, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/team.module.css';
import Modal from '../../components/Modal';
import CreateTeamMember from '../../components/CreateTeamMember';
import { useRef } from 'react'

const Team = () => {
  const ref = useRef() as any;
  const openModal = () => {
    ref.current.open()
  }
  return (
    <MainLayout title="Team" pageTitle="Team">
      <Modal title='Title' ref={ref}>
        <CreateTeamMember />
      </Modal>
      <div className={styles["top-section"]}>
        <div className={styles["sub-text"]}>Here is the list of all team members that can be assigned to a project. Click on the button on the top right to create a new team member.</div>
        <div className={styles["btn-sction"]}>
          <button className={styles["create-btn"]} onClick={openModal}>Create <FontAwesomeIcon className='ml-2' icon={faPlus} /></button>
        </div>
      </div>
      <div className={styles['team-list']}>
        {
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(i =>
            <div className={styles['list-item']}>
              <div className={styles['list-item-detail']}>
                <div>
                  <FontAwesomeIcon icon={faUser} className='mr-2' />
                  First name
                </div>
                <p>John</p>
              </div>
              <div className={styles['list-item-detail']}>
                <div>
                  <FontAwesomeIcon icon={faUser} className='mr-2' />
                  Last name
                </div>
                <p>John</p>
              </div>
              <div className={styles['list-item-detail']}>
                <div>
                  <FontAwesomeIcon icon={faTag} className='mr-2' />
                  Role
                </div>
                <p>Developer</p>
              </div>
              <div className={styles['list-item-detail']}>
                <div>
                  <FontAwesomeIcon icon={faTasks} className='mr-2' />
                  No. of tasks
                </div>
                <p>5</p>
              </div>
              <div className={styles['list-item-detail']}>
                <div>
                  <FontAwesomeIcon icon={faClock} className='mr-2' />
                  Created at
                </div>
                <p>10/10/2002</p>
              </div>
            </div>
          )
        }
      </div>
    </MainLayout>
  )
}

export default Team
