import { useState, useReducer } from 'react'
import friendlyWords from 'friendly-words'

// NOTE: Cassidy linked this gist showing how to combine useReducer and useEffect to create a custom usePromise hook: https://gist.github.com/cassidoo/ecaac347694aeb6f906464fbc8ef68c7

// NOTE: useState is just useReducer under the hood:
// const useMyState = (initialValue) {
//   let reducer = (state, action) => state;
//   let [state, dispatch] = useReducer(reducer, initialValue)
//   return [state, dispatch];
// }

// NOTE: First Example using the .reduce method with a numeric state value
// let array = [1, 2, 3, 4, 5]
// let add = (x, y) => x + y
// let sum = array.reduce(add, 0)
// 0 + 1
// 1 + 2
// 3 + 3
// 6 + 4
// 10 + 5
// sum => 15
// console.log({ sum })

// NOTE: Second Example using the .reduce method with a state object
// let initialState = { count: 0, cake: true }
// let actions = [
//   { type: 'ADD', by: 2 },
//   { type: 'MINUS', by: 4 },
//   { type: 'EAT_CAKE' }
// ]
// const reducer = (state, action) => {
//   // return state + action
//   if (action.type === 'ADD') {
//     return { ...state, count: state.count + action.by }
//   } else if (action.type === 'MINUS') {
//     return { ...state, count: state.count - action.by }
//   } else if (action.type === 'EAT_CAKE') {
//     return { ...state, cake: false }
//   } else {
//     return state
//   }
// }
// console.log(actions.reduce(reducer, initialState))

let backgrounds = [
  'Noble',
  'Urchin',
  'Folk Hero',
  'Acolyte',
  'Criminal',
  'Hermit',
  'Guild Artisan',
  'Sage'
]

function randomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)]
}

function randomName() {
  let array = friendlyWords.predicates
  let string = array[Math.floor(Math.random() * array.length)]
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function App() {
  let reducer = (state, action) => {
    switch (action.type) {
      case 'BG_SELECTED': {
        return { ...state, background: action.value }
      }
      case 'BG_NOT_EXIST': {
        return { ...state, error: 'Background does not exist' }
      }
      case 'NO_ERRORS': {
        return { ...state, error: null }
      }
      case 'TOGGLE_DARKMODE': {
        return { ...state, darkMode: !state.darkMode }
      }
      case 'LONG_NAME': {
        return { ...state, error: 'Name is too long' }
      }
      case 'SET_NAME': {
        return { ...state, name: action.name }
      }
      case 'RANDOMIZE': {
        return { ...state, name: randomName(), background: randomBackground() }
      }
    }
  }

  let initialState = {
    darkMode: false,
    name: '',
    background: '',
    error: null
  }

  let [state, dispatch] = useReducer(reducer, initialState)

  // NOTE: our reducer function (above) allows us to replace all the useStates below with the useReducer above
  // let [darkMode, setDarkMode] = useState(false)
  // let [name, setName] = useState('')
  // let [background, setBackground] = useState('')
  // let [error, setError] = useState(null)

  function handleBackgroundSelect(event) {
    let value = event.target.value
    dispatch({ type: 'BG_SELECTED' })
    // dispatch replaces setBackground useState below
    // setBackground(value)

    if (!backgrounds.includes(value)) {
      dispatch({ type: 'BG_NOT_EXIST' })
      // dispatch replaces setError useState below
      // setError('This background does NOT exist.')
    } else {
      dispatch({ type: 'NO_ERRORS' })
      // dispatch replaces setError useState below
      // setError(null)
    }
  }

  return (
    <>
      <div className={`App ${state.darkMode ? 'darkmode' : ''}`}>
        <button
          onClick={() => {
            dispatch({ type: 'TOGGLE_DARKMODE ' })
            // dispatch replaces setDarkMode useState below
            // setDarkMode(!darkMode)
          }}
        >
          Dark Mode {state.darkMode ? 'ON' : 'OFF'}
        </button>{' '}
        <br />
        <input
          type="text"
          placeholder="Type your name"
          value={state.name}
          onChange={event => {
            dispatch({ type: 'SET_NAME ', name: event.target.value })
            // dispatch replaces setName useState below
            // setName(event.target.value)

            if (event.target.value.length > 15) {
              dispatch({ type: 'LONG_NAME' })
              // dispatch replaces setError useState below
              // setError('Name is WAY too long, bucko.')
            }
          }}
        />
        <select value={state.background} onChange={handleBackgroundSelect}>
          {backgrounds.map(b => {
            return <option key={`bg-${b}`}>{b}</option>
          })}
        </select>
        {state.error && (
          <div className="error">
            {state.error}
            <button
              onClick={() => {
                dispatch({ type: 'NO_ERRORS' })
                // dispatch replaces setError useState below
                // setError(null)
              }}
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="sheet">
          <h2>Name: {state.name}</h2>
          <h2>Background: {state.background}</h2>
        </div>
        <button
          onClick={() => {
            dispatch({ type: 'RANDOMIZE' })
            // dispatch replaces setName AND setBackground useState below
            // setName(randomName())
            // setBackground(randomBackground())
          }}
        >
          Do it all for me instead
        </button>
      </div>
      <style jsx>{`
        .App {
          width: 100vw;
          height: 100vh;
          font-family: sans-serif;
          text-align: center;
        }

        .App.darkmode {
          background: black;
          color: white;
        }

        button,
        input,
        select {
          margin: 10px;
          padding: 5px;
          background: white;
          border: 3px solid black;
          color: black;
          font-size: 20px;
        }

        input {
          width: 250px;
        }

        .darkmode button,
        .darkmode input,
        .darkmode select {
          background: black;
          border: 3px solid white;
          color: white;
        }

        .error {
          color: red;
        }

        .sheet {
          margin: 5px auto;
          max-width: 400px;
          text-align: left;
        }

        [data-reach-combobox-popover] {
          font-family: sans-serif;
        }

        .darkmode[data-reach-combobox-popover] {
          background: black;
          color: white;
        }

        [data-reach-combobox-option]:hover {
          background: red;
        }
      `}</style>
    </>
  )
}
