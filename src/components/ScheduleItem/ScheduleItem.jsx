// css
import styles from './ScheduleItem.module.css'

// components
import EditScheduleItem from '../EditScheduleItem/EditScheduleItem';
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md";

// npm packages
import { useState } from 'react'
import { createPortal } from 'react-dom'

const ScheduleItem = ({ scheduleItem, handleDeleteItem, tripId, setSchedule, schedule }) => {
  
// state to show and hide the edit form on clicking the edit button
  const [showEditForm, setShowEditForm] = useState(false)

  return (  
    <div className={styles.container}>
      <div>
        <p className={styles.time}>
          {new Date(scheduleItem.startTime).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - {new Date(scheduleItem.endTime).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </p>
      </div>
      <div className={styles['schedule-content']}>
        <h4 className={styles.name}>{scheduleItem.name}</h4>
        <p className={styles.details}>{scheduleItem.location}</p>
        <p>{scheduleItem.category}</p>
        <div className={styles['address-container']}>
          {scheduleItem.address.street.length ? `${scheduleItem.address.street}, ${scheduleItem.address.city}, ${scheduleItem.address.zipCode}` : 'No Known Address'}
        </div>
      </div>
      <div className={styles['btn-container']}>
        <button onClick={() => handleDeleteItem(scheduleItem)} className={`${styles['delete-btn']} ${styles.btn}`}><MdDelete className={styles['delete-icon']}/></button>
        <button onClick={() => setShowEditForm(!showEditForm)} className={`${styles['edit-btn']} ${styles.btn}`}><MdEdit className={styles['edit-icon']}/></button>
      </div>
      {showEditForm && createPortal(
        <EditScheduleItem 
          scheduleItem={scheduleItem} 
          tripId={tripId} 
          setSchedule={setSchedule} 
          schedule={schedule} 
          setShowEditForm={setShowEditForm} 
          showEditForm={showEditForm}
        />,
        document.body
      )
      }
    </div>
  )
}

export default ScheduleItem