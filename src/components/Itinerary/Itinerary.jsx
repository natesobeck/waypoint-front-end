// components
import ScheduleItem from "../ScheduleItem/ScheduleItem"

// npm modules
import { useState } from "react"
import DatePicker from "react-datepicker"
import { useNavigate } from "react-router-dom"

// services
import * as tripService from '../../services/tripService'

// css
import "react-datepicker/dist/react-datepicker.css"

const Itinerary = (props) => {
  console.log(props.trip.schedule[0])
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

  let sortedSchedule = props.trip.schedule.sort((a, b) => {
    return new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
  })

  const [schedule, setSchedule] = useState([...props.trip.schedule])
  const navigate = useNavigate()

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    const adjustedFormData = {
      name: formData.name,
      startTime: formData.startTime,
      endTime: formData.endTime,
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
    sortedSchedule = [...schedule, adjustedFormData].sort((a, b) => {
      return new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
    })
    setSchedule(sortedSchedule)
    navigate(`/trips/${props.trip._id}`)
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
        <label htmlFor="endtime-datepicker">When does it end?</label>
        <DatePicker 
          selected={formData.endTime}
          id="endtime-datepicker"
          onChange={(date) => (setFormData({...formData, endTime: date}))}
          showTimeSelect
          timeFormat="p"
          dateFormat="Pp"
          value={formData.endTime}
        />
        <label htmlFor="category-select">What category of activity?</label>
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
        <label htmlFor="venue-input">What's the place called?</label>
        <input 
          required
          type="text"
          name="venue"
          id="venue-input"
          value={formData.venue || ""}
          placeholder="Name or brief description of event"
          onChange={handleChange}
        />
        <label htmlFor="address-inputs">What's the address?</label>
        <div id="address-inputs">
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
        <button type="submit">Create Schedule Item</button>
      </form>
      <div>
        {schedule.length 
          // ? (
          //   schedule.map((scheduleItem)=> (
          //   <ScheduleItem key={scheduleItem.createdAt} scheduleItem={scheduleItem}/>)
          //   ))
          
          ? schedule.map((scheduleItem, i)=> (
            i === 0 || scheduleItem.startTime.slice(0, 10) !== schedule[i-1].startTime.slice(0, 10)
            ?
              <>
                <h1>{new Date(scheduleItem.startTime).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</h1>
                <ScheduleItem key={scheduleItem.createdAt} scheduleItem={scheduleItem}/>
              </>
            : 
              <ScheduleItem key={scheduleItem.createdAt} scheduleItem={scheduleItem}/>
          ))
          : <p>Theres nothing in your schedule yet! Add something.</p>
        }
      </div>
    </>
  )
}

export default Itinerary