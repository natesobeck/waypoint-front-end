// css
import styles from './TripCard.module.css'

// npm modules
import { Link } from 'react-router-dom'

const TripCard = ({ trip, handleDeleteTrip }) => {
  const departureDate = new Date(trip.departureDate).toLocaleDateString()
  const returnDate = new Date(trip.returnDate).toLocaleDateString()
  
  return (  
    <div className={styles['card-container']}>
      <div className={styles['info-container']}>
        <h1><Link to={`/trips/${trip._id}`} className={`${styles.link} ${styles['card-header']}`}>{trip.name}</Link></h1>
        <h3 className={styles.destination}>To {trip.destination.city}, {trip.destination.state ? `${trip.destination.state}, ` : ''}{trip.destination.country}</h3>
        <p>{departureDate} - {returnDate}</p>
      </div>
      <div className={styles['btn-container']}>
        <button className={styles.btn}><Link to={`/trips/${trip._id}`} className={styles.link}>View Details</Link></button>
        <button className={styles.btn} onClick={() => handleDeleteTrip(trip._id)}>Delete this trip</button>
        <button className={styles.btn}><Link to={`/trips/${trip._id}/edit`} state={trip}>Edit this trip</Link></button>
      </div>
      <div className={styles.image}></div>
    </div>
  )
}

export default TripCard