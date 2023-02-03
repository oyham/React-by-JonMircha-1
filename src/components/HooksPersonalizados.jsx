import React from 'react';
import { useFetch } from '../hooks/useFetch';

export default function HooksPersonalizados(){
    let url = "https://pokeapi.co/api/v2/pokemon"
    // url = "https://jsonplaceholder.typicode.com/users"

    //destructuración del return del useFetch + el param url.
    let {data, isPending, error} = useFetch(url)

    return(
        <>
            <hr />
            <h2>Hooks Personalizados</h2>

            <h3>{JSON.stringify(isPending)}</h3>
            <h3>
                <mark>{JSON.stringify(error)}</mark>
            </h3>
            <h3>
                <pre style={{whiteSpace:"pre-wrap"}}> {/* style={{whiteSpace:"pre-wrap"}} */}
                    <code>
                    {/* {JSON.stringify(data)} ,undefined,2 */}
                    </code>
                </pre>
            </h3>
        </>
    )
}