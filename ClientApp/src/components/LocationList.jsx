import { useState, useEffect } from 'react'

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

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
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
        <input type="submit" value="Submit"></input>
      </form>
      {locations.map((location) => (
        <article key={location.id}>
          <p>{setEmoji(location.type)}</p>
          <p>{location.name}</p>
          <p>{location.address}</p>
          <button>Edit</button>
        </article>
      ))}
    </>
  )
}
