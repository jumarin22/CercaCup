import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router'

export function LocationPage() {
  const history = useHistory()
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

  // Variables for new object property values.
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

  function showName() {
    if (nameBool === true) {
      return <p>{locationItem.name}</p>
    }
    return (
      <form onSubmit={putName}>
        <input type="text" onChange={(e) => setNewName(e.target.value)} />
      </form>
    )
  }
  function showType() {
    if (typeBool === true) {
      return <p>{locationItem.type}</p>
    }
    return (
      <form onSubmit={putType}>
        <input type="text" onChange={(e) => setNewType(e.target.value)} />
      </form>
    )
  }
  function showAddress() {
    if (addressBool === true) {
      return <p>{locationItem.address}</p>
    }
    return (
      <form onSubmit={putAddress}>
        <input type="text" onChange={(e) => setNewAddress(e.target.value)} />
      </form>
    )
  }

  async function putName(e) {
    e.preventDefault()
    await axios.put(`/api/Locations/${params.id}`, {
      id: params.id,
      name: newName,
      type: locationItem.type,
      address: locationItem.address,
    })
    setNameBool(true)
    loadInfo()
  }
  async function putType(e) {
    e.preventDefault()
    await axios.put(`/api/Locations/${params.id}`, {
      id: params.id,
      name: locationItem.name,
      type: newType,
      address: locationItem.address,
    })
    setTypeBool(true)
    loadInfo()
  }
  async function putAddress(e) {
    e.preventDefault()
    await axios.put(`/api/Locations/${params.id}`, {
      id: params.id,
      name: locationItem.name,
      type: locationItem.type,
      address: newAddress,
    })
    setAddressBool(true)
    loadInfo()
  }

  return (
    <>
      <div className="nameDiv">{showName()}</div>
      <button onClick={() => setNameBool(false)}>edit name</button>
      <div className="typeDiv">{showType()}</div>
      <button onClick={() => setTypeBool(false)}>edit type</button>
      <div className="addressDiv">{showAddress()}</div>
      <button onClick={() => setAddressBool(false)}>edit address</button>
    </>
  )
}
