import { useState } from 'react'

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

export default function Counter() {
  // NOTE: useState returns a tuple:
  // let count = useState(0);
  // let variable = count[0];
  // let setter = count[1];
  // but most folks just destructure it as shown below
  let [count, setCount] = useState(0)
  let [error, setError] = useState(null)
  // NOTE: use state's "set" function is very performant, it creates a diff and only calls setVariable when the value to be set is different form the current state value.
  // NOTE: useState is local to the component, so the state can't "escape" from each instance of a component... So if we used more than one <Counter /> in a parent component, they'll each have their own state to be managed separately.
  // NOTE: someone in the workshop asked, how many useStates in a component before you switch to a useReducer — Cassidy's response was that her "number" is usually about 4 useStates, but we'll get into that later.

  const add = () => {
    setCount(count + 1)
    setError(null)
  }

  const subtract = () => {
    if (count > 1) setCount(count - 1)
    else setError('value should be positive')
  }

  return (
    <>
      <Button onClick={subtract}>Subtract</Button>
      <div>Let's count: {count} </div>
      <Button onClick={add}>Add</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  )
}
