// npm modules
import { Link } from 'react-router-dom'

const TripCard = ({ trip }) => {
  return (  
    <Link to={`/trips/${trip._id}`}>
      <h1>This is a trip card</h1>
    </Link>
  )
}

export default TripCard