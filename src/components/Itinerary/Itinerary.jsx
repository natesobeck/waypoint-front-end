// component
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

const Itinerary = ({ trip, schedule, setSchedule }) => {
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
  
  // Schedule, Expenses, Packing List state
  const [showAddScheduleItem, setShowAddScheduleItem] = useState(false)

  // sorting the schedule before setting state
  // const sortedSchedule = trip.schedule.sort((a, b) => {
  //   return new Date(a.date).valueOf() - new Date(b.date).valueOf()
  // })
  // sortedSchedule.forEach(day => {
  //   day.scheduleItems = day.scheduleItems.sort((a, b) => {
  //     return new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
  //   })
  // })
  
  // const [schedule, setSchedule] = useState(sortedSchedule)

  const navigate = useNavigate()

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

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

  const handleSubmit = evt => {
    evt.preventDefault()
    tripService.createScheduleItem(adjustedFormData, trip._id)
    const scheduleDay = schedule.find(day => 
      new Date(day.date).toLocaleDateString() === new Date(adjustedFormData.startTime).toLocaleDateString()
    )
    if (scheduleDay) {
      const updatedScheduleDay = {
        date: scheduleDay.date,
        scheduleItems: [...scheduleDay.scheduleItems, adjustedFormData].sort((a, b) => {
          return new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
        })
      }
      const filteredSchedule = schedule.filter(day => {
        return new Date(day.date).toLocaleDateString() !== new Date(updatedScheduleDay.date).toLocaleDateString()
      })
      console.log(filteredSchedule)
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
    navigate(`/trips/${trip._id}`)
  }

  const handleShowAddScheduleItem = () => {
    setShowAddScheduleItem(!showAddScheduleItem)
  }

  const handleDeleteItem = async (scheduleItem) => {
    tripService.deleteScheduleItem(trip._id, scheduleItem._id)
    const day = schedule.find(day => {
      return new Date(day.date).toLocaleDateString() === new Date(scheduleItem.startTime).toLocaleDateString()
    })
    const filteredItems = day.scheduleItems.filter(item => {
      return item._id !== scheduleItem._id
    })
    const newDay = {
      date: day.date,
      scheduleItems: filteredItems,
      _id: day._id
    }
    const filteredSchedule = schedule.filter(day => {
      return day._id !== newDay._id
    })
    setSchedule(newDay.scheduleItems.length ? [...filteredSchedule, newDay] : [...filteredSchedule])
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
      {
      <div>
        {schedule.filter(day => day.scheduleItems.length).length
          ? schedule
            .filter(day => 
              day.scheduleItems.length
            )
            .map(day => (
              <ScheduleDay 
                key={day.date}
                day={day}
                formData={adjustedFormData} 
                handleDeleteItem={handleDeleteItem}
              />
            ))
          : <p>Theres nothing in your schedule yet! Add something.</p>
        }
      </div>
      }
    </>
  )
}

export default Itinerary