// components
import ScheduleItem from "../ScheduleItem/ScheduleItem"

// css
import styles from './ScheduleDay.module.css'

const ScheduleDay = ({ day }) => {
  return ( 
    <>
      <h1 className={styles['schedule-day']}>{new Date(day.date).toLocaleDateString(
        undefined, 
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      )}</h1>
      <div className={styles['day-container']}>
        {day.scheduleItems.map(item => (
          <ScheduleItem key={item._id} scheduleItem={item}/>
        ))}
      </div>
    </> 
  )
}

export default ScheduleDay