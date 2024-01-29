// npm modules
import { Link } from 'react-router-dom'

const TripCard = ({ trip }) => {
  const departureDate = new Date(trip.departureDate).toLocaleDateString()

  const returnDate = new Date(trip.returnDate).toLocaleDateString()

  return (  
    <Link to={`/trips/${trip._id}`}>
      <h1>{trip.name}</h1>
      <h3>Destination: {trip.destination.city}, {trip.destination.country}</h3>
      <p>Depart: {departureDate}</p>
      <p>Return: {returnDate}</p>
    </Link>
  )
}

export default TripCard