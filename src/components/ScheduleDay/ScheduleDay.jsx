// components
import { useState } from "react"
import ScheduleItem from "../ScheduleItem/ScheduleItem"

// css
import styles from './ScheduleDay.module.css'

const ScheduleDay = (props) => {
  const [scheduleItems, setScheduleItems] = useState(props.day.scheduleItems.sort((a, b) => {
    return new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
  }))

  return ( 
    <>
      <h1 className={styles['schedule-day']}>{new Date(props.day.date).toLocaleDateString(
        undefined, 
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      )}</h1>
      <div className={styles['day-container']}>
        {scheduleItems.map(item => (
          <ScheduleItem key={item._id} scheduleItem={item}/>
        ))}
      </div>
    </> 
  )
}

export default ScheduleDay