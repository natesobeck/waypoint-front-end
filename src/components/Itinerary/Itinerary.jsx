// components
import ScheduleItem from "../ScheduleItem/ScheduleItem"

// npm modules
import { useState } from "react"
import DatePicker from "react-datepicker"

// css
import "react-datepicker/dist/react-datepicker.css"

const Itinerary = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    category: 'entertainment'
  })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    evt.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <label htmlFor="starttime-datepicker">When does it start?</label>
        <DatePicker 
          selected={formData.startTime}
          id="starttime-datepicker"
          onChange={(date) => (setFormData({...formData, startTime: date}))}
          showTimeSelect
          timeFormat="p"
          dateFormat="Pp"
          value={formData.startTime}
        />
        <label htmlFor="starttime-datepicker">When does it start?</label>
        <DatePicker 
          selected={formData.startTime}
          id="starttime-datepicker"
          onChange={(date) => (setFormData({...formData, startTime: date}))}
          showTimeSelect
          timeFormat="p"
          dateFormat="Pp"
          value={formData.startTime}
        />
        <label htmlFor="category-select">When does it start?</label>
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
      </form>
      <div>
        {props.trip.itineraries.length 
          ? props.trip.itineraries.scheduleItems.map(scheduleItem => (
            <ScheduleItem key={scheduleItem._id}/>
          ))
          : <p>Theres nothing in your itinerary yet!</p>
        }
      </div>
    </>
  )
}

export default Itinerary