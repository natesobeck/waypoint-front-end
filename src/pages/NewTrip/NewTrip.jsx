// npm modules
import { useState } from "react"

// css
// import styles from './NewTrip.module.css'


const NewTrip = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    departureDate: new Date().toLocaleString(),
    returnDate: new Date().toLocaleString(),
    travelMethod: 'car',
  })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddTrip(formData)
  }

  return (  
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name your Trip:</label>
        <input 
          required
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <label htmlFor="country-input">What country are you going to?</label>
        <input 
          required
          type="text"
          name="country"
          id="country-input"
          value={formData.country}
          placeholder="Country"
          onChange={handleChange}
        />
        <label htmlFor="city-input">What city are you going to?</label>
        <input 
          required
          type="text"
          name="city"
          id="city-input"
          value={formData.city}
          placeholder="City"
          onChange={handleChange}
        />
        <label htmlFor="travelmethod-input">
          How are you getting there?
        </label>
        <select 
          required
          name="travelMethod" id="travelmethod-select"
          value={formData.travelMethod}
          onChange={handleChange}
        >
          <option value="car">Car</option>
          <option value="plane">Plane</option>
          <option value="train">Train</option>
          <option value="bus">Bus</option>
          <option value="other" >Other</option>
        </select>
      </form>
    </main>
  )
}

export default NewTrip