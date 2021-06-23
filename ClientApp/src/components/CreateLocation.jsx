import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'

export function CreateLocation() {
  const [newLocName, setNewLocName] = useState('')
  const [newLocType, setNewLocType] = useState('')
  const [newLocAddress, setNewLocAddress] = useState('')
  const history = useHistory()

  async function handleCreateNewLoc(e) {
    e.preventDefault()
    const response = await axios.post(`/api/Locations/`, {
      name: newLocName,
      type: newLocType,
      address: newLocAddress,
    })
    history.push('/List')
    setNewLocName('')
    setNewLocType('')
    setNewLocAddress('')
  }

  return (
    <form onSubmit={handleCreateNewLoc}>
      <p>Name: </p>
      <input
        type="text"
        id="new-loc-name"
        value={newLocName}
        onChange={(e) => setNewLocName(e.target.value)}
      ></input>
      <p>Type: </p>
      <input
        type="text"
        id="new-loc-type"
        value={newLocType}
        onChange={(e) => setNewLocType(e.target.value)}
      ></input>
      <p>Address: </p>
      <input
        type="text"
        id="new-loc-address"
        value={newLocAddress}
        onChange={(e) => setNewLocAddress(e.target.value)}
      ></input>
      <br />
      <input type="submit" value="Create!" />
    </form>
  )
}
