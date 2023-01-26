import { useState } from "react";

export default function Count() {
    const [count, setCount] = useState(10)
    let nombre = "oyham"
    let auth = true;
    let estaciones = ["Primavera", "Verano", "Otoño", "Invierno"]
    return (
        <>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <h4>El usuario {nombre} {auth ? "está logueado" : "no está logueado"}</h4>
            <ul>
                {estaciones.map((el,index) => <li key={index}>{el}:{index}</li>)}
            </ul>
        </>
    )
}