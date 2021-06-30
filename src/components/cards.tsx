const Cards = (props: {image: string; title: string; description: string; linkUrl: string; linkTitle: string; }) => {
    return (
        <div className={"cardContainer__card"}>
            <img src={props.image} alt={'artwork'}/>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <a href={props.linkUrl}>{props.linkTitle}</a>
        </div>
    )
}

export default Cards;