import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function LocationList() {
  const [locations, setLocations] = useState([])
  const [filter, setFilter] = useState('')

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

  // Filters list results.
  const handleFilter = (e) => {
    e.preventDefault()
    if (isCafeChecked && !isGasChecked && isFastChecked) setFilter('cf')
    else if (isCafeChecked && isGasChecked && !isFastChecked) setFilter('cg')
    else if (isCafeChecked && !isGasChecked && !isFastChecked) setFilter('c')
    else if (!isCafeChecked && isGasChecked && isFastChecked) setFilter('gf')
    else if (!isCafeChecked && isGasChecked && !isFastChecked) setFilter('g')
    else if (!isCafeChecked && !isGasChecked && isFastChecked) setFilter('f')
    else setFilter('cgf')
  }

  //Checkbox states.
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

  //Converts object property "Type" to emoji.
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

  //Shortens object property "Address" string.
  function truncate(address) {
    return address.split(',')[0]
  }

  // Avoids console error for faux ZIP code search
  function doNothing(e) {
    return
  }

  return (
    <div className="list-page">
      <form
        className="list-form"
        onSubmit={(e) => {
          handleFilter(e)
        }}
      >
        <div className="text-div">
          <label htmlFor="text-input">Zip:</label>
          <input
            className="list-text"
            type="text"
            id="text-input"
            value="33143"
            onChange={doNothing}
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
            <input
              type="submit"
              className="list-submit"
              value="Filter!"
            ></input>
          </div>
        </div>
        <div className="create-link">
          <Link to={'/Create'}>+ Add New Location</Link>
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
    </div>
  )
}
