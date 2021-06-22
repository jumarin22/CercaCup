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

  // Variables for new object property values to send through PUT.
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

  // Conditional display for each property <div> based on boolean states.
  function showName() {
    if (nameBool) {
      return <p>{locationItem.name}</p>
    }
    return (
      <form onSubmit={patchName}>
        <input type="text" onChange={(e) => setNewName(e.target.value)} />
      </form>
    )
  }
  function showType() {
    if (typeBool) {
      return <p>{locationItem.type}</p>
    }
    return (
      <form onSubmit={patchType}>
        <input type="text" onChange={(e) => setNewType(e.target.value)} />
      </form>
    )
  }
  function showAddress() {
    if (addressBool) {
      return <p>{locationItem.address}</p>
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
