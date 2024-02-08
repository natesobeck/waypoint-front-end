// npm modules
import { useState } from "react"
import { useLocation } from "react-router-dom"
import DatePicker from "react-datepicker"

// css
import "react-datepicker/dist/react-datepicker.css"

const EditTrip = (props) => {
  const { state } = useLocation()

  const [formData, setFormData] = useState(state)

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit =  async (evt) => {
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
    evt.preventDefault()
    props.handleAddTrip(adjustedFormData)
  }

  return (  
    <main>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h3 className={styles["form-header"]}>Let's get you going right away,</h3>
        <div className={styles['input-container']}>
          <label htmlFor="name-input">Name your Trip:</label>
          <input 
            required
            type="text"
            name="name"
            id="name-input"
            value={formData.name || ""}
            placeholder="Name"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor="country-input">What country are you going to?</label>
          <input 
            required
            type="text"
            name="country"
            id="country-input"
            value={formData.country || ""}
            placeholder="Country"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        {formData.country === 'United States' && (
          <div className={styles['input-container']}>
            <label htmlFor="state-input">What state?</label>
            <input 
              required
              type="text"
              name="state"
              id="state-input"
              value={formData.state || ""}
              placeholder="State"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        )}
        <div className={styles['input-container']}>
          <label htmlFor="city-input">What city are you going to?</label>
          <input 
            required
            type="text"
            name="city"
            id="city-input"
            value={formData.city || ""}
            placeholder="City"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles['input-container']}>
        <label htmlFor="travelmethod-input">
          How are you getting there?
        </label>
          <select 
            required
            name="travelMethod" id="travelmethod-select"
            value={formData.travelMethod || ""}
            onChange={handleChange}
          >
            <option value="car">Car</option>
            <option value="plane">Plane</option>
            <option value="train">Train</option>
            <option value="bus">Bus</option>
            <option value="other" >Other</option>
          </select>
        </div>
        <div className={styles['input-container']}>
          <label htmlFor="departure-datepicker">When do you plan to leave?</label>
          <DatePicker 
            selected={formData.departureDate}
            id="departure-datepicker"
            onChange={(date) => (setFormData({...formData, departureDate: date}))}
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor="departure-datepicker">When do you return?</label>
          <DatePicker 
            selected={formData.returnDate}
            id="departure-datepicker"
            onChange={(date) => (setFormData({...formData, returnDate: date}))}
          />
        </div>
        <button type="submit" className={styles["create-btn"]}>Create Your Trip</button>
      </form>
    </main>
  )
}

export default EditTrip