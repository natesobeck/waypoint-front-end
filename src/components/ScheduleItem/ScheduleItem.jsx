// css
import styles from './ScheduleItem.module.css'

const ScheduleItem = ({ scheduleItem }) => {
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
    </div>
  )
}

export default ScheduleItem