import React, {RefObject, useState} from 'react';
import logo from '../assets/images/logos/koios-logo.svg';

const Header = (props: {articleRef1: RefObject<HTMLDivElement>; articleRef2: RefObject<HTMLDivElement>;}) => {
  const [scrollPosition, setScrollPosition] = useState<number>()

  const scrollHandler = () => {
    setScrollPosition(window.scrollY);
  }

  document.addEventListener('scroll', () => {
    scrollHandler()
  })

    return (
        <header className={`header ${scrollPosition > 80 ? 'header--white' : ''}`}>
          <div className={'header__inner'}>
            <img src={logo} alt={'logo'}/>
            <div className={'link-holder'}>
              <p className={`link-holder__link ${scrollPosition > 80 ? 'link-holder__link--dark' : ''}`} onClick={() => props.articleRef1.current.scrollIntoView({behavior: 'smooth', block: 'center'})}>About Koios</p>
              <p className={`link-holder__link ${scrollPosition > 80 ? 'link-holder__link--dark' : ''}`} onClick={() => props.articleRef2.current.scrollIntoView({behavior: 'smooth', block: 'center'})}>Koios DAO</p>
            </div>
          </div>
        </header>
    )
}

export default Header;
