// css
import styles from './ScheduleItem.module.css'

const ScheduleItem = ({ scheduleItem, handleDeleteItem }) => {

  // const handleDeleteItem = async () => {
  //   tripService.deleteScheduleItem(tripId, scheduleItem._id)
  //   const day = schedule.find(day => {
  //     return new Date(day.date).toLocaleDateString() === new Date(scheduleItem.startTime).toLocaleDateString()
  //   })
  //   const filteredItems = day.scheduleItems.filter(item => {
  //     return item._id !== scheduleItem._id
  //   })
  //   const newDay = {
  //     date: day.date,
  //     scheduleItems: filteredItems,
  //     _id: day._id
  //   }
  //   const filteredSchedule = schedule.filter(day => {
  //     return day._id !== newDay._id
  //   })
  //   setSchedule(newDay.scheduleItems.length ? [...filteredSchedule, newDay] : [...filteredSchedule])
  // }

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
      <button onClick={() => handleDeleteItem(scheduleItem)}>Delete this Item</button>
    </div>
  )
}

export default ScheduleItem