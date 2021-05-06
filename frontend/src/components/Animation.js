import React from 'react'

const Animation = ({ gif }) => {
    return (
        <div className="animationGif">
            <img src={gif} alt="loading..."/>
        </div>
    )
}

export default Animation
