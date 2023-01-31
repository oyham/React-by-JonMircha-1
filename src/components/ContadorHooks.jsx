import React, { useState } from 'react';

export default function ContadorHooks(props) {
    // console.log(useState())
    const [contador, setContador] = useState(0)

    const sumar = () => setContador(contador + 1)
    const restar = () => setContador(contador - 1)

    return (
        <>
            <hr />
            <h2>Hooks - useState</h2>
            <nav>
                <button onClick={sumar}>+</button>
                <p>Contador {props.titulo} {contador}</p>
                <button onClick={restar}>-</button>
            </nav>
        </>
    )

}

ContadorHooks.defaultProps = {
    titulo:"Funcional",
}