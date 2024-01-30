const ScheduleItem = (props) => {
  return (  
    <>
      <p>Date: {new Date(props.scheduleItem.startTime).toLocaleDateString()}</p>
      <p>Time: {new Date(props.scheduleItem.startTime).toLocaleTimeString()}</p>
    </>
  )
}

export default ScheduleItem