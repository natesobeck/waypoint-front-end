// component
import ScheduleDay from "../ScheduleDay/ScheduleDay"
import AddScheduleItemForm from "../AddScheduleItemForm.jsx/AddScheduleItemForm"
import { IoIosAddCircleOutline } from "react-icons/io"

// npm modules
import { useState } from "react"
import { createPortal } from 'react-dom'
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
  
  const [showAddScheduleItem, setShowAddScheduleItem] = useState(false)

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

  const handleSubmit = async evt => {
    evt.preventDefault()
    const scheduleDay = await tripService.createScheduleItem(adjustedFormData, trip._id)
    if (scheduleDay.scheduleItems.length === 1) {
      const newSchedule = [...schedule, scheduleDay].sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf()
      }).filter(day => day.scheduleItems.length)
      setSchedule(newSchedule)
    } else {
      const newSchedule = schedule.map(day => 
        day._id === scheduleDay._id
        ? scheduleDay
        : day
      ).filter(day => day.scheduleItems.length)
      setSchedule(newSchedule)
    }
    setShowAddScheduleItem(false)
    setFormData({
      name: '',
      startTime: formData.startTime,
      endTime: formData.endTime,
      category: 'entertainment',
      venue: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    })
    navigate(`/trips/${trip._id}`)
  }

  const handleShowAddScheduleItem = () => {
    setShowAddScheduleItem(!showAddScheduleItem)
  }

  const handleDeleteItem = async (scheduleItem) => {
    const updatedTrip = await tripService.deleteScheduleItem(trip._id, scheduleItem._id)
    console.log(updatedTrip)
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
    setSchedule(
      newDay.scheduleItems.length 
      ? [...filteredSchedule, newDay].sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf()
      })
      : [...filteredSchedule].sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf()
      })
    )
  }

  // const setEndTime = () => {
  //   formData.endTime = formData.startTime
  // }

  return (
    <div className={styles.container}>
      <button 
        onClick={handleShowAddScheduleItem} 
        className={styles['add-schedule-item-btn']}>
          <div className={styles['btn-text-icon-container']}>
            <div>Add</div>
            <IoIosAddCircleOutline className={styles.icon}/>
          </div>
      </button>
      {showAddScheduleItem && createPortal(
        <AddScheduleItemForm 
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
          showAddScheduleItem={showAddScheduleItem}
          setShowAddScheduleItem={setShowAddScheduleItem}
        />,
        document.body
      )
      }
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
                tripId={trip._id}
                setSchedule={setSchedule}
                schedule={schedule}
              />
            ))
          : <h3 className={styles.empty}>Theres nothing in your schedule yet! Add something.</h3>
        }
      </div>
      }
    </div>
  )
}

export default Itinerary