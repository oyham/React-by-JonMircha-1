import React, { Component, useState } from 'react'

export default function Estado() {
    const contador = useState(0)
    
      return (
        <>
            <hr />
            <h2>El Estado</h2>
            <p>{contador}</p>
        </>
    )
}