// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Count from './components/Count'
import Componente from './components/Componente'
import Propiedades from './components/Propiedades'
import Estado from './components/Estado'
import ComunicacionComponentes from './components/ComunicacionComponentes'
import CicloVida from './components/CicloVida'
import AjaxApis from './components/AjaxApis'
import ContadorHooks from './components/ContadorHooks'
import ScrollHooks from './components/ScrollHooks'
import RelojHooks from './components/RelojHooks'
import AjaxHooks from './components/AjaxHooks'
import HooksPersonalizados from './components/HooksPersonalizados'
import Referencias from './components/Referencias'
import Formularios from './components/Formularios'
import Estilos from './components/Estilos'
import ComponentesEstilizados from './components/ComponentesEstilizados'

function App() {
  return (
    <div className="App">
        <h1>React por Jonmircha - primera parte</h1>
        <Count />
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
        <Estado />
        <ComunicacionComponentes />
        <CicloVida />
        <AjaxApis />
        <ContadorHooks titulo="por Defecto"/>
        <ScrollHooks />
        <RelojHooks />
        <AjaxHooks />
        <HooksPersonalizados />
        <Referencias />
        <Formularios />
        <Estilos />
        <ComponentesEstilizados />
      </section>
    </div>
  )
}

export default App
