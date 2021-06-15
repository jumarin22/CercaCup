import { useHistory } from 'react-router'

export function Form() {
  const history = useHistory()

  function handleResults(e) {
    e.preventDefault()
    history.push('/Results')
  }

  return (
    <form onSubmit={handleResults}>
      <input type="text" placeholder="Enter zipcode" />
      <br />
      <input type="checkbox" />
      <label htmlFor="vehicle1">Coffee Shops </label>
      <input type="checkbox" />
      <label htmlFor="vehicle2">Gas Stations </label>
      <input type="checkbox" />
      <label htmlFor="vehicle3">Fast Food </label>
    </form>
  )
}
