// css
import styles from './TripCard.module.css'

// npm modules
import { Link } from 'react-router-dom'

// components
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"
import { FaMagnifyingGlass } from "react-icons/fa6";

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
        <button className={styles.btn}><Link to={`/trips/${trip._id}`} className={styles.link}><FaMagnifyingGlass className={`${styles.icon} ${styles.detailsicon}`}/></Link></button>
        <button className={styles.btn} onClick={() => handleDeleteTrip(trip._id)}><MdDelete className={styles.icon}/></button>
        <Link to={`/trips/${trip._id}/edit`} state={trip} className={styles.btn}><MdEdit className={styles.icon}/></Link>
      </div>
      <div className={styles.image}></div>
    </div>
  )
}

export default TripCard