// npm modules
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// services
import * as tripService from '../../services/tripService'

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

  return (  
    <main>
      <h1>
        This is a trip details page
      </h1>
    </main>
  )
}

export default TripDetails