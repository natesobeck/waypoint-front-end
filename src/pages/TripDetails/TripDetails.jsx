// npm modules
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// services
import * as tripService from '../../services/tripService'

// components
import Itinerary from "../../components/Itinerary/Itinerary"
import PackingList from "../../components/PackingList/PackingList"

// css
import styles from './TripDetails.module.css'

const TripDetails = () => {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)
  const [showSchedule, setShowSchedule] = useState(false)
  const [showPackingList, setShowPackingList] = useState(false)
  const [schedule, setSchedule] = useState(null)

  const handleShowSchedule = (evt) => {
    handleActiveSelection(evt)
    if (showPackingList) {
      setShowPackingList(!showPackingList)
    }
    setShowSchedule(!showSchedule)
  }

  const handleShowPackingList = (evt) => {
    handleActiveSelection(evt)
    if (showSchedule) {
      setShowSchedule(!showSchedule)
    }
    setShowPackingList(!showPackingList)
  }

  const handleActiveSelection = (evt) => {
    const buttons = document.querySelectorAll(`.${styles['main-btn']}`)
    buttons.forEach(button => {
      if (button === evt.target && !button.classList.contains(`${styles.active}`)) {
        button.classList.add(`${styles.active}`)
      } else if (button.classList.contains(`${styles.active}`)) {
        button.classList.remove(`${styles.active}`)
      }
    })
  }

  useEffect(() => {
    const fetchTrip = async () => {
      const tripData = await tripService.show(tripId)
      setTrip(tripData)
      const sortedSchedule = tripData.schedule.sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf()
      })
      sortedSchedule.forEach(day => {
        day.scheduleItems = day.scheduleItems.sort((a, b) => {
          return new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf()
        })
      })
      setSchedule(sortedSchedule)
    }
    fetchTrip()
  }, [tripId])

  if (!trip) return (<h1>Loading...</h1>)

  const departureDate = new Date(trip.departureDate)

  const returnDate = new Date(trip.returnDate)

  const duration = (returnDate.getTime() - departureDate.getTime())/(1000 * 60 * 60 * 24)

  return (  
    <main className={styles.container}>
      <h1>{trip.name}</h1>
      <h3>Your details for your trip to {trip.destination.city}, {trip.destination.state.length ? `${trip.destination.state}, ` : '' }{trip.destination.country}</h3>
      <h4>You leave on {departureDate.toLocaleDateString()} and return on {returnDate.toLocaleDateString()} ({(duration + 1).toFixed()} {duration === 0 ? 'day' : 'days'})</h4>
      <div className={styles['btn-container']}>
        <button onClick={handleShowSchedule} className={`${styles.btn} ${styles['schedule-btn']} ${styles['main-btn']}`}>My Schedule</button>
        <button  className={`${styles.btn} ${styles['expenses-btn']} ${styles['main-btn']}`} onClick={handleActiveSelection}>My Expenses</button>
        <button  className={`${styles.btn} ${styles['packing-list-btn']} ${styles['main-btn']}`} onClick={handleShowPackingList}>My Packing List</button>
      </div>
      {showSchedule && <Itinerary trip={trip} setTrip={setTrip} schedule={schedule} setSchedule={setSchedule}/>}
      {showPackingList && <PackingList trip={trip} showPackingList={showPackingList}/>}
    </main>
  )
}

export default TripDetails