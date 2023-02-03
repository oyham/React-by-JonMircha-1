import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null) //datos que vienen. Funcion que la va a actualizar: setData.
    const [isPending, setIsPending] = useState(true)//cada vez que se haga una peticion, es INTERESANTE tener una variable que controle cuando ya se ha recibido esa peticion. Que se encuentre PENDIENTE mientras la peticion sigue en curso, y al devolverla ya sea resuelta.
    const [error, setError] = useState(null) //Manipulación de posible error.

    useEffect(() => {
        const getData = async (url) => {
            try {
                let res = await fetch(url);//mandamos a invocar la petición

                if (!res.ok) { //validación de error. Arrojamos un {} que lo va a cachar el catch
                    throw {
                        err: true,
                        status: res.status,
                        statusText: !res.statusText ? "Ocurrió un error" : res.statusText,
                    }
                }
                //si no hay error, convertimos a json.
                let data = await res.json();

                //ACTUALIZACION DE LAS 3 VARS DE ESTADO.
                setIsPending(false) //si se recíbe la data con el res.json, entonces la peticion no estaría pendiente y por consiguiente se convierte el false.
                setData(data)
                setError({err:false})

            } catch (err) {
                setIsPending(true)
                setError(err)
            }
        }

        getData(url)
    }, [url])

    return { data, isPending, error } //si el valor y la propiedad se llaman igual, se simplifica la escritura. error:error = error.
}
