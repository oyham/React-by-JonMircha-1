// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Count from './components/Count'
import Componente from './components/Componente'
import Propiedades from './components/Propiedades'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <Count />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <section className='jonmircha'>
        <Componente msg="Hola soy un Componente función envíado como prop" />
        <Propiedades
          cadena="Esto es una cadena de texto"
          numero = {19}
          booleano={true}
          arreglo={[1,2,3]}
          objeto={{nombre:"Oyham",correo:"example@example.com"}}
          funcion={num => num*num}
          elementoReact={<i>Esto es un elemento React</i>}
          componenteReact={<Componente msg="soy un componente pasado como Prop"/>}
        />
      </section>
    </div>
  )
}

export default App
