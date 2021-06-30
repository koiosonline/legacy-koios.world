import React from 'react';

const Hero = (props: { title: string; description: string; }) => {
    return (
        <div className={'hero'}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
    )
}

export default Hero;