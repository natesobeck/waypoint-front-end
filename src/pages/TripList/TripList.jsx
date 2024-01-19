// css
// import styles from './TripList.module.css'

// components
import TripCard from "../../components/TripCard/TripCard"

const TripList = (props) => {
  return (  
    <main>
      {props.trips.map(trip => (
        <TripCard key={trip._id} trip={trip} />
      ))}
    </main>
  )
}

export default TripList