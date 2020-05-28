import { useState } from 'react'

// NOTE: the way things used to work: `Event => update DOM`
// NOTE: the way things work in React: `Event + Event + Event => update state => update DOM`

export default function Counter() {
  const [count, setCount] = useState(1)

  const handleAdd = () => setCount(count + 1)
  const handleSubtract = () => setCount(count - 1)

  return (
    // NOTE: jQuery and React don't use the same DOM; jQuery works with the DOM in the browser whereas React works with the Virtual DOM. If we were to make an app with both, jQuery wouldn't see the updates made by React.
    // NOTE: In the case of form inputs, since React isn't in control of the DOM when users are in control (changing inputs) in the DOM. These are called Uncontrolled Components — this is the difference of setting `defaultValue` (uncontrolled) to `value` (controlled) attribute and then also requires an `onChange` handler.
    // NOTE: Uncontrolled inputs can be used with w/ React if you just have a formSubmit handler and nothing else manages the state of hte input other than the user; but as soon as you want dynamic control over the input on the fly, it needs to be controlled.

    // NOTE: Uncontrolled version of the counter component (controlled version shown below):
    // <div className="counter">
    //   <button onClick={handleSubtract}>-</button>
    //   <input
    //     type="text"
    //     aria-label="count"
    //     defaultValue={count}
    //   />
    //   <button onClick={handleAdd}>+</button>
    // </div>

    // NOTE: Controlled version of the same component:
    <div className="counter">
      <button onClick={handleSubtract}>-</button>
      <input
        type="text"
        aria-label="count"
        value={count}
        onChange={() => setCount(parseInt(event.target.value, 10))}
      />
      <button onClick={handleAdd}>+</button>
    </div>
  )
}
