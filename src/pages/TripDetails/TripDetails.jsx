// npm modules
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// services
import * as tripService from '../../services/tripService'

// components
import Itinerary from "../../components/Itinerary/Itinerary"

const TripDetails = () => {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)

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
    <main>
      <h1>{trip.name}</h1>
      <h3>Your details for your trip to {trip.destination.city}, {trip.destination.country}</h3>
      <h4>You leave on {departureDate.toLocaleDateString()} and return on {returnDate.toLocaleDateString()}</h4>
      <h4>Duration: {(duration + 1).toFixed()} {duration === 0 ? 'day' : 'days'}</h4>
      <Itinerary trip={trip} setTrip={setTrip}/>
    </main>
  )
}

export default TripDetails