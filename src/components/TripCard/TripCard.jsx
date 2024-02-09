// css
import styles from './TripCard.module.css'

// npm modules
import { Link, useNavigate } from 'react-router-dom'

const TripCard = ({ trip, handleDeleteTrip }) => {
  const navigate = useNavigate()

  const departureDate = new Date(trip.departureDate).toLocaleDateString()
  const returnDate = new Date(trip.returnDate).toLocaleDateString()

  const handleEditTrip = (tripId) => {
    navigate(`/trips/${tripId}/edit`)
  }
  
  return (  
    <div className={styles['card-container']}>
      <div className={styles['info-container']}>
        <h1><Link to={`/trips/${trip._id}`} className={`${styles.link} ${styles['card-header']}`}>{trip.name}</Link></h1>
        <h3 className={styles.destination}>To {trip.destination.city}, {trip.destination.state ? `${trip.destination.state}, ` : ''}{trip.destination.country}</h3>
        <p>You leave on  {departureDate} and return on {returnDate}</p>
      </div>
      <div className={styles['btn-container']}>
        <button className={styles.btn}><Link to={`/trips/${trip._id}`} className={styles.link}>View Details</Link></button>
        <button className={styles.btn} onClick={() => handleDeleteTrip(trip._id)}>Delete this trip</button>
        <button className={styles.btn} onClick={() => handleEditTrip(trip._id)}>Edit this trip</button>
      </div>
      <div className={styles.image}></div>
    </div>
  )
}

export default TripCard