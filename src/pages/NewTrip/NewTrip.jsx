// npm modules
import { useState } from "react"
import DatePicker from "react-datepicker"

// css
import "react-datepicker/dist/react-datepicker.css"
// import styles from './NewTrip.module.css'

const NewTrip = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    departureDate: new Date(),
    returnDate: new Date(),
    travelMethod: 'car',
  })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    const adjustedFormData = {
      name: formData.name,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate,
      travelMethod: formData.travelMethod,
      destination: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode
      }
    }
    props.handleAddTrip(adjustedFormData)
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
        {formData.country === 'United States' && (
          <>
            <label htmlFor="state-input">What state?</label>
            <input 
              required
              type="text"
              name="state"
              id="state-input"
              value={formData.state}
              placeholder="State"
              onChange={handleChange}
            />
          </>
        )}
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
        <label htmlFor="departure-datepicker">When do you plan to leave?</label>
        <DatePicker 
          selected={formData.departureDate}
          id="departure-datepicker"
          onChange={(date) => (setFormData({...formData, departureDate: date}))}
        />
        <label htmlFor="departure-datepicker">When do you return?</label>
        <DatePicker 
          selected={formData.returnDate}
          id="departure-datepicker"
          onChange={(date) => (setFormData({...formData, returnDate: date}))}
        />
        <button type="submit">Create Your Trip</button>
      </form>
    </main>
  )
}

export default NewTrip