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
      <br />
      <input type="checkbox" />
      <label htmlFor="cafe">Cafe </label>
      <input type="checkbox" />
      <label htmlFor="gas">Gas Station </label>
      <input type="checkbox" />
      <label htmlFor="fast">Fast Food </label>
    </form>
  )
}
