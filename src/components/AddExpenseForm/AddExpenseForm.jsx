// css
import styles from './AddExpenseForm.module.css'

// components
import { FiMinusCircle } from "react-icons/fi"

const AddExpenseForm = ({ handleSubmit, formData, handleChange, setShowAddExpense }) => {
  return (  
    <>
      <div className={styles.overlay} onClick={() => setShowAddExpense(false)}></div>
      <form 
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <button onClick={() => setShowAddExpense(false)} className={styles['hide-btn']}>
          <FiMinusCircle className={styles.icon}/>
        </button>
        <input 
          type="text"
          name="expense"
          onChange={handleChange}
          value={formData.expense}
          placeholder="What expense are you adding? i.e. plane tickets"
          required
        />
        <input 
          type="number"
          name="cost"
          onChange={handleChange}
          value={formData.cost}
          placeholder="What did it cost?"
          required
        />
        <input 
          type="text"
          name="location"
          onChange={handleChange}
          value={formData.location}
          placeholder="Where did you pay it?"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="" disabled >Select a Category</option>
          <option value="food" default>Food</option>
          <option value="lodging">Lodging</option>
          <option value="activity">Activity</option>
          <option value="transportation">Transportation</option>
          <option value="entertainment">Entertainment</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
        <textarea
          name="note"
          onChange={handleChange}
          value={formData.name}
          placeholder="Additional note"
        />
        <button className={styles['create-expense-btn']}>Create Expense</button>
      </form>
    </>
  )
}

export default AddExpenseForm