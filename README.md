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

Los Snippets son atajos para escribir los componentes de manera mas rapida para ahorrar tiempo. 
Si por algún motivo no nos salen los atajos de manera automatica, podemos ejecturalos de forma manual con ctrl + barra espaciadora. 

---

# 28. CRUD App: Creacion de componentes y renderizado de datos (1/4)

Los primeros pasos para crear el CRUD es crear un archivo llamado ``CrudApp``, en este se encontrara el _*formulario*_ donde iremos agregando datos, y una _*tabla*_ donde se iran pintando dichos datos en el DOM.
También creamos una base de datos para hacer uso de la petición a utilizar.

```js
const initialDb = [
    {
        id: 1,
        name: "Seiya",
        constellation: "Pegaso",
    },
]
export default function CrudApp() {
    return (
        <>
            <h2>CRUD App</h2>
            <form></form> Aquí iría el CrudForm
            <table></table> Aquí iría el CrudTable
        </>
    )
}
```

Para la creación del form trabajaremos con componentes separados para un mejor manejo de estos, asi que crearemos un ``CrudForm.jsx``. Este posee el formulario y los eventos correspondientes. Necesitamos *3* manejadores que se encargaran de: 
- handleChange: manejara los inputs donde iran las entradas strings, en este caso nombre y constelación.
- handleSubmit: manejara el form con la etiqueta onSubmit ya que se encargará de hacer el envío de los datos.
- handleReset: manejara el input con type='reset', este se encarga de resetear el formulario con el *e* onClick.

Inicialmente crearemos una const que posea las props de la base de datos que creamos para que no haya warnings a la primera inicialización del formulario. ``InitialFrom`` será el estado inicial de los inputs con value form.
```js
const initialForm = {
  name:"",
  constellation:"",
  id: null,
}


export const CrudForm = () => {
    const [form,setForm] = useState(initialForm)

    const handleChange = (e) =>{}
    const handleSumbit = (e) =>{}
    const handleReset = (e) =>{}

  return (
    <div>
        <h3>Agregar</h3>
        <form onSubmit={handleSumbit}>
            <input onChange={handleChange} value={form.name} type="text" name='name' placeholder='nombre' />
            <input onChange={handleChange} value={form.constellation} type="text" name='constelattion' placeholder='constelación' />
            <input type="submit"/>
            <input onClick={handleReset} type="reset" value ='Limpiar'/>
        </form>
    </div>
  )
}
```
Ya hecho este paso seguiremos con la creación del ``CrudTable``. Esta tendrá la función de mostrar los datos obtenidos de la initialDb que creamos en ``CrudApp``, y mostrará los datos que iremos agregando a traves del ``CrudForm``. 
```js
export const CrudTable = () => {
    return (
        <>
            <h3>Tabla de Datos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Constelación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Oyham</td>
                        <td>Piscis</td>
                        <td>
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
```
Para mostrar la base de datos inicial debemos de crear un useState con el estado inicial InitialDb, para luego pasarla como prop a la CrudTable, quedando lo siguiente:

```js
const initialDb = [...]

export default function CrudApp() {
    const [db,setDb] = useState(initialDb)

    return (
        <>
            <h2>CRUD App</h2>
            <CrudForm />
            <CrudTable data={db} />
        </>
    )
}
```
La prop data sera envíada al CrudTable, y este hara la destruccturación: ``export const CrudTable = ({data}) =>``

Luego en el CrudTable haremos una separación de lo que se encuentre en tbody, creando así un nuevo componente llamado ```CrudTableRow``. Este poseera lo que prev se encontraba en el tbody. 

En el CrudTable, en la parte del tbody, realizaremos un conditional render, preguntandonos sobre la Db en caso de que exista pero vacía. Si no viene vacía realizaremos un mapeo  por cada *_el_* proveniente de dicha base de datos, y por cada uno renderizara el componente ``CrudTableRow``.

```js
<tbody>
    {data.lenght === 0 ? (
         <tr>
            <td colSpan="3">Sin datos</td>
        </tr>
        ) : (
            data.map(el => <CrudTableRow key={el.id} el={el}/>)
        )}
</tbody>
```
### No debemos de olvidarnos del atributo key, y pasaremos la prop el (datos del elementos).

Al añadir el atributo *_el_* al componente, éste será enviado como prop {el} `export const CrudTableRow = ({el}) =>`, para así poder pintar el DOM con la initialDb.
```js
<tr>
    <td>{el.name}</td>
    <td>{el.constellation}</td>
    <td>
        <button>Editar</button>
        <button>Eliminar</button>
    </td>
</tr>
```

---

# 29. CRUD App: Inserción de datos (2/4)

Comenzamos creando una `const createData = (data) => {}`. Esta función creara un nuevo registro en nuestra base de datos falsa. Recibira el objeto data con la info que usará para crear dichos datos. También necesitamos una `const updateData = (data) => {}`. Tambien necesita la data para la actualización de la base de fatos falsa. Y por ultimo creamos la `const deleteData = (id) => {}`, que sólo necesita la id para poder acceder a dicha prop y eliminar la data que queramos.

Luego dentro del CrudApp creamos el estado `const [dataToEdit, setDataToEdit] = useState(null)` para la inserción y actulaización de la información.

El formulario recibirá 4 propiedades (1 valor y 3 funciones) que se encargaran de la creación, actualización, y la var de estado para diferenciar entre create y update => dataToEdit y la función que la actualiza => setDataToEdit.
---
Para eliminar pasaremos el deleteData al CrudTable. Tambien necesita la función actualizadora para el botón de editar.

```js
const createData = (data) => {}
const updateData = (data) => {}
const deleteData = (id) => {}

export default function CrudApp() {
    ...
    const [dataToEdit, setDataToEdit] = useState(null)
    ...
            <CrudForm
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
            />
            <CrudTable data={db} setDataToEdit={setDataToEdit} deleteData={deleteData}/>
}
```

Recordemos que el evento handleChange actualiza los datos del form. Y para hacerlo todo de una manera más automatica, pasaremos el estado con el spread-operator, y luego el input que se esté actualizando, utilizamos la destructuracion para que la prop name del inpuit la tome como atributo del objeto que se está construyendo ahora, y se le asigna su respectivo valor.
```js
const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
```
Como vamos a controlar mediante js el evento del form, añadiremos ``e.preventDefault()`` al handleSubmit para que no se autoprocese el formulario. Agregaremos un condicional por si los inputs se envían vacíos con:
```js
if(!form.name || !form.constellation){
      alert("Datos incompletos")
      return;
    }
```
Para la validación del id, segun queramos añadir o editar datos, debemos de realizar la destructuración de las props padres provenientes del CrudForm en CrudApp. `export const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit}) =>`. Si el id viene nulo, se ejecutara createData, recibiendo la data proveniente del estado inicial initialForm, y esta var de estado se pasara justamente por el handleSubmit al componente padre, y la data de `const createData =(data) =>{}` se convierte en el valor del form que estemos trabajando.
En cambio, si el id no viene vacío, significa que queremos editar dicho id.
Para finalizar ejecutaremos en handleReset() para limpiar el fomrulario.
```js
const handleSumbit = (e) => {
    e.preventDefault()

    if(!form.name || !form.constellation){
      alert("Datos incompletos")
      return;
    }

    if(form.id === null){
      createData(form)
    } else {
      updateData(form)
    }

    handleReset()
  }
```
Recordemos que este formulario esta controlado por la var de estado form, entonces debemos utilizar la funcion `` setForm()`` que actualiza dicha variable igualandola a la ``initialForm`` para que el name, constelattion y id queden limpios. Tambien deberíamos resetear setDataToEdit a nulo como se encuentra en el componente padre. Para que se muestre la data que envíemos por el form en el DOM, usaremos la función ``createData``...debemos de ejectuar la función `setDb` de la variable de estado que poseemos en `initialDb`, y cómo esta es un arreglo, debemos de decirle que se traiga la base de datos como exista con el spread operator (el spread O combina lo que venga en db con lo consiguiente, en este caso, con la data) y agregale la data. Previamente creamos un id.
```js
export default function CrudApp() {
    const [db, setDb] = useState(initialDb)
    const [dataToEdit, setDataToEdit] = useState(null)

    const createData = (data) => {
        data.id = Date.now();
        setDb([...db,data])
     }
     ...
}
```

---

# 30. CRUD App. Edición de datos y comunicación entre componentes (3/4)
Destructuramos las props del CrudApp padre hacia el componente hijo y se las pasamos a la CrudTableRow.
```js
export const CrudTable = ({ data, setDataToEdit, deleteData }) => {
    return (
     ...
        data.map(el => (
            <CrudTableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
            />
        ))
    )}
    ...
```
Luego en el CrudTableRow destructuramos las ultimas dos props envíadas y además destructuramos elements `let {name,constellation,id} = el` para simplificar.

Para la ejecución de la edición debemos de asigarle al button ``'editar'`` el evento ``onClick`` para activar el evento en formato de arrow function llamando asi a la función setDataToEdit, que esta en el CrudApp, actualiza esa variable que se encontraría en nula, por eso pasamos todo el objeto *el*, ya que posee los datos.
 Y para el button ``'eliminar'`` va a desencadenar el deleteData, que se encuentra en CrudApp, y sólo necesita el id, por eso se lo debemo de pasar... al hacer click propaga hacia arriba, pasando el id de la fila en la que estemos. 
Esta propagación que estamos realizando se da en 3 pasos. ``CrudApp => CrudTable => CrudTableRow`` y viceversa. Si fuera algo mas complejo podriamos estar utilizando Context. Más adelante lo veremos.

``!Explicación:`` Al hacer click en el button ``'editar'`` enviaremos el *el* a CrudTable, y está a CrudApp. setDataToEdit modifica el estado 'dataToEdit' y poseera toda la data que traía dicho *el* en esa fila *CrudTableRow*.
```js
export const CrudTableRow = ({el, setDataToEdit, deleteData}) => {
    let {name,constellation,id} = el
    return (
        <>
            ...
                <td>{name}</td>
                <td>{constellation}</td>
                ...
                    <button onClick={()=> setDataToEdit(el)}>Editar</button>
                    <button onClick={()=> deleteData(id)}>Eliminar</button>
            ...
        </>
    )
}
```
Seguimos ahora en el CrudForm creando un useEffect para el `dataToEdit` diciendo que el efecto se ejecute cuando dataToEdit cambie. Sabemos que el valor inicial de `dataToEdit` es *null* entonces a traves de un condicional ejectuamos `setForm(dataToEdit)`  para que los datos de esa fila pasen al formulario. Sino ejecutamos el else con `setform(initialForm)`. 
```js
useEffect(() => {
    if(dataToEdit){
      setForm(dataToEdit)
    } else {
      setForm(initialForm)
    }
   }, [dataToEdit])
```
!El objeto `dataToEdit` traera el nombre del caballero, la constelación y el id de la fila donde presionamos el botón editar.

Ahora para la updateData actualizaremos la db con un operador ternario. Ya que es un arreglo, debemos de ejecutar un map en una nueva variable para guardar dicho resultado, debemos de verificar a traves del map si se encuentra algun id ya existente para modificar dicha posición. 
```js
const updateData = (data) => {
        let newData = db.map(el => el.id === data.id ? data : el);
        setDb(newData)
    }
```
Aqui decimos que por cada *el* en db verifique el id, y si el id es igual a lo que recibes como dato.id (en su posición id) entonces en esa posición remplazamos la data que esta siendo pasada, sinó el *el* se conserva igual.

Gracias al estado de dataToEdit podemos utilizar un solo form para la creación y la edición de datos.
---

!En el CrudForm, cuando el ``form.id`` es nulo, ejecuta el createData; cuando ya tiene datos, se ejecuta el updateData. **_*¿Cuando este form va a tener datos?*_** Cuando el usuario pulse cualquiera de los botones de editar, se pasa el objeto *el* en ``setDataToEdit``... se regresa hasta CrudApp, y al ejecutarse el setDataToEdit se actualiza la variable `dataToEdit` por el objeto que tragia *el* y entonces ahí como el form recibe la ``dataToEdit``, el CrudForm posee un efecto que está evaluando cualquier cambio que se ejecute en ``[dataToEdit]`` (que recibe como *prop*) y dependiendo de eso actualíza el estado del form con los datos que recibe o con los datos iniciales.
```js
 useEffect(() => {
    if(dataToEdit){
      setForm(dataToEdit)
    } else {
      setForm(initialForm)
    }
   }, [dataToEdit]) //Parametro condicional. Al cambiar dataToEdit se ejecuta este efecto.
```
Por ulitmo para que el h3 cambie segun estemos agregando nueva data o editando data existente, utilizaremos un conditional render. ````<h3>{dataToEdit ? `Editar` : `Agregar`}</h3>````

---















    





