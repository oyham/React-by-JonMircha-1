import React, { useState, useEffect } from 'react';

export default function ScrollHooks() {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        console.log("Moviendo el scroll")

        const detectarScroll = () => setScrollY(window.pageYOffset);//prop que dice cuantos px se han desplazado del nav.
        window.addEventListener("scroll", detectarScroll)//al objeto de la ventana le vas a asignar en su evento scroll- y ejecutara la funcion()

        return () => {
            window.removeEventListener("scroll", detectarScroll)
            console.log("Fase de Desmontaje")
        }
    }, [scrollY])

    useEffect(() => {
        console.log("Fase de Montaje")
    }, [])

    useEffect(() => {
        console.log("Fase de Actualización")
    })

    useEffect(() => {
        return (() => {
            console.log("Fase de Desmontaje")
        })
    })

    return (
        <>
            <hr />
            <h2>Hooks - useEffect y el ciclo de Vida</h2>
            <p>Scroll Y del navegador en {scrollY} px</p>
        </>
    )
}
