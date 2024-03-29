import './App.css';
import './assets/styles/koios.scss';
import Header from "./components/header";
import content from "./assets/data/content.json";
import Hero from "./components/hero";
import Article from "./components/article";
import Footer from "./components/footer";
import World from "./components/World";
// import Calendar from "./components/calendar";
import {useRef} from "react";
import Chart from './components/chart';

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
        {/* <section className={'calendar-container'}>
          <div className={'calendar-container__inner'}>
            <Calendar />
          </div>
        </section> */}
        <div className={'content-container'}>
            <div className={'content-container__articles'}>
                {content.article.map((cardData, index) => (
                    <Article
                      key={index}
                      ref={index === 0 ? articleRef1 : articleRef2}
                      title={cardData.title}
                      description={cardData.description} links={cardData.links}/>
                ))}
            </div>
            <div className={'content-container__artwork animation-slide-in'}>
                <Chart/>
            </div>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
