// css
import styles from './PackingList.module.css'

// components
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdOutlineDelete } from "react-icons/md"

// npm modules
import { useEffect, useState } from 'react'

// services
import * as tripService from '../../services/tripService.js'

const PackingList = ({ trip, packingList, setPackingList }) => {
  const [formData, setFormData] = useState({
    name: '',
    packed: false,
  })
  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmitPackingListItem = async (evt) => {
    evt.preventDefault()
    const newList = await tripService.createPackingListItem(formData, trip._id)
    setPackingList([...newList])
    setFormData({
      name: '',
      packed: false,
    })
  }

  const handleUpdateListItem = async (itemId) => {
    const newList = await tripService.updatePackingListItem(trip._id, itemId)
    setPackingList([...newList])
  }

  const handleDeleteListItem = async (itemId) => {
    const newTrip = await tripService.deletePackingListItem(trip._id, itemId)
    console.log(newTrip)
    const newList = newTrip.packingList.filter(item => item._id !== itemId)
    setPackingList(newList)
  }


  useEffect(() => {
    const fetchTrip = async () => {
      const tripData = await tripService.show(trip._id)
      setPackingList(tripData.packingList)
    }
    fetchTrip()
  }, [setPackingList, trip._id])

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <form onSubmit={handleSubmitPackingListItem} className={styles['list-form']}>
          <input 
            placeholder="Name i.e. socks, phone charger"
            name="name"
            type="text"
            value={formData.name || ''}
            onChange={handleChange}
            className={styles['list-input']}
          />
          <button className={styles['submit-btn']}><IoIosAddCircleOutline className={styles.icon}/></button>
        </form>
        <div className={styles['list-container']}>
          <h1 className={styles.header}>My List</h1>
          {packingList.length 
            ? packingList.map(item => (
                <div className={styles['list-item-container']} key={item.name}>
                  <div className={styles['checkbox-container']}>
                    <input type="checkbox" className={styles.checkbox} onClick={() => handleUpdateListItem(item._id)} defaultChecked={item.packed ? true : false}/>
                    <p className={styles['list-item']}>{item.name}</p>
                  </div>
                  <button className={styles['delete-btn']} onClick={() => handleDeleteListItem(item._id)}><MdOutlineDelete className={styles['delete-icon']}/></button>
                </div>
              ))
            : <h3 className={styles.message}>Nothing here yet!</h3>
          }
        </div>
      </div> 
    </div> 
  )
}

export default PackingList