// components
import ScheduleItem from "../ScheduleItem/ScheduleItem"

const Itinerary = (props) => {
  return (  
    <div>
      {props.trip.itineraries.length 
        ? props.trip.itineraries.scheduleItems.map(scheduleItem => (<ScheduleItem key={scheduleItem._id}/>))
        : <p>Theres nothing on your itinerary yet!</p>
      }
    </div>
  )
}

export default Itinerary