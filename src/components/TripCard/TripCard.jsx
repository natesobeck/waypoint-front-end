// css
import styles from './TripCard.module.css'

// npm modules
import { Link } from 'react-router-dom'

const TripCard = ({ trip }) => {
  const departureDate = new Date(trip.departureDate).toLocaleDateString()

  const returnDate = new Date(trip.returnDate).toLocaleDateString()

  return (  
    <Link to={`/trips/${trip._id}`} className={styles.link}>
      <div className={styles['card-container']}>
        <div className={styles['trip-info']}>
          <h1 className={styles['card-header']}>{trip.name}</h1>
          <h3 className={styles.destination}>To {trip.destination.city}, {trip.destination.state ? `${trip.destination.state}, ` : ''}{trip.destination.country}</h3>
          <p className={styles['travel-info']}>You leave on  {departureDate} and return on {returnDate}</p>
        </div>
        <div className={styles['btn-container']}>
          <button className={styles.btn}>Delete this trip</button>
          <button className={styles.btn}>Edit this trip's details</button>
        </div>
        <div className={styles.image}></div>
      </div>
    </Link>
  )
}

export default TripCard