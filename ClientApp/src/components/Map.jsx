import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl'
import { useState, useEffect } from 'react'

export function Map() {
  const [viewport, setViewport] = useState({
    latitude: 25.70352,
    longitude: -80.28997,
    zoom: 13,
  })
  const [locations, setLocations] = useState([])
  useEffect(() => {
    async function loadLocations() {
      const response = await fetch(`/api/Locations`)

      if (response.ok) {
        const json = await response.json()
        setLocations(json)
      }
    }
    loadLocations()
  }, [])
  const [selectedMapLocation, setSelectedMapLocation] = useState(null)

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
    <section className="map">
      <ReactMapGL
        {...viewport}
        style={{ position: 'absolute' }}
        onViewportChange={setViewport}
        width="90%"
        height="50%"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <div style={{ position: 'absolute', left: 10 }}>
          <NavigationControl />
        </div>

        {selectedMapLocation ? (
          <Popup
            latitude={selectedMapLocation.latitude}
            longitude={selectedMapLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedMapLocation(null)}
            offsetTop={-5}
          >
            <div>
              <p>{selectedMapLocation.name}</p>
              <p>{selectedMapLocation.description}</p>
            </div>
          </Popup>
        ) : null}

        {locations.map((location) => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
          >
            <span
              role="img"
              aria-label="coffee"
              onClick={() => setSelectedMapLocation(location)}
            >
              {setEmoji(location.type)}
            </span>
          </Marker>
        ))}
      </ReactMapGL>
    </section>
  )
}
