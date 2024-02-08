// npm modules
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// services
import * as tripService from '../../services/tripService'

// components
import Itinerary from "../../components/Itinerary/Itinerary"

// css
import styles from './TripDetails.module.css'

const TripDetails = () => {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)
  const [showSchedule, setShowSchedule] = useState(false)

  const handleShowSchedule = (evt) => {
    handleActiveSelection(evt)
    setShowSchedule(!showSchedule)
  }

  const handleActiveSelection = (evt) => {
    const active = document.querySelector('.active')
    active.classList.remove('active')
    evt.target.classList.add('active')
  }

  useEffect(() => {
    const fetchTrip = async () => {
      const tripData = await tripService.show(tripId)
      setTrip(tripData)
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
        <button  className={`${styles.btn} ${styles['expenses-btn']} ${styles['main-btn']}`}>My Expenses</button>
        <button  className={`${styles.btn} ${styles['packing-list-btn']} ${styles['main-btn']}`}>My Packing List</button>
      </div>
      {showSchedule && <Itinerary trip={trip} setTrip={setTrip}/>}
    </main>
  )
}

export default TripDetails