// css
import styles from './TripList.module.css'

// components
import TripCard from "../../components/TripCard/TripCard"

const TripList = (props) => {
  return (  
    <main className={styles.container}>
      {props.trips.length
        ? props.trips.map(trip => (
            <TripCard key={trip._id} trip={trip} handleDeleteTrip={props.handleDeleteTrip}/>
          ))
        : <h1 className={styles.subtitle}>Nothing here yet! Get traveling! 🌎</h1>
      }
    </main>
  )
}

export default TripList