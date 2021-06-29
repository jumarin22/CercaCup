import { useState, useEffect } from 'react'

export function Form() {
  const [filter, setFilter] = useState('')
  const [url, setURL] = useState('')

  useEffect(() => {
    function changeURL() {
      setURL(`/api/Locations?filter=${filter}`)
    }
    changeURL()
    console.log(url)
  }, [filter, url])

  const handleSubmit = (e) => {
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
    <form className="faux" onSubmit={handleSubmit}>
      <br />
      <br />
      <input
        type="checkbox"
        id="cafeCheck"
        checked={isCafeChecked}
        onChange={handleCafeChange}
      />
      <label htmlFor="cafe">Cafe </label>
      <input
        type="checkbox"
        checked={isGasChecked}
        onChange={handleGasChange}
      />
      <label htmlFor="gas">Gas Station </label>
      <input
        type="checkbox"
        checked={isFastChecked}
        onChange={handleFastChange}
      />
      <label htmlFor="fast">Fast Food </label>
      <input type="submit" className="list-submit" value="Submit"></input>
    </form>
  )
}
