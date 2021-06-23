import { Form } from './FauxForm'
import { Map } from './Map'

export function Header() {
  return (
    <>
      <h1 className="cup">☕</h1>
      <h1>CercaCup</h1>
      <p className="subtitle">Find the closest cup of coffee near you!</p>
      <div className="center">
        <Form />
      </div>
      <div className="bottom">
        <div className="header-map">
          <Map />
        </div>
      </div>
    </>
  )
}
