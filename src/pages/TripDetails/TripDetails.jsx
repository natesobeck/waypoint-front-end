// npm modules
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// services
import * as tripService from '../../services/tripService'

// components
import Itinerary from "../../components/Itinerary/Itinerary"
import PackingList from "../../components/PackingList/PackingList"
import ExpenseList from "../../components/ExpenseList/ExpenseList"

// css
import styles from './TripDetails.module.css'

const TripDetails = () => {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)
  const [showSchedule, setShowSchedule] = useState(true)
  const [showPackingList, setShowPackingList] = useState(false)
  const [showExpenses, setShowExpenses] = useState(false)
  const [schedule, setSchedule] = useState(null)
  const [packingList, setPackingList] = useState(null)
  const [expenses, setExpenses] = useState(null)

  const handleShowSchedule = (evt) => {
    handleActiveSelection(evt)
    if (showPackingList) {
      setShowPackingList(!showPackingList)
    }
    if (showExpenses) {
      setShowExpenses(!showExpenses)
    }
    setShowSchedule(true)
  }

  const handleShowPackingList = (evt) => {
    handleActiveSelection(evt)
    if (showSchedule) {
      setShowSchedule(!showSchedule)
    }
    if (showExpenses) {
      setShowExpenses(!showExpenses)
    }
    setShowPackingList(!showPackingList)
  }

  const handleShowExpenses = (evt) => {
    handleActiveSelection(evt)
    if (showSchedule) {
      setShowSchedule(!showSchedule)
    }
    if (showPackingList) {
      setShowPackingList(!showPackingList)
    }
    setShowExpenses(!showExpenses)
  }

  const handleActiveSelection = (evt) => {
    const buttons = document.querySelectorAll(`.${styles['main-btn']}`)
    buttons.forEach(button => {
      if (button === evt.target && !button.classList.contains(`${styles.active}`)) {
        button.classList.add(`${styles.active}`)
        button.setAttribute('disabled', 'disabled')
      } else if (button.classList.contains(`${styles.active}`)) {
        button.classList.remove(`${styles.active}`)
        button.removeAttribute('disabled')
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
      setPackingList(tripData.packingList)
      setExpenses(tripData.expenses)
    }
    fetchTrip()
  }, [tripId])

  if (!trip) return (<h1>Loading...</h1>)

  const departureDate = new Date(trip.departureDate)

  const returnDate = new Date(trip.returnDate)

  const duration = (returnDate.getTime() - departureDate.getTime())/(1000 * 60 * 60 * 24)

  return (  
    <main className={styles.container}>
      <h1 className={styles.title}>{trip.name}</h1>
      <div className={styles['details-container']}>
        <h3 className={styles.destination}>
          <span className={styles.bold}>{trip.destination.city}, {trip.destination.state.length ? `${trip.destination.state}, ` : '' }{trip.destination.country}</span>
        </h3>
        <h4 className={styles.details}>
          <span className={styles.bold}>{departureDate.toLocaleDateString()}</span> - 
          <span className={styles.bold}> {returnDate.toLocaleDateString()}</span> 
          <span> ({(duration + 1).toFixed()} {duration === 0 ? 'day' : 'days'})</span>
        </h4>
      </div>
      <div className={styles['btn-container']}>
        <button 
          onClick={handleShowSchedule} 
          className={`${styles.btn} ${styles['schedule-btn']} ${styles['main-btn']} ${styles.active}`}
        >
          Schedule
        </button>
        <button 
          onClick={handleShowExpenses}
          className={`${styles.btn} ${styles['expenses-btn']} ${styles['main-btn']}`} 
        >
          Expenses
        </button>
        <button
          onClick={handleShowPackingList}
          className={`${styles.btn} ${styles['packing-list-btn']} ${styles['main-btn']}`} 
        >
          Packing
        </button>
      </div>

      {showSchedule && 
      <Itinerary 
        trip={trip} 
        setTrip={setTrip} 
        schedule={schedule} 
        setSchedule={setSchedule}
      />}

      {showPackingList && 
      <PackingList 
        trip={trip} 
        packingList={packingList} 
        setPackingList={setPackingList} 
      />}

      {showExpenses &&
      <ExpenseList 
        trip={trip}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      }
    </main>
  )
}

export default TripDetails