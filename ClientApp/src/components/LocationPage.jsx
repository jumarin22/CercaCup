import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Map } from './Map'
import axios from 'axios'

export function LocationPage() {
  const [locationItem, setLocationItem] = useState({
    id: undefined,
    name: '',
    type: '',
    address: '',
    latitude: '',
    longitude: '',
  })
  // Boolean states for displaying static object properties or editable textfields.
  const [nameBool, setNameBool] = useState(true)
  const [typeBool, setTypeBool] = useState(true)
  const [addressBool, setAddressBool] = useState(true)

  // Variables for new locationItem property values to send through PATCH.
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('')
  const [newAddress, setNewAddress] = useState('')

  const params = useParams()
  async function loadInfo() {
    const response = await fetch(`/api/Locations/${params.id}`)
    if (response.status === 200) {
      const json = await response.json()
      setLocationItem(json)
    }
  }
  useEffect(() => {
    loadInfo()
  }, [params.id])

  // Conditional display for each property <div> based on boolean state.
  function showName() {
    if (nameBool) {
      return `${locationItem.name}`
    }
    return (
      <div className="form-container">
        <form className="patch-form" onSubmit={patchName}>
          <input
            className="patch-field"
            id="show-name"
            type="text"
            onChange={(e) => setNewName(e.target.value)}
            placeholder={locationItem.name}
          />
        </form>
      </div>
    )
  }
  function showType() {
    if (typeBool) {
      return `${locationItem.type}`
    }
    return (
      <div className="form-container">
        <form onSubmit={patchType}>
          <input
            className="patch-field"
            type="text"
            onChange={(e) => setNewType(e.target.value)}
            placeholder={locationItem.type}
          />
        </form>
      </div>
    )
  }
  function showAddress() {
    if (addressBool) {
      return `${locationItem.address}`
    }
    return (
      <div className="form-container">
        <form onSubmit={patchAddress}>
          <input
            className="patch-field"
            type="text"
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder={locationItem.address}
          />
        </form>
      </div>
    )
  }

  // PATCHes
  async function patchName(e) {
    e.preventDefault()
    // If user enters an empty string, revert property to original value.
    if (newName === '') {
      await axios.patch(`/api/Locations/${params.id}`, {
        id: params.id,
        name: locationItem.name,
        // Need to include latlongs or they reset to 0.
        latitude: locationItem.latitude,
        longitude: locationItem.longitude,
      })
    } else {
      await axios.patch(`/api/Locations/${params.id}`, {
        id: params.id,
        name: newName,
        latitude: locationItem.latitude,
        longitude: locationItem.longitude,
      })
    }
    setNameBool(true)
    loadInfo()
  }
  async function patchType(e) {
    e.preventDefault()
    if (newType === '') {
      await axios.patch(`/api/Locations/${params.id}`, {
        id: params.id,
        type: locationItem.type,
        latitude: locationItem.latitude,
        longitude: locationItem.longitude,
      })
    } else {
      await axios.patch(`/api/Locations/${params.id}`, {
        id: params.id,
        type: newType,
        latitude: locationItem.latitude,
        longitude: locationItem.longitude,
      })
    }
    setTypeBool(true)
    loadInfo()
  }
  async function patchAddress(e) {
    e.preventDefault()
    if (newAddress === '') {
      await axios.patch(`/api/Locations/${params.id}`, {
        id: params.id,
        address: locationItem.address,
        latitude: locationItem.latitude,
        longitude: locationItem.longitude,
      })
    } else {
      await axios.patch(`/api/Locations/${params.id}`, {
        id: params.id,
        address: newAddress,
        latitude: locationItem.latitude,
        longitude: locationItem.longitude,
      })
    }
    setAddressBool(true)
    loadInfo()
  }

  return (
    <>
      <div className="location-page">
        <section className="edit-location">
          <div className="edit-field" onClick={() => setNameBool(false)}>
            <h2>Name:&nbsp;&nbsp;&nbsp;&nbsp;</h2>
            <div className="show">{showName()}</div>
          </div>
          <div className="edit-field" onClick={() => setTypeBool(false)}>
            <h2>Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
            <div className="show">{showType()}</div>
          </div>
          <div
            className="edit-field-address"
            onClick={() => setAddressBool(false)}
          >
            <h2>Address: </h2>
            <div className="show">{showAddress()}</div>
          </div>
          <div className="back-to-list">
            <Link to={'/List'}>&#8592; Back to List</Link>
          </div>
        </section>
      </div>
      <div className="map-div">
        <Map lat={locationItem.latitude} lng={locationItem.longitude} />
      </div>
    </>
  )
}
