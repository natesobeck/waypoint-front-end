// css
import styles from './ScheduleItem.module.css'

// components
import { MdDelete } from "react-icons/md"

const ScheduleItem = ({ scheduleItem, handleDeleteItem }) => {

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
        <button onClick={() => handleDeleteItem(scheduleItem)} className={styles['delete-btn']}><MdDelete className={styles.icon}/></button>
      </div>
    </div>
  )
}

export default ScheduleItem