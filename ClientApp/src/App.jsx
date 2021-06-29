import React from 'react'
import './custom.scss'
import { BrowserRouter, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { LocationList } from './components/LocationList'
import { LocationPage } from './components/LocationPage'
import { CreateLocation } from './components/CreateLocation'

export function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Header} />
        <Route exact path="/List" component={LocationList} />
        <Route exact path="/Create" component={CreateLocation} />
        <Route path="/List/:id" component={LocationPage} />
      </BrowserRouter>
    </>
  )
}
