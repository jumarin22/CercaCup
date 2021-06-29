import axios from 'axios'
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

export function CreateLocation() {
  const [newLocName, setNewLocName] = useState('')
  const [newLocType, setNewLocType] = useState('')
  const [newLocAddress, setNewLocAddress] = useState('')
  const history = useHistory()

  async function handleCreateNewLoc(e) {
    e.preventDefault()
    if (newLocName === '' || newLocType === '' || newLocAddress === '') {
      alert('Fields cannot be empty')
      return
    }
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
    <div className="create-page">
      <form onSubmit={handleCreateNewLoc}>
        <h2>Name: </h2>
        <input
          type="text"
          id="new-loc-name"
          value={newLocName}
          onChange={(e) => setNewLocName(e.target.value)}
        />
        <h2>Type: </h2>
        <input
          type="text"
          id="new-loc-type"
          value={newLocType}
          onChange={(e) => setNewLocType(e.target.value)}
          placeholder="Cafe, Gas Station, or Fast Food"
        />
        <h2>Address: </h2>
        <input
          type="text"
          id="new-loc-address"
          value={newLocAddress}
          onChange={(e) => setNewLocAddress(e.target.value)}
        />
        <br />
        <input type="submit" value="Create!" className="create-button" />
      </form>
      <div className="back-to-list">
        <Link to={'/List'}>&#8592; Back to List</Link>
      </div>
    </div>
  )
}
