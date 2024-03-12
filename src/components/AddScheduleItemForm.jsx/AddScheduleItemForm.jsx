// css
import styles from './AddScheduleItemForm.module.css'

//components
import DatePicker from "react-datepicker"
import { FiMinusCircle } from "react-icons/fi"

const AddScheduleItemForm = ({ handleSubmit, formData, setFormData, handleChange, setShowAddScheduleItem }) => {
  return (
    <>
      <div className={styles.overlay} onClick={() => setShowAddScheduleItem(false)}></div>  
      <form onSubmit={handleSubmit} className={styles.form}>
        <button onClick={() => setShowAddScheduleItem(false)} className={styles['hide-btn']}>
          <FiMinusCircle className={styles.icon}/>
        </button>
        <div className={styles['form-label-input-container']}>
          <label htmlFor="name-input">What are you doing?</label>
          <input 
            required
            type="text"
            name="name"
            id="name-input"
            value={formData.name || ""}
            placeholder="Name or brief description of event"
            onChange={handleChange}
          />
        </div>
        <div className={styles['form-label-input-container']}>
          <label htmlFor="starttime-datepicker">Start Time:</label>
          <DatePicker 
            selected={formData.startTime}
            id="starttime-datepicker"
            onChange={(date) => (setFormData({...formData, startTime: date}))}
            showTimeSelect
            timeFormat="p"
            dateFormat="Pp"
            value={formData.startTime}
          />
        </div>
        <div className={styles['form-label-input-container']}>
          <label htmlFor="endtime-datepicker">End Time:</label>
          <DatePicker 
            selected={formData.endTime}
            id="endtime-datepicker"
            onChange={(date) => (setFormData({...formData, endTime: date}))}
            showTimeSelect
            minDate={formData.startTime}
            maxDate={formData.startTime}
            timeFormat="p"
            dateFormat="Pp"
            value={formData.endTime}
          />
        </div>
        <div className={styles['form-label-input-container']}>
          <label htmlFor="category-select">Category: </label>
          <select 
            name="category"
            id="category-select"
            value={formData.category}
            placeholder="Category of Event"
            onChange={handleChange}
          >
            <option value="entertainment">Entertainment</option>
            <option value="food">Food</option>
            <option value="fitness">Fitness</option>
            <option value="transportation">Transportation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles['form-label-input-container']}>
          <label htmlFor="venue-input">Location: </label>
          <input 
            required
            type="text"
            name="venue"
            id="venue-input"
            value={formData.venue || ""}
            placeholder="Name of venue"
            onChange={handleChange}
          />
        </div>
        <div className={styles['form-label-input-container']}>
          <label htmlFor="address-inputs">Address: </label>
          <div id="address-inputs" className={styles['address-inputs']}>
            <input 
              type="text"
              name="street"
              value={formData.street || ""}
              placeholder="Street"
              onChange={handleChange}
            />
            <input 
              type="text"
              name="city"
              value={formData.city || ""}
              placeholder="City"
              onChange={handleChange}
            />
            <input 
              type="text"
              name="zipCode"
              value={formData.zipCode || ""}
              placeholder="Zip Code"
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className={styles['create-schedule-btn']}>Create Schedule Item</button>
      </form>
    </>
  )
}

export default AddScheduleItemForm