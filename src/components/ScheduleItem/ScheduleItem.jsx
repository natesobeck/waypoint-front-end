// css
import styles from './ScheduleItem.module.css'

// components
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md";

// npm packages
import { useState } from 'react'

const ScheduleItem = ({ scheduleItem, handleDeleteItem }) => {
  
  const [showEditItem, setShowEditItem] = useState(false)

  return (  
    <div className={styles.container}>
      <div>
        <p className={styles.time}>{new Date(scheduleItem.startTime).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - {new Date(scheduleItem.endTime).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p>
      </div>
      <div className={styles['schedule-content']}>
        <h4 className={styles.name}>{scheduleItem.name}</h4>
        <p>{scheduleItem.location}</p>
        <p>{scheduleItem.category}</p>
        <div className={styles['address-container']}>
          {scheduleItem.address.street.length ? `${scheduleItem.address.street}, ${scheduleItem.address.city}, ${scheduleItem.address.zipCode}` : 'No Known Address'}
        </div>
      </div>
      <div className={styles['btn-container']}>
        <button onClick={() => handleDeleteItem(scheduleItem)} className={`${styles['delete-btn']} ${styles.btn}`}><MdDelete className={styles['delete-icon']}/></button>
        <button onClick={() => setShowEditItem(!showEditItem)} className={`${styles['edit-btn']} ${styles.btn}`}><MdEdit className={styles['edit-icon']}/></button>
      </div>
      {
        showEditItem && <h1>Wazzuppp</h1>
      }
    </div>
  )
}

export default ScheduleItem