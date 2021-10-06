import './App.css';
import './assets/styles/koios.scss';
import Header from "./components/header";
import content from "./assets/data/content.json";
import cards from "./assets/data/cards.json";
import Hero from "./components/hero";
import Cards from "./components/cards";
import Article from "./components/article";
import Footer from "./components/footer";
import World from "./components/World";

function App() {
  return (
    <div className="App">
        <Header/>
        <World world={3} />
        <Hero title={content.hero.title} description={content.hero.description}/>
        <div className={'cardContainer'}>
        {cards.cards.map((cardData, index) => (
            <Cards key={index}
                   image={cardData.imgUrl}
                   title={cardData.title}
                   description={cardData.description}
                   linkUrl={cardData.linkUrl}
                   linkTitle={cardData.linkTitle}/>
        ))}
        </div>
        <div className={'contentContainer'}>
            <div className={'contentContainer__articles'}>
                {content.article.map((cardData, index) => (
                    <Article key={index}
                           title={cardData.title}
                           description={cardData.description} links={cardData.links}/>
                ))}
            </div>
            <div className={'contentContainer__artwork'}>
                <img src={'/images/artwork5.svg'} alt={'artwork'}/>
            </div>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
