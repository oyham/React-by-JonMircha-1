import React from "react" //no es necesario pero si buena practica
import PropTypes from "prop-types"

export default function Propiedades(props) {
    return (
        <>
            <hr />
            <h2>{props.porDefecto}</h2>
            <ul>
                <li>{props.cadena}</li>
                <li>{props.numero}</li>
                <li>{props.booleano ? "verdadero":"falso"}</li>
                <li>{props.arreglo.join('-')}</li>
                <li>{props.objeto.nombre + " - " + props.objeto.correo}</li>
                <li>{props.arreglo.map(props.funcion).join('-')}</li>
                <li>{props.elementoReact}</li>
                <li>{props.componenteReact}</li>
            </ul>
        </>
    )
}

Propiedades.defaultProps = {
    porDefecto: "Las Props",
}

Propiedades.propTypes = {
    numero: PropTypes.number.isRequired
}