// css
import styles from './ScheduleItem.module.css'

const ScheduleItem = ({ scheduleItem }) => {
  return (  
    <div className={styles.container}>
      <h4>{scheduleItem.name}</h4>
      <p>{new Date(scheduleItem.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(scheduleItem.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
      <p>{scheduleItem.location}</p>
      <p>{scheduleItem.category}</p>
      <div className={styles['address-container']}>
        {scheduleItem.address.street.length ? `${scheduleItem.address.street}, ${scheduleItem.address.city}, ${scheduleItem.address.zipCode}` : ''}
      </div>
    </div>
  )
}

export default ScheduleItem