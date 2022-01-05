const Hero = (props: { title: string; description: string;}) => {
  return (
    <div className={'hero animation-slide-in'}>
      <h1 className={'hero__title'}>{props.title}</h1>
      <p className={'hero__description'}>{props.description}</p>
      <div className={'hero__links'}>
        <a href={'https://app.koios.world/'} className={'link'} target="_blank" rel="noreferrer">
          <img src={'/images/Learn.svg'} alt="article"/>
          <p className={'link__text'}>Learn</p>
        </a>
        <a href={'https://app.koios.world/#/earn'} className={'link'} target="_blank" rel="noreferrer">
          <img src={'/images/earn.svg'} alt="article"/>
          <p className={'link__text'}>Earn</p>
        </a>
      </div>
    </div>
  )
}

export default Hero;
