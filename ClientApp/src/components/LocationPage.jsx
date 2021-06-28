import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { Map } from './Map'

export function LocationPage() {
  const [locationItem, setLocationItem] = useState({
    id: undefined,
    name: '',
    type: '',
    address: '',
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
        <input type="text" onChange={(e) => setNewName(e.target.value)} />
      </form>
    )
  }
  function showType() {
    if (typeBool) {
      return `${locationItem.type}`
    }
    return (
      <form onSubmit={patchType}>
        <input type="text" onChange={(e) => setNewType(e.target.value)} />
      </form>
    )
  }
  function showAddress() {
    if (addressBool) {
      return `${locationItem.address}`
    }
    return (
      <form onSubmit={patchAddress}>
        <input type="text" onChange={(e) => setNewAddress(e.target.value)} />
      </form>
    )
  }

  // PATCHes
  async function patchName(e) {
    e.preventDefault()
    await axios.patch(`/api/Locations/${params.id}`, {
      id: params.id,
      name: newName,
    })
    setNameBool(true)
    loadInfo()
  }
  async function patchType(e) {
    e.preventDefault()
    await axios.patch(`/api/Locations/${params.id}`, {
      id: params.id,
      type: newType,
    })
    setTypeBool(true)
    loadInfo()
  }
  async function patchAddress(e) {
    e.preventDefault()
    await axios.patch(`/api/Locations/${params.id}`, {
      id: params.id,
      address: newAddress,
    })
    setAddressBool(true)
    loadInfo()
  }

  return (
    <div className="location-page">
      <section className="edit-location">
        <div className="edit-field">
          <h2>Name: </h2>
          <p onClick={() => setNameBool(false)}>{showName()}</p>
        </div>
        <div className="edit-field">
          <h2>Type: </h2>
          <p onClick={() => setTypeBool(false)}>{showType()}</p>
        </div>
        <div className="edit-field">
          <h2>Address: </h2>
          <p onClick={() => setAddressBool(false)}>{showAddress()}</p>
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
