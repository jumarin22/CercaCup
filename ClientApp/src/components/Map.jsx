import ReactMapGL from 'react-map-gl'
import { useState } from 'react'

export function Map() {
  //
  const [viewport, setViewport] = useState({
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 9.8,
  })

  return (
    <section className="map">
      <ReactMapGL
        {...viewport}
        style={{ position: 'absolute' }}
        onViewportChange={setViewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <div style={{ position: 'absolute', left: 10 }}>
          {/* <NavigationControl /> */}
        </div>
      </ReactMapGL>
    </section>
  )
}
