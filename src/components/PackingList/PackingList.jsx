// css
import styles from './PackingList.module.css'

// components
import { IoIosAddCircleOutline } from 'react-icons/io'

// npm modules
import { useState } from 'react'

// services
import * as tripService from '../../services/tripService.js'

const PackingList = ({ trip, packingList, setPackingList }) => {
  const [showAddPackingListItem, setShowAddPackingListItem] = useState(false)
  const [formData, setFormData] = useState({
    name: ''
  })
  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleShowAddPackingListItem = () => {
    setShowAddPackingListItem(!showAddPackingListItem)
  }

  const handleSubmitPackingListItem = evt => {
    evt.preventDefault()
    tripService.createPackingListItem(formData, trip._id)
    setPackingList([...packingList, formData])
  }

  const handleUpdateListItem = (itemId) => {
    tripService.updatePackingListItem(trip._id, itemId)
    const newItem = trip.packingList.find(item => item._id === itemId)
    newItem.packed = !newItem.packed
    const newList = trip.packingList.map(item => (
      item._id !== itemId ? item : newItem
    ))
    setPackingList(newList)
  }

  return (
    <div> 
      {!showAddPackingListItem && 
        <button 
          onClick={handleShowAddPackingListItem}
          className={styles['add-list-item-btn']}>
            <div className={styles['btn-text-icon-container']}>
              <div>Add to my List</div>
              <IoIosAddCircleOutline className={styles.icon}/>
            </div>
        </button>
      }
      {showAddPackingListItem && 
        <form onSubmit={handleSubmitPackingListItem} className={styles['list-form']}>
          <input 
            placeholder="Name i.e. socks, phone charger"
            name="name"
            type="text"
            value={formData.name || ''}
            onChange={handleChange}
            className={styles['list-input']}
          />
          <button className={styles['submit-btn']}><IoIosAddCircleOutline /></button>
        </form>
      }
      <div className={styles['list-container']}>
        <h1 className={styles.header}>My List</h1>
        {packingList.length 
          ? packingList.map(item => (
              <div className={styles['list-item-container']} key={item.name}>
                <input type="checkbox" className={styles.checkbox} onClick={() => handleUpdateListItem(item._id)} defaultChecked={item.packed ? true : false}/>
                <p className={styles['list-item']}>{item.name}</p>
              </div>
            ))
          : <h3 className={styles.message}>Nothing here yet!</h3>
        } 
          
      </div>
    </div> 
  )
}

export default PackingList