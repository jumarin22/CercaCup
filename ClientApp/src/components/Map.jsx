import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Map(props) {
  const [locations, setLocations] = useState([])
  const [selectedMapLocation, setSelectedMapLocation] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 25.70352,
    longitude: -80.28997,
    zoom: 13,
  })

  useEffect(() => {
    async function loadLocations() {
      const response = await fetch(`/api/Locations?filter=${props.code}`)

      if (response.ok) {
        const json = await response.json()
        setLocations(json)
      }
    }
    loadLocations()
  }, [props.code])

  useEffect(
    function () {
      if (props.lat && props.lng) {
        setViewport({
          ...viewport,
          latitude: props.lat,
          longitude: props.lng,
          zoom: 15,
        })
      }
    },
    [props.lat, props.lng]
  )

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
    <section className="map">
      <ReactMapGL
        {...viewport}
        style={{ position: 'absolute' }}
        onViewportChange={setViewport}
        width="90%"
        height="50%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <div style={{ position: 'absolute', left: 10, top: 10 }}>
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
            <div className="popup">
              <Link to={`/List/${selectedMapLocation.id}`}>
                {selectedMapLocation.name}
              </Link>
              <p>{truncate(selectedMapLocation.address)}</p>
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
              className="span-emoji"
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
