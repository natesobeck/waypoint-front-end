// components
import ScheduleItem from "../ScheduleItem/ScheduleItem"
import ScheduleDay from "../ScheduleDay/ScheduleDay"
import { IoIosAddCircleOutline } from "react-icons/io"

// npm modules
import { useState } from "react"
import DatePicker from "react-datepicker"
import { useNavigate } from "react-router-dom"

// services
import * as tripService from '../../services/tripService'

// css
import "react-datepicker/dist/react-datepicker.css"
import styles from './Itinerary.module.css'

const Itinerary = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    startTime: new Date(),
    endTime: new Date(),
    category: 'entertainment',
    venue: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  })
  const [showAddScheduleItem, setShowAddScheduleItem] = useState(false)

  const sortedSchedule = props.trip.schedule.sort((a, b) => {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf()
  })

  const [schedule, setSchedule] = useState(sortedSchedule)
  const navigate = useNavigate()

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    const adjustedFormData = {
      name: formData.name,
      startTime: formData.startTime.toString(),
      endTime: formData.endTime.toString(),
      category: formData.category,
      venue: formData.venue,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode
      }
    }
    evt.preventDefault()
    tripService.createScheduleItem(adjustedFormData, props.trip._id)
    const scheduleDay = schedule.find(day => 
      new Date(day.date).toLocaleDateString() === new Date(adjustedFormData.startTime).toLocaleDateString()
    )
    if (scheduleDay) {
      const updatedScheduleDay = {
        date: scheduleDay.date,
        scheduleItems: [...scheduleDay.scheduleItems, adjustedFormData]
      }
      const filteredSchedule = schedule.filter(day => {
        return new Date(day.date).toLocaleDateString() !== new Date(updatedScheduleDay.date).toLocaleDateString()
      })
      setSchedule([...filteredSchedule, updatedScheduleDay].sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf()
      }))
    } else {
      const newScheduleDay = {
        date: adjustedFormData.startTime,
        scheduleItems: [adjustedFormData]
      }
      setSchedule([...schedule, newScheduleDay].sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf()
      }))
    }
    // sortedSchedule = [...schedule].sort((a, b) => {
    //   return new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
    // })
    // setSchedule(sortedSchedule)
    navigate(`/trips/${props.trip._id}`)
  }

  const handleShowAddScheduleItem = () => {
    setShowAddScheduleItem(!showAddScheduleItem)
  }

  return (
    <>
      {! showAddScheduleItem && 
        <button 
          onClick={handleShowAddScheduleItem} 
          className={styles['add-schedule-item-btn']}>
            <div className={styles['btn-text-icon-container']}>
              <div>Add to my Schedule</div>
              <IoIosAddCircleOutline className={styles.icon}/>
            </div>
        </button>
      }
      {showAddScheduleItem &&
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.subtitle}>Add to My Schedule</h3>
          <div className={styles['form-label-input-container']}>
            <label htmlFor="name-input">What are you doing?</label>
            <input 
              required
              type="text"
              name="name"
              id="name-input"
              value={formData.name || ""}
              placeholder="Name or brief description of event"
              onChange={handleChange}
            />
          </div>
          <div className={styles['form-label-input-container']}>
            <label htmlFor="starttime-datepicker">Start Time:</label>
            <DatePicker 
              selected={formData.startTime}
              id="starttime-datepicker"
              onChange={(date) => (setFormData({...formData, startTime: date}))}
              showTimeSelect
              timeFormat="p"
              dateFormat="Pp"
              value={formData.startTime}
            />
          </div>
          <div className={styles['form-label-input-container']}>
            <label htmlFor="endtime-datepicker">End Time:</label>
            <DatePicker 
              selected={formData.endTime}
              id="endtime-datepicker"
              onChange={(date) => (setFormData({...formData, endTime: date}))}
              showTimeSelect
              timeFormat="p"
              dateFormat="Pp"
              value={formData.endTime}
            />
          </div>
          <div className={styles['form-label-input-container']}>
            <label htmlFor="category-select">Category: </label>
            <select 
              name="category"
              id="category-select"
              value={formData.category}
              placeholder="Category of Event"
              onChange={handleChange}
            >
              <option value="entertainment">Entertainment</option>
              <option value="food">Food</option>
              <option value="fitness">Fitness</option>
              <option value="transportation">Transportation</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={styles['form-label-input-container']}>
            <label htmlFor="venue-input">Location: </label>
            <input 
              required
              type="text"
              name="venue"
              id="venue-input"
              value={formData.venue || ""}
              placeholder="Name of venue"
              onChange={handleChange}
            />
          </div>
          <div className={styles['form-label-input-container']}>
            <label htmlFor="address-inputs">Address: </label>
            <div id="address-inputs" className={styles['address-inputs']}>
              <input 
                required
                type="text"
                name="street"
                value={formData.street || ""}
                placeholder="Street"
                onChange={handleChange}
              />
              <input 
                required
                type="text"
                name="city"
                value={formData.city || ""}
                placeholder="City"
                onChange={handleChange}
              />
              <input 
                required
                type="text"
                name="zipCode"
                value={formData.zipCode || ""}
                placeholder="Zip Code"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className={styles['create-schedule-btn']}>Create Schedule Item</button>
        </form>}
      {/* <div>
        {schedule.length       
          ? schedule.map((scheduleItem, i)=> (
            i === 0 || new Date(scheduleItem.startTime).toISOString().slice(0, 10) !== new Date(schedule[i - 1].startTime).toISOString().slice(0, 10)
            ?
              <div key={i}>
                <h1 className={styles['schedule-day']}>
                  {new Date(scheduleItem.startTime).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h1>
                <ScheduleItem scheduleItem={scheduleItem} key={scheduleItem._id}/>
              </div>
            : 
              <ScheduleItem key={scheduleItem.createdAt} scheduleItem={scheduleItem}/>
          ))
          : <p>Theres nothing in your schedule yet! Add something.</p>
        }
      </div> */}
      {
      <div>
        {schedule.length
          ? schedule.map(day => (
            <ScheduleDay key={day.date} day={day}/>
          ))
          : <p>Theres nothing in your schedule yet! Add something.</p>
        }
      </div>
      }
    </>
  )
}

export default Itinerary