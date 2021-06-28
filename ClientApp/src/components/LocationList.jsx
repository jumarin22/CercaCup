import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

export function LocationList() {
  const [locations, setLocations] = useState([])
  const [filter, setFilter] = useState('')
  const history = useHistory()

  useEffect(() => {
    async function loadLocations() {
      const response = await fetch(`/api/Locations?filter=${filter}`)

      if (response.ok) {
        const json = await response.json()
        setLocations(json)
      }
    }
    loadLocations()
  }, [filter])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isCafeChecked && !isGasChecked && isFastChecked) setFilter('cf')
    else if (isCafeChecked && isGasChecked && !isFastChecked) setFilter('cg')
    else if (isCafeChecked && !isGasChecked && !isFastChecked) setFilter('c')
    else if (!isCafeChecked && isGasChecked && isFastChecked) setFilter('gf')
    else if (!isCafeChecked && isGasChecked && !isFastChecked) setFilter('g')
    else if (!isCafeChecked && !isGasChecked && isFastChecked) setFilter('f')
    else setFilter('cgf')
  }

  const [isCafeChecked, setIsCafeChecked] = useState(true)
  const handleCafeChange = () => {
    setIsCafeChecked(!isCafeChecked)
  }
  const [isGasChecked, setIsGasChecked] = useState(true)
  const handleGasChange = () => {
    setIsGasChecked(!isGasChecked)
  }
  const [isFastChecked, setIsFastChecked] = useState(true)
  const handleFastChange = () => {
    setIsFastChecked(!isFastChecked)
  }

  function setEmoji(type) {
    if (type.toLowerCase().includes('cafe')) {
      return '☕'
    } else if (type.toLowerCase().includes('gas')) {
      return '⛽'
    } else if (type.toLowerCase().includes('fast')) {
      return '🍔'
    } else {
      return '❓'
    }
  }

  function truncate(address) {
    return address.split(',')[0]
  }

  return (
    <div className="list-page">
      <form
        className="list-form"
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <div className="text-div">
          <label htmlFor="text-input">Zip:</label>
          <input
            type="text"
            className="list-text"
            id="text-input"
            value="33143"
          />
        </div>
        <div className="check-div">
          <input
            type="checkbox"
            id="cafe"
            checked={isCafeChecked}
            onChange={handleCafeChange}
          />
          <label htmlFor="cafe">Cafe </label>
          <input
            type="checkbox"
            id="gas"
            checked={isGasChecked}
            onChange={handleGasChange}
          />
          <label htmlFor="gas">Gas Station </label>
          <input
            type="checkbox"
            id="fast"
            checked={isFastChecked}
            onChange={handleFastChange}
          />
          <label htmlFor="fast">Fast Food </label>
          <div className="submit-div">
            <input type="submit" className="list-submit" value="Submit"></input>
          </div>
        </div>
      </form>
      {locations.map((location) => (
        <article key={location.id}>
          <p className="list-emoji">{setEmoji(location.type)}</p>
          <p>{location.name}</p>
          <p>{truncate(location.address)}</p>
          <div className="list-link">
            <Link to={`/List/${location.id}`}>View</Link>
          </div>
        </article>
      ))}
      <div className="create-link">
        <Link to={'/Create'}>+ Add New Location</Link>
      </div>
    </div>
  )
}
