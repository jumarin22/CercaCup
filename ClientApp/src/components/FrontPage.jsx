import { Map } from './Map'
import { useHistory } from 'react-router'
import { useState } from 'react'

export function FrontPage() {
  const history = useHistory()
  const [filter, setFilter] = useState('')

  // Note: The ZIP code search is fake and just redirects to the LocationList page regardless of input.
  function handleResults(e) {
    e.preventDefault()
    history.push('/List')
  }

  // Checkbox filter will toggle appropriate map icons on/off by sending new GET string to Map component.
  const handleFilter = (e) => {
    e.preventDefault()
    if (isCafeChecked && !isGasChecked && isFastChecked) setFilter('cf')
    else if (isCafeChecked && isGasChecked && !isFastChecked) setFilter('cg')
    else if (isCafeChecked && !isGasChecked && !isFastChecked) setFilter('c')
    else if (!isCafeChecked && isGasChecked && isFastChecked) setFilter('gf')
    else if (!isCafeChecked && isGasChecked && !isFastChecked) setFilter('g')
    else if (!isCafeChecked && !isGasChecked && isFastChecked) setFilter('f')
    else setFilter('cgf')
  }

  const [isCafeChecked, setIsCafeChecked] = useState(true)
  const handleCafeChange = () => {
    setIsCafeChecked(!isCafeChecked)
  }
  const [isGasChecked, setIsGasChecked] = useState(true)
  const handleGasChange = () => {
    setIsGasChecked(!isGasChecked)
  }
  const [isFastChecked, setIsFastChecked] = useState(true)
  const handleFastChange = () => {
    setIsFastChecked(!isFastChecked)
  }

  return (
    <div className="front-page">
      <h1 className="cup">☕</h1>
      <h1 className="title">Cerca Cup</h1>
      <p className="subtitle">Find the closest cup of coffee near you!</p>
      <div className="center">
        <form className="faux" onSubmit={handleResults}>
          <input
            type="text"
            placeholder="Enter ZIP Code"
            className="faux-input"
          />
        </form>
        <form onSubmit={handleFilter}>
          <div className="check-div">
            <input
              type="checkbox"
              id="cafe"
              checked={isCafeChecked}
              onChange={handleCafeChange}
            />
            <label htmlFor="cafe">Cafe </label>
            <input
              type="checkbox"
              id="gas"
              checked={isGasChecked}
              onChange={handleGasChange}
            />
            <label htmlFor="gas">Gas Station </label>
            <input
              type="checkbox"
              id="fast"
              checked={isFastChecked}
              onChange={handleFastChange}
            />
            <label htmlFor="fast">Fast Food </label>
            <div className="submit-div">
              <input
                className="list-submit"
                type="submit"
                value="Filter!"
              ></input>
            </div>
          </div>
        </form>
      </div>
      <div className="bottom">
        <div className="header-map">
          <Map code={filter} />
        </div>
      </div>
    </div>
  )
}
