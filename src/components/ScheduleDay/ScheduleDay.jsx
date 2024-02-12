const ScheduleDay = (props) => {
  return (  
    <h1>{new Date(props.day.date).toLocaleDateString(
      undefined, 
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    )}</h1>
  )
}

export default ScheduleDay