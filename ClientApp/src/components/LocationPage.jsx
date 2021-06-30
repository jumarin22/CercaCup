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
      <form onSubmit={patchName}>
        <input
          className="patch-field"
          id="show-name"
          type="text"
          onChange={(e) => setNewName(e.target.value)}
          placeholder={locationItem.name}
        />
      </form>
    )
  }
  function showType() {
    if (typeBool) {
      return `${locationItem.type}`
    }
    return (
      <form onSubmit={patchType}>
        <input
          className="patch-field"
          type="text"
          onChange={(e) => setNewType(e.target.value)}
          placeholder={locationItem.type}
        />
      </form>
    )
  }
  function showAddress() {
    if (addressBool) {
      return `${locationItem.address}`
    }
    return (
      <form onSubmit={patchAddress}>
        <input
          className="patch-field"
          type="text"
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder={locationItem.address}
        />
      </form>
    )
  }

  // PATCHes
  async function patchName(e) {
    e.preventDefault()
    await axios.patch(`/api/Locations/${params.id}`, {
      id: params.id,
      name: newName,
      latitude: locationItem.latitude,
      longitude: locationItem.longitude,
    })
    setNameBool(true)
    loadInfo()
  }
  async function patchType(e) {
    e.preventDefault()
    await axios.patch(`/api/Locations/${params.id}`, {
      id: params.id,
      type: newType,
      latitude: locationItem.latitude,
      longitude: locationItem.longitude,
    })
    setTypeBool(true)
    loadInfo()
  }
  async function patchAddress(e) {
    e.preventDefault()
    await axios.patch(`/api/Locations/${params.id}`, {
      id: params.id,
      address: newAddress,
      latitude: locationItem.latitude,
      longitude: locationItem.longitude,
    })
    setAddressBool(true)
    loadInfo()
  }

  return (
    <div className="location-page">
      <p className="instruct">(click info to edit)</p>
      <section className="edit-location">
        <div className="edit-field" onClick={() => setNameBool(false)}>
          <h2>Name:&nbsp;&nbsp;&nbsp;&nbsp;</h2>
          <div>{showName()}</div>
        </div>
        <div className="edit-field" onClick={() => setTypeBool(false)}>
          <h2>Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
          <div>{showType()}</div>
        </div>
        <div
          className="edit-field-address"
          onClick={() => setAddressBool(false)}
        >
          <h2>Address: </h2>
          <div>{showAddress()}</div>
        </div>
        <div className="back-to-list">
          <Link to={'/List'}>&#8592; Back to List</Link>
        </div>
      </section>
      <div className="map-div">
        <Map lat={locationItem.latitude} lng={locationItem.longitude} />
      </div>
    </div>
  )
}
