import ReactMapGL from 'react-map-gl'
import { useState } from 'react'

export function Map() {
  //
  const [viewport, setViewport] = useState({
    latitude: 25.70352,
    longitude: -80.28997,
    zoom: 13,
  })

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
          {/* <NavigationControl /> */}
        </div>
      </ReactMapGL>
    </section>
  )
}
