import './App.css';
import './assets/styles/koios.scss';
import Header from "./components/header";
import content from "./assets/data/content.json";
import Hero from "./components/hero";
import Article from "./components/article";
import Footer from "./components/footer";
import World from "./components/World";
import {useRef} from "react";

function App() {

  const articleRef1 = useRef()
  const articleRef2 = useRef()

  return (
    <div className="App">
        <Header
          articleRef1={articleRef1}
          articleRef2={articleRef2}
        />
        <section className={'cta-container'}>
          <div className={'cta-container__inner'}>
            <Hero
              title={content.hero.title}
              description={content.hero.description}
              />
            <World world={3} />
          </div>
        </section>
        <div className={'contentContainer'}>
            <div className={'contentContainer__articles'}>
                {content.article.map((cardData, index) => (
                    <Article
                      key={index}
                      ref={index === 0 ? articleRef1 : articleRef2}
                      title={cardData.title}
                      description={cardData.description} links={cardData.links}/>
                ))}
            </div>
            <div className={'contentContainer__artwork'}>
                <img src={'/images/artwork5.svg'} alt={'artwork'}/>
            </div>
        </div>
        <section>
            <h2>Upcoming events</h2>
            <iframe title="Koios events" className="calender" src="https://calendar.google.com/calendar/embed?src=kf4eo2r45tprpo4nbh1b06mcibjotn6k%40import.calendar.google.com&ctz=Europe%2FAmsterdam" ></iframe>
        </section>
        <Footer/>
    </div>
  );
}

export default App;
