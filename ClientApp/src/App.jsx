import React from 'react'
import './custom.scss'

export function App() {
  return (
    <>
      <h1>☕</h1>
      <h1>CercaCup</h1>
      <p className="subtitle">Find the closest cup of coffee near you!</p>
      <form>
        <input type="text" placeholder="Enter zipcode" />
        <br />
        <input type="checkbox" />
        <label htmlFor="vehicle1">Coffee Shops </label>
        <input type="checkbox" />
        <label htmlFor="vehicle2">Gas Stations </label>
        <input type="checkbox" />
        <label htmlFor="vehicle3">Fast Food </label>
      </form>
    </>
  )
}
