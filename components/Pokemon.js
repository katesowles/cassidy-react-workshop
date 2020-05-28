import { useState, useEffect } from 'react'

export default function Pokemon() {
  const [pokémon, setPokémon] = useState('pikachu')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)

  // NOTE: a good way to think about useEffect is that these are just "side effects" to the primary state changes.
  // NOTE: the dependency array typically holds items that ARE state, USE state, or CHANGE state. /// NOTE: An EMPTY dependency array (`[]`) means that the effect ONLY takes place on the initial render.
  // NOTE: A POPULATED dependency array ([itemOne, itemTwo, itemThree...]) means the effect only takes place when those variables are updated.
  // NOTE: NO dependency array means the effect takes place on render and every state change
  // NOTE: when the dependency array is determining whether a value has changed, it's diffing with a `===` equality statement. KEEP IN MIND, that {} !== {} even if the contained key/value pairs are the same!
  // NOTE: A common use for custom hooks is to group like-values or related-values into one single hook; this allows us to clean up the component code and improve reusability if we pull out that new custom hook to a common helpers file.
  const usePokemon = () => {
    useEffect(() => {
      document.title = `hello, ${pokémon}!`.substr(0, 30)

      let isCurrent = true

      fetch(`https://pokeapi.co/api/v2/pokemon/${pokémon}/`)
        .then(res => res.json())
        .then(res => {
          if (isCurrent) setImage(res.sprites.front_default)
        })
        .catch(err => {
          if (isCurrent) setError(err)
        })

      // NOTE: that we can't cancel promises, we used to use componentWillUnmount to "cleanup" requests we wished to cancel, but with useEffect we can return a cleanup function to cancel the state changes. This is also useful if we want to override slow requests, so that the first (slow) request doesn't eventually arrive and wipe out the second (quicker) request
      return () => (isCurrent = false)
    }, [pokémon])
  }

  usePokemon()

  return (
    <>
      <div>
        <div>
          <input
            onChange={e => setPokémon(e.target.value)}
            value={pokémon}
            type="text"
          />
        </div>
        <span>Hello, {pokémon}!</span>
        {image !== null && (
          <img src={image} alt={`image of pokémon ${pokémon}`} />
        )}
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </div>

      <style jsx>
        {`
          body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-size: 20px;
          }

          .pokemon {
            position: relative;
            margin: 20px auto;
            width: 400px;
            height: 400px;
            border: 10px solid #282828;
            border-radius: 50%;
            overflow: hidden;
            text-align: center;
          }

          .pokemon div {
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            background: #d5615e;
            height: 50%;
          }
          .pokemon input {
            margin: auto;
            padding: 5px;
            display: block;
            border: 3px solid #282828;
            border-radius: 10px;
            font-size: 20px;
          }
          .pokemon input:focus {
            outline: 3px dashed #282828;
          }

          .pokemon span {
            text-transform: capitalize;
          }

          .pokemon img {
            margin: auto;
            display: block;
          }
        `}
      </style>
    </>
  )
}
