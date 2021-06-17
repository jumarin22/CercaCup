import { useState, useEffect } from 'react'

export function LocationList() {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    async function loadLocations() {
      const response = await fetch('/api/Locations')

      if (response.ok) {
        const json = await response.json()
        setLocations(json)
      }
    }
    loadLocations()
  }, [])

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
