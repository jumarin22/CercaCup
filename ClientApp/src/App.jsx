import React from 'react'
import './custom.scss'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { Form } from './components/Form'
import { Results } from './components/Results'
import { LocationPage } from './components/LocationPage'

export function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={Header} />
        <Route path="/Form" component={Form} />
        <Route path="/Results" component={Results} />
        <Route path="/:id">
          <div className="main">
            <LocationPage />
          </div>
        </Route>
      </BrowserRouter>
    </>
  )
}
