# APUNTES 


# 17. _Hook useEffect_ ScrollHooks

###### se pueden tener tantos useEffects como se necesiten

Cada vez que se necesite renderizar cada componente, useEffect va a ejecutar **TODO** lo que este en dicha función.

useEffect recibe un segundo parametro que son las **dependencias** que debe de _leer_ llamado *React.DependencyList* es un arreglo [].

Si se necesita que una peticion (llamada a una API externas) se deba de ejecturar una vez, React recomienda dejar el segundo parametro _dependencia_ vacío [].

Si un useEffect no tiene definido el segundo parametro, se ejecutara todo lo que esté dentro cada vez que se renderize el componente. ~¡¡¡Esto podria crear loops infinitos!!!~ 
---
useEffect *permite devolver una función.* Si un useEffect **posee** un `return()=>{}`, internamente React lo entienede como una fase de Desmontaje del efecto.
 _Ej_:
- Desuscribirte de servicios.
- Desconectarte de Apis. 
- Limpiar intervalos de tiempo. 
- Limpiar manejadores de eventos. 

---

# 18. _Hook useEffect_ RelojHooks

```js
const [visible, setVisible] = useState(false)

    useEffect(() => {
       let temporizador;

    },[visible])
```

Al cambiar el valor de la variable visible **(variablede estado)** se ejecturá lo que exista dentro del useEffect.

---

# 19. _Peticiones Asíncronas con Hooks (AJAX Y API's)_ AjaxHooks

La funcion Pokemon que pinta en el DOM los pokemons, hace una destructuración de las props con {} tal que queda de la siguiente manera: 
```js
    function Pokemon({ avatar, name }) {
           return (
        <figure>
            <img src={avatar} alt={name} />
            <figcaption>{name}</figcaption>
        </figure>
        )
    }
```
Luego para la llamada a la api, no realizaremos la destructuración con ` let pokemons = [...this.state.pokemons, pokemon]` ya que se puede simplificar con el useState: `setPokemons((pokemons)=>[])` (modifíca el estado de la variable hook). 

---

La variable que actualiza setPokemons es `setPokemons(( `*pokemons*` ))`. Luego se le indica a setPokemons que *_destructure_* lo que trae la variable pokemons *+* el pokemon que se añade con el _let_ luego del `.then((jason)=>{let pokemon={}...})` quedando esto así `setPokemons((pokemons)=>[...pokemons,pokemon])`

---

Si hablamos de Asincronía en la función que recíbe el useEffect, colocaríamos el **async**: `useEffect(async() => {`, pero  según los ingenieros de Facebook, esto sería un *Anti-patron*... una mala práctica. Ellos sugieren que si se necesita una petición asíncrona dentro de un hook y useEffect, se debe crear una const dentro del useEffect y ahí SI volverla asíncrona.

##### no volver asíncrona la callback que recibe como parametro el useEffect.

```js
    const getPokemons =  async () => {
            //Aqui se colocaría la petición a la api
        }

        getPokemons()
```
###### definir la funcion asincrona de forma expresada, aplicar el async y dentro del mismo useEffect la invocamos.
*_Hasta podríamos pasarle como parametro la url_* ` const getPokemons =  async (url) =>` *+* `getPokemons("https://...")`

---

# 20. _Custom Hooks_ HooksPersonalizados
##### Personalizar una función que se utilice mucho, estandarizarlo en un hook para su reciclado. 

*Recomendación:* para que React sepa que se está usando un hook personalizado, el hook debe empezar con la palabra clave _*"use"*_ y con lowerCamelCase. Ej: useFetch
---

---
En el ejemplo dado por Jon, en el useFetch no se importa React, sólo se importa los useState/useEffect ya que lo que se crea no es un componente funcional, sino literal, es una función que luego se utilizara en el archivo HooksPersonalizados.
##### (metodo por defecto que utiliza fetch: GET).

El hook personalizado debe de devolver ciertos valores, por eso se debe de utilizar un *return*. Se puede retonar lo que sea, {} [] number string boolean etc.

En el ejemplo, una buena practica es que al crear un hook personalizado, llamar a las const con algun nombre varbiale para que se adapte a cualquier llamado y uso futuro. Ej `const getPokemons = async (url) =>` se cambia por `const getData = async (url) =>`

Utilizamos un try{}catch{} para la manipulación de errores.
THROW = return de los errores.

### Petición genérica.
Por eso se elimína el forEach de los pokemons ya que esa lógica debe ir aparte, exactamente en el hook personalizado, en el que va a usar el useFetch.


---

# 21. _Referencias_ Referencias

Es una manera en que react nos permite *CONTROLAR* un elemento que ya ha sido cargado al *DOM* sin tener que hacer un Render total del DOM por el cambio de estado.

### *createRef y useRef* se utilíza para crear las referencias.
Las referencias pueden ser tomadas como un selector que YA existe en el DOM pero... dentro de React.

## NO se puede usar createRef en componentes funcionales.
!!!NOTA: si poseemos un class component, utilizamos createRef para crear la var de referencia. Pero si utilizamos hooks, se usa useRef. Tampoco hay que abusar de las refs, ya que esta tecnica, aunque no haga manipulación directa al DOM, las referencias *SI* existen en el DOM real, a diferencia de las variables de estado que existen en el DOM virtual.

---

# 22. _Formularios_ 

###### Formularios NO controlados - Formularios controlados.

!Al utilizar etiquetas label, su propiedad for se cambia por htmlFor, y si bajo poseemos un input con un id... ese nombre debe de ir en la prop htmlfor.
---

## Input

React recomienda para trabajar el manejo del estado, es crear una var de estado y asignarsela al *input*.

!Cuiado. Si proveemos la etiqueta 'value', esta prop de un el de form no puede estar sin el evento onChange para el manejo del cambio. Si queremos un valor por default, se utiliza defaultValue.
`onChange={(e) => setNombre()}` _e_ es el objeto que origina el evento, en este caso el input.

Asi se obtiene un input controlado mediante el estado:

```js
export default function Formularios() {
    const [nombre, setNombre] = useState('')
    return (
        <>
            <form htmlFor='nombre'>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id='nombre'
                    name='nombre'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </form>
        </>
    )
}
```
---
## Radio
Los inputs de tipo radio y checkbox realmente son como valores booleanos... los radio todos deberian tener el mismo name para solamente poder seleccionar una sola alternativa.

```js
<input type="radio"
    id='vanilla'
    name='sabor'
    value='vailla'
    onChange={handleChange}
    defaultChecked
/>
```

Si queremos que un input aparezca ya chequeado, se debe de utilizar *defaultChecked.*

## Select
```js
<select
    name="lenguaje"
    onChange={(e) => setLenguaje(e.target.value)}
    defaultValue=""
>
    <option value="">---</option>
    <option value="js">Javascript</option>
</select>
```

## Checkbox
 `onchange={(e) => setTerminos(e.target.checked)}` *checked* = boolean.

## Submit
Se le debe agregar al from el ``onSubmit={handleSubmit}``.
```js
const handleSubmit = e => {
        e.preventDefault()
        alert('El formulario se ha enviado')
    }
```

## Formulario _Complejo_
Solo tendremos una variable de estado por cada input, solo tendremos una. `const [form, setForm] = useState({})`.

Luego tendremos 2 eventos.

- `const handleChange` es la función que se encargará de manejar los eventos en todos los form que decidamos vincular. 
- ` const handleSubmit`.

Es muy importante que los _el_ del form tengan el atributo *name*
---
Ya que indicaremos que por lo que ya traiga la variable de estado, utilizaremos el _spread operator_ para hacer una mezcla de lo que ya tenga el form + el e.target.name (el elemento que generó el evento) guiandonos a traves del name.

!Si queremos que el `e.target.name` se  vuelva una propiedad del objeto, debemos de utilizar la destructuración para decir: mezcla lo que ya traiga el form con `[e.target.name]`; y si ya detecta que esta prop existía prev en el objeto que viene, la actualizará con `e.target.value`

```js
const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
```

Para los inputs que deban de evaluar un checked y no un value, generamos un nuevo manejador `const handleChecked` y solo cambiamos value por cheked.

`[e.target.name]:e.target.checked`

---

# 23. *_Estilos CSS_* Estilos
En index.css tendriamos los estilos de reseteo, y en app.css los estilos directos aplicados y personalizados al DOM.

Se sugiere que si se trabajan los estilos con un archivo.css aparte, usando la importación para la aplicacion de estos... el archivo sea llamado del mismo nombre que del archivo.jsx, y sea *colocado* en la misma carpeta.

Otra estructura seria dividir los componentes en carpetas y cada uno con su respectivo css.

El import de los archivos css si es que se encuentra en la misma carpeta del componente sería tal que así `import "./Estilos.css"`

Otra manera seria aplicar estilos en linea con la etiquieta `style={{}}`.
 *Recordemos que los estilos se manejan como objetos*, por eso los {}
---

Tambien podemos añadir estilos en el mismo componente con un `let myStyles={}` y pasarlo como prop con la etiqueta `style={myStyles}`.

!@import-normalize en el *index.css* para importar un normalize si lo creemos necesario.

## Estilos como MODULOS
Se debe de crear un archivo css con el nombre del componenten y agregar .module.css `Estilos.module.css`. Luego en el import creamos una variable que almacene todos los selectores de los estilos. `import moduleStyles from "./Estilos.module.css"`. Aplicación: `className={moduleStyles.success}`.

## Instalar SASS
`npm install node-sass` || `npm add --save-dev sass` <- Este me funcionó. Cabe recalcar que estoy usando vite. Aunque primero hice el install con node-sass...
---
NOTA: los caracteres 7 y 8 del código hexadecimal representa la opacidad.

---

# 24. *_Styled Components_*
#### Es una librería. npm install --save styled-components. Installar styled-components-snippet 

Esta libraría ya trae un wraped de todas las etiquetas react. Una forma de aplicación es creando una *const* y aplicando el styled.(la etiqueta que se desee aplicar estilo) + `` (donde iran las props css).

```js
const MyH3 = styled.h3`
    padding: 2rem;
    text-align: center;
    color: #49011;
    `;

    <MyH3>Hola Soy un h3</MyH3>
```
Tambien podemos hacer uso de la _interpolación_, y hasta aplicar funciones a estas interpolaciones para manejos mas especificos segun deseemos que posea cada etiqueta react.

```js
 let mainColor = "#db7093",
        mainAlphaColor80 = '#db709380';

    const setTransitionTime = (time) => `all ${time} ease-in-out`

    const MyH3 = styled.h3`
    background-color: ${mainColor};
    transition: ${setTransitionTime("1s")};

    &:hover{
        background-color: ${mainAlphaColor80}
    }
    `;
```

En este caso estamos manejando el tiempo del transition, y ademas estamos cambiando el color al hacer hover con los lets creados previamente.

Tambien podemos pasar props como etiquetas dentro del mismo `<MyH3 color:"#fff"></MyH3>` y el styled.h3 quedaría así: 
```js
    color: ${props => props.color};
    color: ${({color}) => color}; 
    color: ${({color}) => color || "#000"}; 
```
~_Simplificación en cascada_~

``import {css} from 'styled-components'`` sirve para usar styled-components dentro de él mismo para permitir interpolar mas templatestrings con codigo css.

`<MyH3 isButton>Soy un h3 estilizado como botón</MyH3>`
```js
${(props) => props.isButton &&
            css`
            margin: auto;
            max-width: 50%;
            border-radius: 0.25rem;
            cursor: pointer;
         `
 }
```
DESTRUCTURACIÓN: `${({isButton}) => isButton`

Animaciones internas: `import {keyframes}` 
```js
const fadeIn = keyframes`
        0%{
            opacity:0;
        }
        100%{
            opacity:1;
        }
    `

 const MyH3 = styled.h3`
    animation:${fadeIn} 2s ease-out;    
```

Light/Dark Theme con `{ThemeProvider}` from 'styled-components'. Al utilizar un themeprovider funciona como un contenedor, genera un contexto.
```js
  const light ={
        color:"#111",
        bgColor:"#DDD"
    }

    const dark ={
        color:"#DDD",
        bgColor:"#111"
    }

    const Box = styled.div`
        padding: 1rem;
        margin: 1rem;
        color:${({theme})=>theme.color};
        background-color:${({theme})=>theme.bgColor}
    `  
 return(   
 <ThemeProvider theme={light}>
  <Box>Soy una caja light</Box>
 </ThemeProvider>
 <ThemeProvider theme={dark}>
  <Box>Soy una caja dark</Box>
 </ThemeProvider>
 )
```
Heredación de estilos de componentes ya hechos. Para esto creamos una const e igualamos a styled() llamada como función y entre sus parentesis indicamos de donde queremos que herede dichos estilos: `const BoxRounded=styled(Box)`
```js
const BoxRounded=styled(Box)`
        border-radius:1rem;
    `

    <BoxRounded>Redondeada</BoxRounded>
```
La ultima funcionalidad que veremos se llama Global Style `{createGlobalStyle}`. Se recomienda que se haga la llamada en index.jsx o app.jsx...
```js
const GlobalStyle = createGlobalStyle`
        h2 {
            padding: 2rem;
            background-color:#fff;
            color:#61dafb;
            text-transform: uppercase;
        }
    `

    retrun(
        <GlobalStyle />
        ...
    )
```

---

# 25. *_Frameworks CSS_*
#### Maquetación para la facilitación del diseño.

Bootstrap
---
Con bootstrap es necesario cambiar el codigo html por jsx, como por ej los class por className, cerrar los así <hr />, tabindex por tabIndex, los buttons que cierran en una misma línea...

Bulma. Framework moderno. No depende de JQuery
---

---

# 26. *_React Bootstrap & Material UI_*
### npm install react-bootstrap bootstrap | npm i @material-ui/core
Recordar que sólo podemos usar un framework a la vez.

---

# 27. *_React DevTools & Snippets_*

RDtools. Components sirve para ver el arbol de los hijos, y dentro de las caracteristicas se iran cargando las props dentro del manejo del estado, y las hooks. Tambien nos muestra la linea de código en source.

- El reloj: Suspend es una manera de hacer peticiones asíncronas. 
- El ojo: te lleva al elemento ya cargado en el DOM del componente que hayamos seleccionado.
- El bug/Bicho: nos da un log del componente en cuestión y colocara toda la info en la consola del browser.
- Los <>: nos mostrara en la consola el codigo original en la pesaña de source.

El profiler es para ir grabando todas las acciones que ejecute nuestra app y nos genera unas caracteristicas del rendimiento. 

---
Los Snippets son atajos para escribir los componentes de manera mas rapida para ahorrar tiempo. 
Si por algún motivo no nos salen los atajos de manera automatica, podemos ejecturalos de forma manual con ctrl + barra espaciadora. 

















    





