const ScheduleItem = (props) => {
  return (  
    <p>{new Date(props.scheduleItem.startTime).toLocaleString()}</p>
  )
}

export default ScheduleItem