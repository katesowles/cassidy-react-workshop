import React from 'react'
// NOTE: the @components rule is set in the config, it's basically a shortcut to the components folder! Could be SUPER useful in larger, more nested applications
import Counter from '@components/Counter'
// NOTE: declarative (React, state-driven) : WHAT you want in an app state; OR setting a thermostat to the specific temp you want to have, and we "don't care how you do it", just make it happen.
// NOTE: imperative (gross jQuery example of parsing text to int, then incrementing value by n) : HOW you get to an app state; OR if too hot, turn the fan speed up, otherwise turn the fan speed down.

const reactElement = <div>Henlo</div>
const reactComponent = () => reactElement
// NOTE: the difference between React Element and React Component is that a React Component is a function that returns a React Element

// NOTE: reactEl is the same as reactElement above — first param is tag type second param is props/attributes, third param is content
// const reactEl = React.createElement('div', null, 'Henlo')

const Button = ({ children, icon, handleClick }) => {
  // NOTE: the children prop is often confused BECAUSE if it is set to a single element, it's an object; otherwise its an array of objects

  // NOTE: `<Button>{element}{element2}</Button>` is the same as `React.createElement(Button, { children: [ element, element2 ]});`

  return (
    <button onClick={handleClick}>
      {icon} {children}
    </button>
  )
}

export default function PropsState() {
  return <Counter />

  // return (
  //   <>
  //     <Button
  //       icon="💚"
  //       handleClick={() => {
  //         console.log('button was clicked!')
  //       }}
  //     >
  //       Children
  //     </Button>
  //     <Button icon="😂">Second Button Children</Button>
  //   </>
  // )

  // return <div>Henlo</div>
  // NOTE: the return statement below with the element abstracted out is the same as the return above
  // return reactElement
  // NOTE: the return statement below is the same as the return statement with the div as it returns the reusable component that returns the original reactElement
}
