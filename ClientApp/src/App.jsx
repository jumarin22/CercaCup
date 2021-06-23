import React from 'react'
import './custom.scss'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { Form } from './components/FauxForm'
import { LocationList } from './components/LocationList'
import { LocationPage } from './components/LocationPage'
import { CreateLocation } from './components/CreateLocation'

export function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Header} />
        <Route exact path="/Form" component={Form} />
        <Route exact path="/List" component={LocationList} />
        <Route exact path="/Create" component={CreateLocation} />
        <Route path="/List/:id" component={LocationPage} />
      </BrowserRouter>
    </>
  )
}
