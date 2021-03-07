import React from 'react'
import spinner from './Spinner.gif'
function Spinner() {
    return (
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: "block" }}
            alt="loading....."
        />
    )
}

export default Spinner
