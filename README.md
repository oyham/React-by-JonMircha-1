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

# 21. _Referencias_ REFERENCIAS

Es una manera en que react nos permite *CONTROLAR* un elemento que ya ha sido cargado al *DOM* sin tener que hacer un Render total del DOM por el cambio de estado.

### *createRef y useRef* se utilíza para crear las referencias.
Las referencias pueden ser tomadas como un selector que YA existe en el DOM pero... dentro de React.

## NO se puede usar createRef en componentes funcionales.
!!!NOTA: si poseemos un class component, utilizamos createRef para crear la var de referencia. Pero si utilizamos hooks, se usa useRef. Tampoco hay que abusar de las refs, ya que esta tecnica, aunque no haga manipulación directa al DOM, las referencias *SI* existen en el DOM real, a diferencia de las variables de estado que existen en el DOM virtual.

---













    





