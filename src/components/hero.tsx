import React from 'react';

const Hero = (props: { title: string; description: string;}) => {
    return (
        <div className={'hero'}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <div className={'hero__links'}>
              <a href={'https://app.koios.world/#/earn'}><img src={'/images/earn.svg'} alt="article"/><p>Earn</p></a>
              <a href={'https://app.koios.world/'}><img src={'/images/Learn.svg'} alt="article"/><p>Learn</p></a>
            </div>
        </div>
    )
}

export default Hero;
