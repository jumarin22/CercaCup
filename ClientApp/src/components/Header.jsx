import { Form } from './Form'
import { Map } from './Map'

export function Header() {
  return (
    <>
      <h1>☕</h1>
      <h1>CercaCup</h1>
      <p className="subtitle">Find the closest cup of coffee near you!</p>
      <div className="center">
        <Form />
      </div>
      <Map />
    </>
  )
}
