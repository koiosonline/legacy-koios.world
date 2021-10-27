import React from 'react';

const Hero = (props: { title: string; description: string;}) => {
    return (
        <div className={'hero'}>
            <h1 className={'hero__title'}>{props.title}</h1>
            <p className={'hero__description'}>{props.description}</p>
            <div className={'hero__links'}>
              <a href={'https://app.koios.world/#/earn'}><img src={'/images/earn.svg'} alt="article"/><p>Earn</p></a>
              <a href={'https://app.koios.world/'}><img src={'/images/Learn.svg'} alt="article"/><p>Learn</p></a>
            </div>
        </div>
    )
}

export default Hero;
