// npm packages
import { useState } from "react"
import DatePicker from "react-datepicker"

// css
import styles from './EditScheduleItem.module.css'

// services
import * as tripService from "../../services/tripService" 

const EditScheduleItem = ({ scheduleItem, tripId, setSchedule, schedule, setShowEditForm, showEditForm }) => {

// set initial state of form to scheduleItem
  const [formData, setFormData] = useState({
    name: scheduleItem.name,
    startTime: new Date(scheduleItem.startTime),
    endTime: new Date(scheduleItem.endTime),
    category: scheduleItem.category,
    venue: scheduleItem.venue,
    street: scheduleItem.address.street,
    city: scheduleItem.address.city,
    state: scheduleItem.address.state,
    country: scheduleItem.address.country,
    zipCode: scheduleItem.address.zipCode
  })

  // allow form inputs to be saved in state
  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }
  
  //handle form submission logic
  const handleSubmit = (evt) => {
    // prevent the page refresh
    evt.preventDefault()
    // adjust the form data to match the back end data structure to use in HandleSubmit
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
      },
      _id: scheduleItem._id
    }
    // call the service function to update the item
    tripService.updateScheduleItem(tripId, scheduleItem._id, adjustedFormData)
    // find the day of the updated schedule
    const scheduleDay = schedule.find(day => 
      new Date(day.date).toLocaleDateString() === new Date(adjustedFormData.startTime).toLocaleDateString()
    )
    const updatedScheduleDay = {
      date: scheduleDay.date,
      scheduleItems: [...scheduleDay.scheduleItems.filter(item => item._id !== adjustedFormData._id), adjustedFormData].sort((a, b) => {
        return new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
      }),
      _id: scheduleDay._id
    }
    const filteredSchedule = schedule.filter(day => {
      return new Date(day.date).toLocaleDateString() !== new Date(updatedScheduleDay.date).toLocaleDateString()
    })
    setSchedule([...filteredSchedule, updatedScheduleDay].sort((a, b) => {
      return new Date(a.date).valueOf() - new Date(b.date).valueOf()
    }))
    // hide the edit form
    setShowEditForm(!showEditForm)
  }

  return (  
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
    </form>
  )
}

export default EditScheduleItem;