import { Form } from './Form'
import { useState, useEffect } from 'react'
import { LocationList } from './LocationList'

export function Results() {
  return (
    <>
      <div className="top">
        ☕<Form />
      </div>
      <LocationList />
    </>
  )
}
