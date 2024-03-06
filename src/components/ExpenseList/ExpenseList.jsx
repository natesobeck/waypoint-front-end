// npm modules
import { useState, useEffect } from 'react'

// components
import { IoIosAddCircleOutline } from 'react-icons/io'
import ExpenseCard from '../ExpenseCard/ExpenseCard'

// css
import styles from './ExpenseList.module.css'

// services
import * as tripService from '../../services/tripService'

const ExpenseList = ({ trip, expenses, setExpenses }) => {

  const [showAddExpense, setShowAddExpense] = useState(false)

  const [formData, setFormData] = useState({
    expense: '',
    location: '',
    category: 'food',
    cost: '',
    note: ''
  })

  const [totalExpense, setTotalExpense] = useState(null)

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleShowAddExpense = () => {
    setShowAddExpense(!showAddExpense)
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const newExpenses = await tripService.createExpense(formData, trip._id)
    setExpenses([...newExpenses])
  }

  useEffect(() => {
    function getTotalExpense(expenses) {
      const total = expenses.reduce((totalExpenses, currentExpense) => {
        return totalExpenses + currentExpense.cost
      }, 0)
      return total
    }
    setTotalExpense(getTotalExpense(expenses))
  }, [expenses])

  return (  
    <div className={styles.container}>
      {!showAddExpense &&
        <button 
          className={styles['add-expense-btn']}
          onClick={handleShowAddExpense}
        >
          <div 
            className={styles['btn-text-icon-container']}
          >
            Add an Expense 
            <IoIosAddCircleOutline 
              className={styles.icon}
            />
          </div>
        </button>
      }
      {showAddExpense &&
        <form 
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <h3>Add an Expense</h3>
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
      }
      <h2 className={styles['total-message']}>Total trip cost: <span className={styles.total}>${totalExpense}</span></h2>
      {expenses
        ? <div 
            className={styles['expense-list-container']}
          >
            {expenses.map(expense => (
            <ExpenseCard 
              expense={expense}
              key={expense._id}
              expenses={expenses}
              setExpenses={setExpenses}
              tripId={trip._id}
            />
            ))}
          </div>
        : <h3>You don't have any expenses here yet!</h3>
      }
    </div>
  )
}

export default ExpenseList