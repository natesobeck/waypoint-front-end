// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/trips`

// trips

async function index() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function show(tripId) {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function create(formData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function deleteTrip(tripId) {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function update(updateFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${updateFormData._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

// schedule

async function createScheduleItem(formData, tripId) {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}/schedule`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function deleteScheduleItem(tripId, itemId) {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}/schedule/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function updateScheduleItem(tripId, itemId, formData) {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}/schedule/${itemId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

// packing list

async function createPackingListItem(formData, tripId) {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}/packinglist`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function updatePackingListItem(tripId, itemId) {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}/packinglist/${itemId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function deletePackingListItem(tripId, itemId) {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}/packinglist/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  // trips
  index,
  show,
  create,
  deleteTrip as delete,
  update,

  // schedule
  createScheduleItem,
  deleteScheduleItem,
  updateScheduleItem,

  // packing list
  createPackingListItem,
  updatePackingListItem,
  deletePackingListItem
}